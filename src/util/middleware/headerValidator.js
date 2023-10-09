
const resGen = require("../response/resGenerator.js");
const HeaderValidator = async(req,res,next)=>{

try {
//     const applicationType = req?.headers?.["content-type"];
// console.log("Request",req?.headers,applicationType);
//     if(applicationType !== "application/json"){
//        return resGen(res,{
//          infomess : "invheader",
//          infodata: null,
//      });
//     }



    return next();
} catch (error) {
   console.log(error);
}
    
};


module.exports = HeaderValidator ;
