const resGen = require("../response/resGenerator.js");
const BodyValidator = async(req,res,next)=>{

    try {
//         const bodyData = req.body;
        
//         let bodyRedFlag;
// for(xdata in bodyData){
//    let altData = `${bodyData[`${xdata}`]}`.toString().trim().length;
//    if(altData === 0){
//     bodyRedFlag = true;
//     break;
//    }
// }
// if(bodyRedFlag === true){
//     return resGen(res,{
//             infomess : "bodyempval",
//             infodata: null,
//         }
//     );
// }
 return next();
    } catch (error) {
        console.log(error);
    }
        
    };
    
    
    module.exports = BodyValidator ;
