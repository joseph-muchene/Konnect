const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 4,
      max: 8,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      maxlength: 255,
    },
    website: {
      type: String,
    },

    profilePhoto: {
      type: String,
    },
    about: {
      type: String,
      maxlength: 255,
    },
    Dob: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
