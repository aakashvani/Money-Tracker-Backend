const resCode = require("../response/responseCode.json");
const logger = require("../logger/logger");
const resposeGenerator = async(_res,_resval)=>{
  
try {
    const responseGen = {
        respcode: resCode[_resval.infomess]["code"],
        respdesc: resCode[_resval.infomess]["description"],
        data: _resval.infodata,
      };
      
      return _res.status(resCode[_resval.infomess].headercode).json(responseGen);
} catch (error) {
  logger.error(`: transactionId:${null} =>Error catch at response generate function - ${error.stack}`);
throw new Error(error);
}
};


module.exports = resposeGenerator ;
