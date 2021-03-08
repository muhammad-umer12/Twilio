const apiLogSchema = require("../models/api_logs");
require("dotenv").config();

async function createApiLog(req,res){
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// client.availablePhoneNumbers('US')
//   .fetch()
//   .then((available_phone_number_country) => 
//   {
//       console.log(available_phone_number_country)
//       res.json(available_phone_number_country)
//     }
  
//   )

client.availablePhoneNumbers('US')
.local
.list({areaCode: parseInt(req.params.area_code), limit: parseInt(req.params.limit)})
      .then((local) => {
        console.log(local)
        let availableNnumbers= local.map(element => element.phoneNumber);

          //local.forEach(l => console.log(l.friendlyName))
          apiLogSchema.create({datetime: new Date().toISOString(), area_code:req.params.area_code,available_numbers: availableNnumbers})
          .then((data)=>{
              console.log('log created successfully');
              res.status=200;
              res.json(data)
          }
          )
          .catch((err)=>{
              console.log(err)
              res.status=400
              res.send(err)
          })
        
         
    })
  .catch(e => {
      console.log(e)
      res.send(e)
  });
}


module.exports = {
    createApiLog
  };
  