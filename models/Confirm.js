const mongoose = require('mongoose')

const confirmSchema = new mongoose.Schema({

    problem : { type : String, required : true},
    arrive : { type : String, required : true},
    brand : { type : String, required : true},
    note : { type : String},
    shopToken : { type : String}

})

module.exports = mongoose.model('Confirm', confirmSchema)