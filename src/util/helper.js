const {AccountsModel} =require("../domains/users/model.js");
const logger = require("../util/logger/logger.js");
function checkvalidity(days, date) {
  
    date = new Date(date);
    date.setDate(date.getDate() + days);
    if (date >= new Date()) {
        console.log("in if");
        return { status: true, exp_date: date };
    }
    else {
        console.log("in else");
        return false;
    }
}

//Find account and user details
const userAuth= async(userId,userEmail,routeTxnId)=>{
    try {
        const accountDetailes = {
            user:null,
            admin:null
        }
        const finalResult={
            status:false,
            data:null
        }

        if(userId === undefined || userEmail === undefined){
           finalResult["data"] = {
            infomess: "cantfinacc",
            infodata: null,
          };

          return finalResult
        }

        const queryData = {};

        if(userId !== null && userId !== undefined){
          queryData["users._id"]=userId
        }else{
          queryData["users.useremail"]=userEmail;
          queryData["users.blocked"]=false;
        }
       

        const foundUser = await AccountsModel.aggregate([
            { $project: { users: 1, _id: 1 , acctype:1 } },
            { $unwind: { path: "$users" } },
            {
              $match: queryData,
            },
          ]);
          
          if (foundUser.length <1) {
     
            finalResult["data"] = {
              infomess: "cantfinacc",
              infodata: null,
            };

            return finalResult
          }
      
          if (foundUser[0].users.userverified === false) {
            finalResult["data"] = {
              infomess: "accnotverify",
              infodata: null,
            };
            return finalResult
          }
      
          if (foundUser[0].users.userstatus === 2) {
            finalResult["data"] = {
              infomess: "accdeact",
              infodata: null,
            };
            return finalResult
          }
          if ((foundUser[0].users.uservalidity.getTime()/1000)<(currentTime(0).getTime()/1000)){
            finalResult["data"] ={
              infomess: "accexpired",
              infodata: null,
            };
            return finalResult
          }
   
            accountDetailes["user"]=foundUser[0].users;

            const foundAdmin =  await AccountsModel.aggregate([
                { $unwind: { path: "$users" } },
                {
                  $match: {
                    "users.role": { $gt: -1, $lt: 2 },
                    _id: foundUser[0]._id,
                  },
                }
              ]);
              if(foundAdmin.length<1) {
                finalResult["data"] = {
                  infomess: "cantfinacc",
                  infodata: null,
                };
                return finalResult
              } 
              if (foundAdmin[0].users.userverified ===false) {
                finalResult["data"] ={
                  infomess: "accnotverify",
                  infodata: null,
                };
                return finalResult
              }
          
              if (foundAdmin[0].users.blocked===true) {
                finalResult["data"] ={
                  infomess: "cantfinacc",
                  infodata: null,
                };
                return finalResult
              }
          
              if (foundAdmin[0].users.userstatus === 2) {
                finalResult["data"] ={
                  infomess: "accdeact",
                  infodata: null,
                };
                return finalResult
              }
              if ((foundAdmin[0].users.uservalidity.getTime()/1000)<(currentTime(0).getTime()/1000)){
                finalResult["data"] ={
                  infomess: "accexpired",
                  infodata: null,
                };
                return finalResult
              }
              accountDetailes["admin"]=foundAdmin[0];

              finalResult["status"]=true;
              finalResult["data"]=accountDetailes;
      
          return  finalResult;
    } catch (error) {
      logger.error(
        `: transactionId:${routeTxnId} => Internal error helper auth - ${error.stack}`
      );
         throw new Error(error);
    }
    }

    function expireDateUsers(bodyDate) {
      const userValidityDate = new Date(bodyDate);
      const currentDate = userValidityDate.getDate();
      userValidityDate.setDate(currentDate+1)
      return userValidityDate;
    }
    
    function currentTime(addedMinutes) {
      const timeNow = new Date();
      timeNow.setHours(timeNow.getHours() + 5);
      timeNow.setMinutes(timeNow.getMinutes() + 30 + addedMinutes);
      return timeNow;
    }

    
module.exports = {checkvalidity,userAuth,expireDateUsers,currentTime};