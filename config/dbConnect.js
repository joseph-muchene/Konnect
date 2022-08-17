const mongoose = require("mongoose");

exports.connectDb = () => {
  mongoose.connect(process.env.Mongo_uri, (err, connection) => {
    if (connection && !err) {
      console.log("mongodb connection was established");
    }
  });
};
