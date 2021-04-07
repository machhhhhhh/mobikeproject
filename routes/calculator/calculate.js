const express = require('express')
const {validationResult, check}  = require('express-validator')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')

const route = express.Router()

const Finish = require('../../models/Finish')
const User = require('../../models/User')

// calculate /
route.get('/' , async (req,res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({errors : errors.array()})
    }
    const result =  await Finish.find()

    

    //res.send(result)

    for (let i=0; i< result.length; i++){
        if (i==0) {
            const data = result[i]

            //console.log(data);

            const shopToken = data.shopToken
            const shopDetail = jwtDecode(shopToken)

           // console.log(shopDetail);

            const user = await User.findOne({email : shopDetail.email})

            const score = parseInt(user.score)

            // console.log(parseFloat(score));

            const timeToArrive = data.timeToArrive
            const timeToFinish = data.timeToFinish

            // const calculate = timeToArrive + timeToFinish
            
            
            const timeArrive = getMilliseconds(timeToArrive)
            const timeFinish = getMilliseconds(timeToFinish);

            const timeArriveWeight = timeArrive / 3600
            const timeFinishWeight = (timeFinish / 3600) * 2
            const calculate = timeFinishWeight + timeArriveWeight

            const newScore = score + calculate

            //  res.send("Score เดิม = " + score + "   Update Score =  " + newScore, score, newScore)
              res.send(newScore)
            // console.log(newScore);

        }
    }

    
})

function getMilliseconds(input)
{
  var a = input.split(':');
  var n = a.length; // number of array items

  var ms = 0; // milliseconds result

  if (n > 0)
  {
     var b = a[n-1].split('.');
     if (b.length > 1)
     {
       var m = b[1];
       while (m.length < 3) m += '0'; // ensure we deal with thousands
       ms += m - 0; // ensure we deal with numbers
     }
     ms += b[0] * 1000;

     if (n > 1) // minutes
     {
       ms += a[n-2] * 60 * 1000;

       if (n > 2) // hours
       {
         ms += a[n-3] * 60 * 60 * 1000;
       }
     }
  }
  return ms/1000;
}

module.exports = route