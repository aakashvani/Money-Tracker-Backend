const resGen = require("../response/resGenerator.js");

const {currentTime} = require("../helper.js")
const logger =require("../logger/logger");
const AES256 = require("aes-everywhere");


const decrypter = async(req,res,next)=>{
    try{
      const formDecrypted = AES256.decrypt(
        req.body.data,
        "0F2E4B2C8504F5DB893F56AEDB7B1B5C"
      );
      console.log(formDecrypted, "fromdecrypted");

      const formObj = JSON.parse(formDecrypted);


    let{rrn,env,slk,fullName,dob,emailId,gender,ackno}=formObj 
    

    console.log(rrn,slk,env,gender, "rrn")


req.body = { rrn, env, slk, fullName, dob, emailId, gender,ackno };

      return next();

    }
    catch(error){
        logger.error(
            `: transactionId:${null} =>  Error caught at auth module - ${error.stack}`
          );
          throw new Error(error);
    }
}

module.exports = decrypter