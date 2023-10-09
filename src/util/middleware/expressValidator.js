const { checkSchema } = require("express-validator");
const mongoose=require("mongoose")

const ExpressValidator = {
  //User Login
  validateUserLogin: checkSchema({
    useremail: {
      in: ["body"],
      isEmail: true,
      errorMessage: "Please provide a valid email address.",
    },
    userpwd: {
      custom: {
        options: (value) => {
          if (value === null || value === undefined) {
            throw new Error("Please provide a valid password.");
          }
          return true;
        },
      },
    },
  }),

  // Create Account
  validateCreateAccount: checkSchema({
    username: {
      in: ["body"],
      errorMessage:
        "Please enter a name that is at least four characters long.",
      isString: true,
      isLength: {
        options: { min: 4 },
      },
    },
    useremail: {
      in: ["body"],
      errorMessage: "Please provide a valid email address.",
      isEmail: {
        bail: true,
      },
      customSanitizer: {
        options: (value, { req, location, path }) => {
          let sanitizedValue;

          if (req.body.useremail && location && path) {
            sanitizedValue = value.toLowerCase().split(" ").join("");
          }
          return sanitizedValue;
        },
      },
    },
    address: {
      in: ["body"],
      errorMessage:
        "Please enter a address that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    city: {
      in: ["body"],
      errorMessage:
        "Please enter a city name that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    state: {
      in: ["body"],
      errorMessage:
        "Please enter a state name that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    pincode: {
      in: ["body"],
      isString: {
        bail: true,
      },
      custom: {
        options: (value) => {
          const validatePincode = value.match(/^[1-9][0-9]{5}$/);
          if (!validatePincode) {
            throw new Error("Please enter a valid pincode.");
          }
          return true;
        },
      },
    },
    userphone: {
      in: ["body"],
      isString: {
        bail: true,
      },
      custom: {
        options: (value) => {
          const validatePhone = value.match(
            /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
          );
          if (!validatePhone) {
            throw new Error("Please enter a valid mobile number.");
          }
          return true;
        },
      },
    },
    accname: {
      in: ["body"],
      errorMessage:
        "Please enter a account name that is at least three characters long.",
      isString: true,
      isLength: {
        options: { min: 3 },
      },
    },
    acctype: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value <= 0 || value >= 3) {
            throw new Error(
              "The account type you selected is not recognized as valid."
            );
          }
          return true;
        },
      },
    },
    userstatus: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value <= 0 || value >= 3) {
            throw new Error(
              "The account status you selected is not recognized as valid."
            );
          }
          return true;
        },
      },
    },
    usercredits: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value.toString().includes(".")) {
            throw new Error("The format of the credits entered is invalid.");
          }
          if (value < 0) {
            throw new Error(
              "The credits you entered is outside the acceptable limit."
            );
          }
          if ((value > 0 && value < 10) || value > 5000) {
            throw new Error(
              "The credits you entered is outside the acceptable limit."
            );
          }

          return true;
        },
      },
    },
    uservalidity: {
      in: ["body"],
      isDate: { format: "YYYY-MM-DD" },
      errorMessage: "Please enter a valid date.",
    },
  }),
  validateCreateUser: checkSchema({
    username: {
      in: ["body"],
      errorMessage:
        "Please enter a name that is at least four characters long.",
      isString: true,
      isLength: {
        options: { min: 4 },
      },
    },
    useremail: {
      in: ["body"],
      errorMessage: "Please provide a valid email address.",
      isEmail: {
        bail: true,
      },
      customSanitizer: {
        options: (value, { req, location, path }) => {
          let sanitizedValue;

          if (req.body.useremail && location && path) {
            sanitizedValue = value.toLowerCase().split(" ").join("");
          }
          return sanitizedValue;
        },
      },
    },
    address: {
      in: ["body"],
      errorMessage:
        "Please enter a address that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    city: {
      in: ["body"],
      errorMessage:
        "Please enter a city name that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    state: {
      in: ["body"],
      errorMessage:
        "Please enter a state name that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    pincode: {
      in: ["body"],
      isString: true,
      custom: {
        options: (value) => {
          const validatePincode = value.match(/^[1-9][0-9]{5}$/);
          if (!validatePincode) {
            throw new Error("Please enter a valid pincode.");
          }
          return true;
        },
      },
    },
    userphone: {
      in: ["body"],
      isString: true,
      custom: {
        options: (value) => {
          const validatePhone = value.match(
            /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
          );
          if (!validatePhone) {
            throw new Error("Please enter a valid mobile number.");
          }
          return true;
        },
      },
    },
    userstatus: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value <= 0 || value >= 3) {
            throw new Error(
              "The account status you selected is not recognized as valid."
            );
          }
          return true;
        },
      },
    },
    usercredits: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value.toString().includes(".")) {
            throw new Error("The format of the credits entered is invalid.");
          }
          if (value < 0) {
            throw new Error(
              "The credits you entered is outside the acceptable limit."
            );
          }
          if ((value > 0 && value < 1) || value > 5000) {
            throw new Error(
              "The credits you entered is outside the acceptable limit."
            );
          }

          return true;
        },
      },
    },
    uservalidity: {
      in: ["body"],
      isDate: { format: "YYYY-MM-DD" },
      errorMessage: "Please enter a valid date.",
    },
  }),
  validateEditAccount: checkSchema({
    accname: {
      in: ["body"],
      errorMessage:
        "Please enter a account name that is at least three characters long.",
      isString: true,
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 3 },
      },
    },
    username: {
      in: ["body"],
      errorMessage:
        "Please enter a name that is at least four characters long.",
      isString: true,
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 4 },
      },
    },
    userstatus: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (value) => {
          if (value <= 0 || value >= 3) {
            throw new Error(
              "The account status you selected is not recognized as valid."
            );
          }
          return true;
        },
      },
    },
    address: {
      in: ["body"],
      errorMessage:
        "Please enter a address that is at least one characters long.",
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 1 },
      },
    },
    city: {
      in: ["body"],
      errorMessage:
        "Please enter a city name that is at least one characters long.",
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 1 },
      },
    },
    state: {
      in: ["body"],
      errorMessage:
        "Please enter a state name that is at least one characters long.",
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 1 },
      },
    },
    pincode: {
      in: ["body"],
      isString: {
        bail: true,
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (value) => {
          const validatePincode = value.match(/^[1-9][0-9]{5}$/);
          if (!validatePincode) {
            throw new Error("Please enter a valid pincode.");
          }
          return true;
        },
      },
    },
    userphone: {
      in: ["body"],
      isString: true,
      optional: { options: { nullable: true } },
      custom: {
        options: (value) => {
          const validatePhone = value.match(
            /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
          );
          if (!validatePhone) {
            throw new Error("Please enter a valid mobile number.");
          }
          return true;
        },
      },
    },
    admin_id: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Please enter a valid admin Id.",
    },
    account_id: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Please enter a valid account Id.",
    },
    useremail: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    userpwd: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    userverified: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    userid: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    role: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    accid: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    users: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    _id: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    blocked: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    usercredits: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
  }),

  validateEditUser: checkSchema({
    username: {
      in: ["body"],
      errorMessage:
        "Please enter a name that is at least four characters long.",
      isString: true,
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 3 },
      },
    },
    userstatus: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (value) => {
          if (value <= 0 || value >= 3) {
            throw new Error(
              "The account status you selected is not recognized as valid."
            );
          }
          return true;
        },
      },
    },
    address: {
      in: ["body"],
      errorMessage:
        "Please enter a address that is at least one characters long.",
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 1 },
      },
    },
    city: {
      in: ["body"],
      errorMessage:
        "Please enter a city name that is at least one characters long.",
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 1 },
      },
    },
    state: {
      in: ["body"],
      errorMessage:
        "Please enter a state name that is at least one characters long.",
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 1 },
      },
    },
    pincode: {
      in: ["body"],
      isString: {
        bail: true,
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (value) => {
          const validatePincode = value.match(/^[1-9][0-9]{5}$/);
          if (!validatePincode) {
            throw new Error("Please enter a valid pincode.");
          }
          return true;
        },
      },
    },
    userphone: {
      in: ["body"],
      isString: {
        bail: true,
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (value) => {
          const validatePhone = value.match(
            /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
          );
          if (!validatePhone) {
            throw new Error("Please enter a valid mobile number.");
          }
          return true;
        },
      },
    },
    user_id: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Please enter a valid user Id.",
    },
    useremail: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    userpwd: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    userverified: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    userid: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    role: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    _id: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    blocked: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
    usercredits: {
      in: ["body"],
      exists: {
        negated: true,
      },
    },
  }),
  validateDeleteAccount: checkSchema({
    account_id: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Please enter a valid account Id.",
    },
  }),
  validateDeleteUser: checkSchema({
    user_id: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Please enter a valid user Id.",
    },
  }),
  forgotPasswordValidator: checkSchema({
    email: {
      in: ["body"],
      errorMessage: "Please provide a valid email address.",
      isEmail: {
        bail: true,
      },
    },
  }),
  setPasswordValidator: checkSchema({
    newPassword: {
      in: ["body"],
      isString: {
        bail: true,
      },
      errorMessage: "Please provide a valid password.",
      custom: {
        options: (value) => {
          const validatePassword = value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
          );
          if (!validatePassword) {
            throw new Error("Please provide a valid password.");
          }
          return true;
        },
      },
    },
  }),
  reSetPasswordValidator: checkSchema({
    newPassword: {
      in: ["body"],
      isString: {
        bail: true,
      },
      errorMessage: "Please provide a valid password.",
      custom: {
        options: (value) => {
          const validatePassword = value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
          );
          if (!validatePassword) {
            throw new Error("Please provide a valid password.");
          }
          return true;
        },
      },
    },
    oldPassword: {
      custom: {
        options: (value) => {
          if (value === null || value === undefined) {
            throw new Error("Please provide a valid password.");
          }
          return true;
        },
      },
    },
  }),
  OTPValidator: checkSchema({
    otp: {
      in: ["body"],
      isString: true,
      errorMessage: "Please provide a valid OTP.",
    },
  }),

  superAdminCreditValidator: checkSchema({
    credit: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value.toString().includes(".")) {
            throw new Error("Invalid user credits format.");
          }
          if (value > 5000 || value < 10) {
            throw new Error("credits limit must be in range of 10 to 5000  ");
          }
          return true;
        },
      },
    },
    txn_type: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value.toString().includes(".")) {
            throw new Error("Invalid user txn_type format.");
          }
          if (value === false || value !== 1) {
            throw new Error("transaction type is invalid.");
          }
          return true;
        },
      },
    },
    accid: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Invalid account Id format.",
    },
    receiver_id: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Invalid reciever Id format.",
    },
  }),

  adminCreditValidator: checkSchema({
    accid: {
      in: ["body"],
      custom: {
        options: (value) => {
          if (value.length > 0) {
            throw new Error("accid must be empty.");
          }
          return true;
        },
      },
    },

    credit: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value, { req }) => {
          if (value.toString().includes(".")) {
            throw new Error("Invalid user credits format.");
          }
          if (value > 0 && req.body.txn_type !== 2) {
            throw new Error("Invalid transaction process: adding credits.");
          } else if (value < 0 && req.body.txn_type !== 3) {
            throw new Error("Invalid transaction process: deducting credits");
          } else if (
            value == 0 &&
            (req.body.txn_type === 2 || req.body.txn_type === 3)
          ) {
            throw new Error("credits limit minimum 1");
          }

          return true;
        },
      },
    },
    txn_type: {
      in: ["body"],
      isNumeric: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value.toString().includes(".")) {
            throw new Error("Invalid user txn_type format.");
          }

          return true;
        },
      },
    },

    receiver_id: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Invalid reciever Id format.",
    },
  }),
  creditTransferHistoryValidator: checkSchema({
    id: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "Invalid  Id format.",
    },
  }),

  dashboardValidator: checkSchema({
    accid: {
      in: ["body"],
      custom: {
        options: (value, { req }) => {
          if (req.authdetails.role === 0 && value.length > 0) {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              throw new Error(
                "accid is required and must be a valid ObjectId."
              );
            }
          } else if (req.authdetails.role === 1) {
            if (value.length > 0) {
              throw new Error("accid must be empty.");
            }
          } else if (req.authdetails.role === 2) {
            if (value.length > 0) {
              throw new Error("accid must be empty.");
            }
          }
          return true;
        },
      },

      trim: true,
    },
    userid: {
      in: ["body"],
      // errorMessage: "userid is required and must be a valid ObjectId",
      // isMongoId: true,
      custom: {
        options: (value, { req }) => {
          if (req.authdetails.role === 0 && value.length > 0) {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              throw new Error(
                "userid is required and must be a valid ObjectId."
              );
            }
          } else if (req.authdetails.role === 1 && value.length > 0) {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              throw new Error(
                "userid is required and must be a valid ObjectId."
              );
            }
          } else if (req.authdetails.role === 2) {
            if (value.length > 0) {
              throw new Error("userid must be empty.");
            }
          }
          return true;
        },
      },
      trim: true,
    },
    startDate: {
      in: ["body"],
      optional: { options: { nullable: true, checkFalsy: true } },
      isDate: { format: "YYYY-MM-DD" },
      errorMessage:
        "startDate is required and must be a valid date in YYYY-MM-DD format.",
      trim: true,
    },
    endDate: {
      in: ["body"],
      optional: { options: { nullable: true, checkFalsy: true } },
      isDate: { format: "YYYY-MM-DD" },
      errorMessage:
        "endDate is required and must be a valid date in YYYY-MM-DD format.",

      trim: true,
    },
  }),
  superAdminTransactionValidator: checkSchema({
    accid: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "accid is required and must be a valid ObjectId.",
      trim: true,
    },
    startDate: {
      in: ["body"],
      optional: { options: { nullable: true, checkFalsy: true } },
      isDate: { format: "YYYY-MM-DD" },
      errorMessage:
        "startDate is required and must be a valid date in YYYY-MM-DD format.",
      trim: true,
    },
    endDate: {
      in: ["body"],
      optional: { options: { nullable: true, checkFalsy: true } },
      isDate: { format: "YYYY-MM-DD" },
      errorMessage:
        "endDate is required and must be a valid date in YYYY-MM-DD format.",

      trim: true,
    },
  }),
  adminTransactionValidator: checkSchema({
    userid: {
      in: ["body"],
      isMongoId: true,
      errorMessage: "accid is required and must be a valid ObjectId.",
      trim: true,
    },
    startDate: {
      in: ["body"],
      optional: { options: { nullable: true, checkFalsy: true } },
      isDate: { format: "YYYY-MM-DD" },
      errorMessage:
        "startDate is required and must be a valid date in YYYY-MM-DD format.",
      trim: true,
    },
    endDate: {
      in: ["body"],
      optional: { options: { nullable: true, checkFalsy: true } },
      isDate: { format: "YYYY-MM-DD" },
      errorMessage:
        "endDate is required and must be a valid date in YYYY-MM-DD format.",

      trim: true,
    },
  }),
  userTransactionValidator: checkSchema({
    startDate: {
      in: ["body"],
      optional: { options: { nullable: true, checkFalsy: true } },
      isDate: { format: "YYYY-MM-DD" },
      errorMessage:
        "startDate is required and must be a valid date in YYYY-MM-DD format.",
      trim: true,
    },
    endDate: {
      in: ["body"],
      optional: { options: { nullable: true, checkFalsy: true } },
      isDate: { format: "YYYY-MM-DD" },
      errorMessage:
        "endDate is required and must be a valid date in YYYY-MM-DD format.",

      trim: true,
    },
  }),
  validateAdminEnroll: checkSchema({
    name: {
      in: ["body"],
      errorMessage:
        "Please enter a name that is at least four characters long.",
      isString: true,
      isLength: {
        options: { min: 4 },
      },
    },
    emailid: {
      in: ["body"],
      errorMessage: "Please provide a valid email address.",
      isEmail: {
        bail: true,
      },
      customSanitizer: {
        options: (value, { req, location, path }) => {
          let sanitizedValue;

          if (req.body.emailid && location && path) {
            sanitizedValue = value.toLowerCase().split(" ").join("");
          }
          return sanitizedValue;
        },
      },
    },
    address: {
      in: ["body"],
      errorMessage:
        "Please enter a address that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    city: {
      in: ["body"],
      errorMessage:
        "Please enter a city name that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    state: {
      in: ["body"],
      errorMessage:
        "Please enter a state name that is at least one characters long.",
      isLength: {
        options: { min: 1 },
      },
    },
    pincode: {
      in: ["body"],
      isString: {
        bail: true,
      },
      custom: {
        options: (value) => {
          const validatePincode = value.match(/^[1-9][0-9]{5}$/);
          if (!validatePincode) {
            throw new Error("Please enter a valid pincode.");
          }
          return true;
        },
      },
    },
    mobile: {
      in: ["body"],
      isString: {
        bail: true,
      },
      custom: {
        options: (value) => {
          const validateMobile = value.match(
            /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
          );
          if (!validateMobile) {
            throw new Error("Please enter a valid mobile number.");
          }
          return true;
        },
      },
    },
  }),
  panCrValidator: checkSchema({
    
    rrn: {
      in: ["body"],
      isString: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value.length <= 15 && value.length >= 8) {
            throw new Error("userid is required and must be a valid ObjectId.");
          }
          return true;
        },
      },
    },
    env: {
      in: ["body"],
      isString: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value.length == 1 && (value == 1 || value == 2)) {throw new Error("userid is required and must be a valid ObjectId.");}
          return true;
        },
      },
    },
    // slk: {},
    fullName: {
      in: ["body"],
      errorMessage:
        "Please enter a name that is at least four characters long.",
      isString: true,
      optional: { options: { nullable: true } },
      isLength: {
        options: { min: 4 },
      },
      validate: {
        validator: (val) => validator.isAlpha(val, ["en-US"], { ignore: " " }),
        errorMessage: "name must only contain characters between A-Z",
      },
    },
    dob: {
      in: ["body"],
      isDate: { format: "YYYY-MM-DD" },
      errorMessage: "Please enter a valid date.",
    },
    emailId: {
      in: ["body"],
      errorMessage: "Please provide a valid email address.",
      isEmail: {
        bail: true,
      },
      customSanitizer: {
        options: (value, { req, location, path }) => {
          let sanitizedValue;

          if (req.body.useremail && location && path) {
            sanitizedValue = value.toLowerCase().split(" ").join("");
          }
          return sanitizedValue;
        },
      },
    },
    gender: {
      in: ["body"],
      isString: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if (value !== "M" && value !== "F"){
throw new Error("gender must be male or felmale");
          } return true;
        },
      },
    },
    ackNo: {
      in: ["body"],
      isString: {
        bail: true,
      },
      custom: {
        options: (value) => {
          if(value.length!==15){
            throw new Error("Enter correct ack no.");
          }
          return true;
        },
      },
    },
  }),
};




module.exports = ExpressValidator;
