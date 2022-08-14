const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
exports.loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json("All fields are required");
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: "user is not registered" });

  //   check for matched password

  const matchedPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!matchedPassword) {
    return res.status(400).json({
      msg: "invalid credentials",
    });
  } else {
    const payload = {
      userId: user.id,
      name: user.name,
    };
    // generate token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
      function (err, token) {
        if (err || !token) throw new Error("something went wrong");

        const response = {
          user: {
            payload,
            token,
          },
        };

        return res.status(200).json(response);
      }
    );
  }
};
