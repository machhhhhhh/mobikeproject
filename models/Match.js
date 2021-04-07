const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({

    problem : { type : String, required : true},
    arrive : { type : String, required : true},
    brand : { type : String, required : true},
    note : { type : String},
    userToken : { type : String},
    shopToken : { type : String},
    timeToArrive : {type : String}

})

module.exports = mongoose.model('Match', matchSchema)