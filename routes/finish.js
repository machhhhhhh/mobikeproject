const express = require('express')
const {validationResult, check}  = require('express-validator')
const jwt = require('jsonwebtoken')

const Finish = require('../models/Finish')

const route = express.Router()

// finish /
route.get('/', async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    
   const detail =  await Finish.find()

   
  
    if (!detail) return res.status(404).send({ success : false ,message : 'Not have the order'})

    res.send({ success : true ,message : 'Get Order', detail})

})

// finish/detailId

route.get("/detailId", async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }

    const detail = await Finish.find()

    for(let i=0;i < detail.length; i++){
        if (i==0) {
            const data = detail[i]
            res.send(data)
        }
    }
    //res.send(detail)

})

// finish/remove
route.post('/remove', async ( req,res) => {
    
    await Finish.find().deleteMany()

        res.send({success:true, message : 'remove result Finish Detail'})
})


module.exports = route