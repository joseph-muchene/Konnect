const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
// get the user
exports.getUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById({ _id: userId });
  return res.status(200).json(user);
};

exports.getSignedUser = async (req, res) => {
  const user = await User.findById({ _id: req.user.userId }).select(
    "-password"
  );

  return res.status(200).json(user);
};

exports.createUser = async function (req, res) {
  try {
    // check if the user exists
    const { email, password, name } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.json({
        msg: "The user already exists",
      });
    }

    // hash passsword
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    // register the user

    const createdUser = new User({
      name,
      email,
      password: hashPassword,
    });

    const savedUser = await createdUser.save();

    return res.status(200).json({
      msg: "user was created",
      result: savedUser,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deleteUser = function (req, res) {
  const userId = req.user.userId;

  User.findByIdAndRemove({ _id: userId }, function (err, user) {
    if (err || !user) return res.status(404).json("user was not found");

    return res.status(200).json("user was account was removed successfully");
  });
};

exports.updateUser = async function (req, res) {
  // get the user Id
  const userId = req.user.userId;

  User.findOneAndUpdate({ id: userId }, { $set: req.body }, { new: true }).exec(
    (err, data) => {
      if (err || !data) {
        return res.status(400).json({
          msg: "could not update",
        });
      } else {
        return res.status(200).json(data);
      }
    }
  );
};

exports.followUser = async (req, res) => {
  const userId = req.params.userId;
  const currentUser = req.user.userId;

  const user = await User.findById(userId);
  const current = await User.findById(currentUser);
  // check the user is followed

  if (user._id.toString() !== current._id.toString()) {
    if (!current.followings.includes(userId)) {
      await user.updateOne({ $push: { followers: currentUser } });
      await current.updateOne({ $push: { followings: userId } });
      const users = await User.find();
      return res.status(200).json({
        msg: "user has been followed",
        result: users,
      });
    } else {
      return res.status(403).json({
        msg: "you already follow this user",
      });
    }
  } else {
    return res.status(403).json({
      msg: "Skip the part where you follow yourself!",
    });
  }
};

exports.unfollowUser = async (req, res) => {
  const userId = req.params.userId;
  const currentUser = req.user.userId;

  const user = await User.findById(userId);
  const current = await User.findById(currentUser);
  // check the user is followed

  if (current.followings.includes(userId)) {
    await current.updateOne({ $pull: { followings: userId } });
    await user.updateOne({ $pull: { followers: currentUser } });
    const users = await User.find();
    return res.status(200).json({
      msg: "user has been unfollowed",
      result: users,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  return res.status(200).json(users);
};
