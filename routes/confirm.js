const express = require('express')
const {validationResult, check}  = require('express-validator')
const jwt = require('jsonwebtoken')

const route = express.Router()

// bring detail model
const Confirm = require('../models/Confirm')

// token
const generateToken = detail => {
    return jwt.sign(
        { _id: detail._id, arrive: detail.arrive, brand : detail.brand, problem : detail.problem
            , note : detail.note, shopToken: detail.shopToken}, 
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
                shopToken : saveDetail.shopToken
            },
            token
        })
    } catch (error) {
        res.status(400).send({success : false, error})
    }
})

module.exports = route