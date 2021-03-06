const express = require('express')
const {validationResult, check}  = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const route = express.Router()

// bring user model
const User = require('../../models/User')

// token
const generateToken = user => {
    return jwt.sign(
        { _id: user._id, email: user.email, fullname : user.fullname,latitude : user.latitude,longitude : user.longitude, typeUser : user.typeUser}, 
        "SUPERSECRET555"
        ) 
}
const generateTokenShopkeeper = user => {
    return jwt.sign(
        { _id: user._id, email: user.email, fullname : user.fullname, type : 'shopkeeper'}, 
        "SUPERSECRET555"
        ) 
}

// register form
const validate = [
    check('fullname')
        .isLength({min : 2})
        .withMessage('Your Full Name is required'),
    check('email')
        .isEmail()
        .withMessage("Please provide a vaid email"),
    check('password')
        .isLength({min : 2})
        .withMessage('Password must be at least 2 charactors')
]

// login form
const loginvalidate = [
    check('email')
        .isEmail()
        .withMessage("Please provide a vaid email"),
    check('password')
        .isLength({min : 2})
        .withMessage('Password must be at least 2 charactors')
]

// register route
route.post('/register', validate , async (req,res) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    const userExist = await User.findOne({ email : req.body.email })

    if (userExist) return res.status(400).send({success : false, message : "Email already exist"})

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        fullname : req.body.fullname,
        email : req.body.email,
        password : hash,
        typeUser : req.body.typeUser,
        latitude: req.body.latitude,
        longitude : req.body.longitude,
        phone : req.body.phone,
        score : req.body.score
    })

    try {
        const saveUser = await user.save()
        

        // create and assign token
        const token = generateToken(user)

        res.send({
            success : true, 
            data : {   
                id : saveUser._id, 
                fullname : saveUser.fullname, 
                email:saveUser.email,
                typeUser : saveUser.typeUser,
                latitude: saveUser.latitude,
                longitude : saveUser.longitude,
                phone : saveUser.phone,
                score : saveUser.score
            },
            token
        })

    } catch (error) {
        res.status(400).send({success : false, error})
    }

})

// login route
route.post('/login' , loginvalidate , async (req,res) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    
    // check if email exist
    const user = await User.findOne({ email : req.body.email})
    if (!user) return res.status(404).send({ success : false ,message : 'User is not registered'})

    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(404).send({ success : false, message : "Invalid Email or Password"})

    // create and assign token
    const token = generateToken(user)

    res
        .header('auth-token', token)
        .send({ success : true ,message : 'Logged in sucuessfully ', token})

})

// route.get('/auth/google', passport.authenticate('google', {
//     scope : ['profile', 'email']
// }))

// route.get('/auth/google/callback', passport.authenticate('google'), (req,res) => {
//     res.redirect('/')
// })

module.exports = route