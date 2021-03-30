const express = require('express')
const mongoose = require('mongoose')
const route = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const passport = require('passport')
require('dotenv').config()

// Middleware
route.use(express.json())
route.use(require('express-session')({secret : 'machandblue', resave : true, saveUninitialized : true}))
route.use(cors());
route.use(passport.initialize())
route.use(passport.session())
route.use(express.urlencoded({extended : false}))
// route.use(require('morgan')('combined'))
require('./services/passport') // middleware for passport

// bring all routes
const authRoutes = require('./routes/api/auth')
const verifyToken = require('./routes/api/verifyToken')
const detailRoutes = require('./routes/detail')
const confirmRoutes = require('./routes/confirm')

// test route auth page
route.get('/', (req,res) =>{
    res.send('auth system')
})

route.get('/profile', verifyToken , (req,res) => {
    res.send({ success : true, data : req.user })
})



// actual routes
route.use('/api/user' , authRoutes) // auth route
route.use('/detail', detailRoutes) // search route
route.use('/confirm', confirmRoutes)

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