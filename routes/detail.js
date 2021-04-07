const express = require('express')
const {validationResult, check}  = require('express-validator')
const jwt = require('jsonwebtoken')

const route = express.Router()

// bring detail model
const Detail = require('../models/Detail')

// token
const generateToken = detail => {
    return jwt.sign(
        { _id: detail._id, arrive: detail.arrive, brand : detail.brand, problem : detail.problem
            , note : detail.note, userToken: detail.userToken}, 
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

route.get('/', async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    
   const detail =  await Detail.find()

   
  
    if (!detail) return res.status(404).send({ success : false ,message : 'Not have the order'})

    res.send({ success : true ,message : 'Get Order', detail})

})

route.get('/detailId', async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    
   const detail =  await Detail.find()

   for(let i=0 ; i< detail.length; i++) {
       if (i== 0) {
           const data = detail[i]
            res.send({ success : true ,message : 'Get Order', data})
       }
   }

   
  
    if (!detail) return res.status(404).send({ success : false ,message : 'Not have the order'})

    

})


route.post('/remove', async (req,res) => {

    await Detail.find().deleteMany()

   
    res.send({success : true, message : 'Remove Item Done'})
    

    

})
// route.put('/', async (req,res) => {
   
//     const detail = new Detail({
//         _id : req.params.id,
//         arrive : req.body.arrive,
//         problem : req.body.problem,
//         brand : req.body.brand,
//         note : req.body.note,
//         userToken : req.body.userToken,
        
//     })

//     try {
//         const saveDetail = await Detail.updateOne({_id : req.params.id}, detail)

//         const token = generateToken(saveDetail)
        
//         res.send({
//             success : true, 
//             data : {   
//                 id : saveDetail._id, 
//                 arrive : saveDetail.arrive, 
//                 problem:saveDetail.problem,
//                 brand : saveDetail.brand,
//                 note : saveDetail.note,
//                 userToken : saveDetail.userToken,
//                 shopToken : saveDetail.shopToken
//             },
//             token
//         })
//     } catch (error) {
//         res.status(400).send({success : false, error})
//     }

// })



route.post('/', validate ,  async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    const detail = new Detail({
        arrive : req.body.arrive,
        problem : req.body.problem,
        brand : req.body.brand,
        note : req.body.note,
        userToken : req.body.userToken
    })

    try {
        //const saveDetail = await detail.save()

        const token = generateToken(detail)
        
        res.send({
            success : true, 
            // data : {   
            //     id : saveDetail._id, 
            //     arrive : saveDetail.arrive, 
            //     problem:saveDetail.problem,
            //     brand : saveDetail.brand,
            //     note : saveDetail.note,
            //     userToken : saveDetail.userToken
            // },
            token
        })
    } catch (error) {
        res.status(400).send({success : false, error})
    }
})
route.post('/push', validate ,  async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    const detail = new Detail({
        arrive : req.body.arrive,
        problem : req.body.problem,
        brand : req.body.brand,
        note : req.body.note,
        userToken : req.body.userToken
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
                userToken : saveDetail.userToken
            },
            token
        })
    } catch (error) {
        res.status(400).send({success : false, error})
    }
})


module.exports = route