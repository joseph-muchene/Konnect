const mongoose = require("mongoose");

exports.connectDb = () => {
  mongoose.connect("mongodb://localhost/Connect", (err, connection) => {
    if (connection && !err) {
      console.log("mongodb connection was established");
    }
  });
};
