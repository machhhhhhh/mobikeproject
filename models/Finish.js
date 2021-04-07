const mongoose = require('mongoose')

const finishSchema = new mongoose.Schema({

    problem : { type : String, required : true},
    arrive : { type : String, required : true},
    brand : { type : String, required : true},
    note : { type : String},
    userToken : { type : String},
    shopToken : { type : String},
    timeToArrive : {type : String},
    timeToFinish : {type : String}

})

module.exports = mongoose.model('Finish', finishSchema)