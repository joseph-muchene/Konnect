const router = require("express").Router();
const {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPost,
  timeline,
  commentPost,
  like,
} = require("../controller/postController");
const { verifyToken } = require("../middlewares/verifyToken");
router.route("/").post(verifyToken, createPost);
router.route("/").get(getAllPosts);
router.route("/timeline/all").get(verifyToken, timeline);
router.route("/:postId").put(verifyToken, updatePost);
router.route("/:postId").get(getPost);
router.route("/:postId").delete(verifyToken, deletePost);
router.route("/like/:postId").put(verifyToken, like);
router.route("/comment/:postId").put(verifyToken, commentPost);
module.exports = router;
