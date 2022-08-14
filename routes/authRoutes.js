const router = require("express").Router();
const { loginUser } = require("../controller/authController");

router.route("/login").post(loginUser);

module.exports = router;
