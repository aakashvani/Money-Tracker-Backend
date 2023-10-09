const AES256 = require("aes-everywhere");
const SlkModel = require("../../domains/licenses/model");
const crypto = require("node:crypto");

const { AccountsModel } = require("../../domains/users/model");

const resGen = require("../response/resGenerator");

const slkAuth = async (req, res, next) => {
  try {
    // console.log(req.body, "slk,req.body");
    const slk = req.body.slk;
    let slkModel;
    let slkModelActivate;
    if (slk?.length === 0) {
      console.log("coming inside if")
      console.log(req.authdetails,"=====>")
      slkModel = await SlkModel.find({
        acc_id: req.authdetails.account_id,
        $and: [{ status: 1 }, { access_type: 1 }],
      })
        .lean()
        .exec();

      slkModelActivate = await SlkModel.find({
        $and: [
          { acc_id: req.authdetails.account_id },
          { status: 1 },
          { access_type: 0 },
        ],
      })
        .lean()
        .exec();
      console.log(slkModelActivate.length);

      if (slkModelActivate.length !== 0) {
        return resGen(res, {
          infomess: "slkgen",
          infodata: "Activate your slk",
        });
      } else if (slkModel.length !== 0) {
        // console.log(slkModel)
        req.body.userid = req.authdetails.user_id;
        req.body.accid = req.authdetails.account_id;
        return next();
      } else {
        return resGen(res, {
          infomess: "slkgen",
          infodata: null,
        });
      }
    } else {
      console.log(slk)
      slkModel = await SlkModel.find({
        license_key: slk,
        $and: [{ status: 1 }, { access_type: 1 }],
      });
      console.log(slkModel, "slkModel");

      let accountVerify = await AccountsModel.find({
        _id: slkModel[0]?.acc_id,
      });
      console.log(accountVerify, "accountVerify");
      if (accountVerify?.length === 0) {
        //  slkModelActivate = await SlkModel.find({
        //    $and: [{ license_key: req.body.slk }, { status: 1 }, { access_type: 0 }],
        //  })
        //    .lean()
        //    .exec();
      } else if (accountVerify[0]?.acctype !== 1) {
        return resGen(res, {
          infomess: "invaccesstype",
          infodata: null,
        });
      }

      slkModelActivate = await SlkModel.find({
        $and: [{ license_key: slk }, { status: 1 }, { access_type: 0 }],
      })
        .lean()
        .exec();

      if (slkModelActivate.length !== 0) {
        return resGen(res, {
          infomess: "slkgen",
          infodata: "Activate your slk",
        });
      } else if (slkModel.length !== 0) {
        // console.log(slkModel)
        req.body.userid = accountVerify[0]?.users[0]?._id;
        req.body.accid = accountVerify[0]?._id;
        return next();
      } else {
        return resGen(res, {
          infomess: "slkgen",
          infodata: null,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = slkAuth;
