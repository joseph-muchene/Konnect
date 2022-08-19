require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

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

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "./", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
const port = process.env.PORT;

app.listen(port, function () {
  console.log(`server started on ${port}`);
});
