const express = require('express')
const {validationResult, check}  = require('express-validator')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const route = express.Router()

// bring detail model
const Confirm = require('../models/Confirm')
const Match = require('../models/Match')
const User = require('../models/User')

// token
const generateToken = detail => {
    return jwt.sign(
        { _id: detail._id, arrive: detail.arrive, brand : detail.brand, problem : detail.problem
            , note : detail.note, userToken: detail.userToken, shopToken: detail.shopToken, timeToArrive : detail.timeToArrive}, 
        "SUPERSECRET555"
        ) 
}

const validate = [
    check('arrive')
        .isLength({min:1})
        .withMessage("Please Fill This"),
    check('problem')
        .isLength({min:1})
        .withMessage("Please Fill This"),
    check('brand')
        .isLength({min:1})
        .withMessage("Please Fill This")
]

// confirm/match
route.post('/match', async (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    const detail = new Match({
        arrive : req.body.arrive,
        problem : req.body.problem,
        brand : req.body.brand,
        note : req.body.note,
        userToken : req.body.userToken,
        shopToken : req.body.shopToken,
        timeToArrive : req.body.timeToArrive
    })

    try {
        const saveDetail = await detail.save()

        const token = generateToken(detail)
        
        res.send({
            success : true, 
            data : {   
                id : saveDetail._id, 
                arrive : saveDetail.arrive, 
                problem:saveDetail.problem,
                brand : saveDetail.brand,
                note : saveDetail.note,
                userToken : saveDetail.userToken,
                shopToken : saveDetail.shopToken,
                timeToArrive : saveDetail.timeToArrive
            },
            token
        })
    } catch (error) {
        res.status(400).send({success : false, error})
    }

})


route.post('/', validate ,  async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    const detail = new Confirm({
        arrive : req.body.arrive,
        problem : req.body.problem,
        brand : req.body.brand,
        note : req.body.note,
        userToken : req.body.userToken,
        shopToken : req.body.shopToken
    })

    try {
        const saveDetail = await detail.save()

        const token = generateToken(detail)
        
        res.send({
            success : true, 
            data : {   
                id : saveDetail._id, 
                arrive : saveDetail.arrive, 
                problem:saveDetail.problem,
                brand : saveDetail.brand,
                note : saveDetail.note,
                userToken : saveDetail.userToken,
                shopToken : saveDetail.shopToken
            },
            token
        })
    } catch (error) {
        res.status(400).send({success : false, error})
    }
})

route.get('/', async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    const confirm = await Confirm.find()

    res.send(confirm)
    //console.log(confirm);
})

route.get('/confirmId', async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    const confirm = await Confirm.find()

    for(let i=0; i<confirm.length; i++) {
        if (i==0) {
            const data = confirm[i]
            // const tokenShop = data.shopToken
            // const generateShop = jwtDecode(tokenShop)
            // const shopEmail = generateShop.email
            // const user = await User.findOne({email : shopEmail})
            // //console.log(user);
            // const phoneShop = user.phone
            res.send(data)
        }
    }

})

route.post('/remove', async (req,res) => {

    await Confirm.find().deleteMany()

    res.send({success : true, messeage : 'remove confirm successfully'})
})


module.exports = route