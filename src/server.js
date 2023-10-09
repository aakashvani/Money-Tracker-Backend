require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/index.js");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
// app.get("/healthCheck", async (req, res) => {
//   try {
    
//     return res.status(200).send({
//       respcode: 200,
//       respdesc: "Health check is success",
//       data: null,
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send({
//       respcode: 500,
//       respdesc: "Health check is failed",
//       data: null,
//     });
//   }
// });
app.use(cors(corsOptions));


// const reconciliation = require("./util/cronJob/reconcilliation.js");

// const {
//   creditExpiry,
//   creditHistory,
// } = require("./util/cronJob/creditExpiryCJ.js");

// reconciliation.start();
// creditExpiry.start();
// creditHistory.start();

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .send({ respcode: 400, respdesc: "Invalid Json format", data: null });
  }
  next();
});

app.use(routes);

module.exports = app;
