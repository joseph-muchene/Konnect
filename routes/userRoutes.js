const router = require("express").Router();
const {
  createUser,
  deleteUser,
  getSignedUser,
  getUser,
  followUser,
  getAllUsers,
  unfollowUser,
  updateUser,
} = require("../controller/userController");
const { verifyToken } = require("../middlewares/verifyToken");

// status
router.route("/register").post(createUser);
router.route("/update").put(verifyToken, updateUser);
router.route("/delete").delete(verifyToken, deleteUser);
router.route("/signed/me").get(verifyToken, getSignedUser);
router.route("/follow/:userId").put(verifyToken, followUser);
router.route("/unfollow/:userId").put(verifyToken, unfollowUser);
router.route("/participants/all").get(getAllUsers);
router.route("/:userId").get(getUser);

module.exports = router;
