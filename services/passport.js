const key = require('../config/key')
//const facebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

// import model
const User = require('../models/User')


passport.serializeUser( async (user,cb)=>{
    cb(null,user.id)
})

passport.deserializeUser( async(id,cb)=>{

    try { 

        const user = await User.findById(id)
        cb(null, user)

    } catch (error) {
        console.log('error in deserialize user ' + error);
    }

})

passport.use(new GoogleStrategy({
    clientID : key.googleClientID,
    clientSecret : key.googleClientSecret,
    callbackURL : '/auth/google/callback',
    proxy : true

}, async (accessToken, refreshToken, profile, cb)=> {

     try {

        const user = await User.findOne({googleID : profile.id})

         if (user) {
                // aleardy have profile of user
                cb(null, user)
            }
            else {
                // dont have user ID and record                 
                try
                {
                    const user = await new User  ({googleID : profile.id}).save()
                    cb(null, user)
                } 
                catch (error) {
                    console.log('error to save google ID' + error);
                }

            }
     } catch (error)  {
         console.log('error in passport ' + error);
     }     
}))

// passport.use(new facebookStrategy({
//      clientID : key.facebookClientID,
//      clientSecret : key.facebookClientSecret,
//      callbackURL : '/auth/facebook/callback',
//      proxy : true
     
//     }, async(accessToken, refreshToken, profile, cb)=>{

//      try {

//         const user = await Person.findOne({facebookID : profile.id})

//          if (user) {
//                 // aleardy have profile of user
//                 cb(null, user)
//             }
//             else {
//                 // dont have user ID and record                 
//                 try
//                 {
//                     const user = await new Person  ({facebookID : profile.id}).save()
//                     cb(null, user)
//                 } 
//                 catch (error) {
//                     console.log('error to save facebook ID' + error);
//                 }

//             }
//      } catch (error)  {
//          console.log('error in passport ' + error);
//      }     
// }))