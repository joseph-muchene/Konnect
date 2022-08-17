require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
// import routes
const userRoutes = require("./routes/userRoutes");
const AuthRoutes = require("./routes/authRoutes");
const { connectDb } = require("./config/dbConnect");

connectDb();

// middlewares for express
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/post", require("./routes/postRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log(`server started on ${port}`);
});
