const mongoose = require("mongoose");

module.exports = () => {
  connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("connect db success");
  } catch (error) {
    console.log(error, ": failed");
  }
};
