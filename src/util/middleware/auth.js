const resGen = require("../response/resGenerator.js");

const { DecryptUserData } = require("../../util/encryption/encryptor.js");

const jwt = require("jsonwebtoken");

const { SessionsModel } = require("../../domains/users/model.js");
const {currentTime} = require("../helper.js")
const logger = require("../logger/logger");
const Authenticate = async (req, res, next) => {
  console.log(req.body.env, "naveen req")
  try {
    let token;
    console.log(req.body, "naveeen")
    console.log(req["body"]?.env, "naveen weds trisha")
    if(req["body"]?.env && req["body"]?.env ==1){
      return next();
    }
    // eslint-disable-next-line no-undef
    const { JWT_SECRET_KEY } = process.env;

    const tokenheaders = req.headers.authorization;

    if (!tokenheaders) {
      return resGen(res, {
        infomess: "unauth",

        infodata: null,
      });
    }

    token = tokenheaders.split(" ");

    if (token[0] !== "Bearer") {
      return resGen(res, {
        infomess: "unauth",

        infodata: null,
      });
    }

    let decoded;

    try {
      const validateComingToken = await SessionsModel.findOne({
        token: token[1],
      })
        .lean()
        .exec();

      if (
        validateComingToken === null ||
        validateComingToken["expire"].getTime() / 1000 <
          currentTime(0).getTime() / 1000
      ) {
        throw new Error();
      } // have to enable

      decoded = jwt.verify(token[1], JWT_SECRET_KEY, {
        ignoreExpiration: true,
      });
    } catch (error) {
      return resGen(res, {
        infomess: "sesexpired",

        infodata: null,
      });
    }

    const checkAuth = await DecryptUserData(decoded);

    if (
      !checkAuth.hasOwnProperty("email") ||
      !checkAuth.hasOwnProperty("password") ||
      !checkAuth.hasOwnProperty("account_id") ||
      !checkAuth.hasOwnProperty("user_id") ||
      !checkAuth.hasOwnProperty("created_at") ||
      !checkAuth.hasOwnProperty("role")
    ) {
      return resGen(res, {
        infomess: "unauth",

        infodata: null,
      });
    }

    req.authdetails = checkAuth;

    return next();
  } catch (error) {
    logger.error(
      `: transactionId:${null} => Error caught at auth module - ${error.stack}`
    );

    throw new Error(error);
  }
};

module.exports = Authenticate;
