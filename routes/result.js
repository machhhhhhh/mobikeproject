const express = require('express')
const {validationResult, check}  = require('express-validator')
const jwt = require('jsonwebtoken')

const route = express.Router()

const Match = require('../models/Match')
const Finish = require('../models/Finish')


// token
const generateToken = detail => {
    return jwt.sign(
        { _id: detail._id, arrive: detail.arrive, brand : detail.brand, problem : detail.problem
            , note : detail.note, userToken: detail.userToken, shopToken: detail.shopToken, timeToArrive : detail.timeToArrive, timeToFinish : detail.timeToFinish}, 
        "SUPERSECRET555"
        ) 
}

// result/finish
route.post('/finish', async (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    const detail = new Finish({
        arrive : req.body.arrive,
        problem : req.body.problem,
        brand : req.body.brand,
        note : req.body.note,
        userToken : req.body.userToken,
        shopToken : req.body.shopToken,
        timeToArrive : req.body.timeToArrive,
        timeToFinish : req.body.timeToFinish
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
                timeToArrive : saveDetail.timeToArrive,
                timeToFinish : saveDetail.timeToFinish
            },
            token
        })
    } catch (error) {
        res.status(400).send({success : false, error})
    }

})

// result /
route.get('/' , async (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    const result =  await Match.find()

    res.send(result)
})

// result/resultId
route.get('/resultId', async(req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    const result =  await Match.find()

    for(let i=0; i<result.length; i++) {
        if(i==0){
            const data = result[i]
            res.send(data)
        }
    }
    //res.send(data)

})

// result/remove
route.post('/remove', async (req,res) => {
    await Match.find().deleteMany()

    res.send({success :true, message : 'Remove Match successfully'})
})

module.exports = route