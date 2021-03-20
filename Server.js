const express = require('express')
const mongoose = require('mongoose')
const route = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

// Middleware
route.use(express.json())
route.use(cors());

// bring all routes
const authRoutes = require('./routes/api/auth')
const verifyToken = require('./routes/api/verifyToken')

// test route auth page
route.get('/', (req,res) =>{
    res.send('auth system')
})

route.get('/profile', verifyToken , (req,res) => {
    res.send({ success : true, data : req.user })
})



// actual routes
route.use('/api/user' , authRoutes) // auth route

// connect database
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nabrg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser : true,
            useUnifiedTopology : true
        }
    )
    .then(() => {
        route.listen(port, ()=> console.log("Listening at " + port))
    })
    .catch(err => console.log(err))