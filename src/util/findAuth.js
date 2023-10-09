const { AccountsModel } = require("../domains/users/model");

const findAuth = async (authData) => {
  try {
    let checkRole = await AccountsModel.aggregate([
      { $project: { users: 1, _id: 0 } },
      { $unwind: { path: "$users" } },
      {
        $match: {
          "users.useremail": authData.email,
          "users.userpwd": authData.password,
        },
      },
    ]);

    if (checkRole.length <= 0) {
      return false;
    }

    return checkRole[0]["users"].role;
  } catch (error) {
    throw new Error(error.stack);
  }
};

module.exports = {
  findAuth,
};
