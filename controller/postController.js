const postModel = require("../models/postModel");
const User = require("../models/userModel");
exports.createPost = async (req, res) => {
  try {
    // GET THE FIELDS FROM THE REQUEST BODY
    const postData = new postModel({
      ...req.body,
      user: req.user.userId,
    });

    const post = await postData.save();

    return res.status(200).json({
      msg: "post saved successfully",
      result: post,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.postId);

    return res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    // check if the user Id in post matches with the current user

    const userpostId = await postModel.findById({ _id: req.params.postId });

    if (req.user.userId === userpostId.user.toString()) {
      const post = await postModel.findByIdAndRemove(req.params.postId);

      return res.status(200).json({
        msg: "post deleted successfully",
        result: post,
      });
    } else {
      return res.status(403).json({
        msg: "you are not allowed to do that",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const userpostId = await postModel.findById({ _id: req.params.postId });
    if (req.user.userId === userpostId.user.toString()) {
      postModel.findByIdAndUpdate(
        { _id: req.params.postId },
        { $set: req.body },
        { new: true },
        (err, doc) => {
          if (err || !doc)
            return res.status(404).json({
              msg: "Document was not found",
            });

          return res.status(200).json({
            result: doc,
            msg: "post was updated",
          });
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await postModel.find();
  return res.status(200).json(posts);
};

exports.like = async (req, res) => {
  const postId = req.params.postId;
  const post = await postModel.findById(postId);

  // check if the post is liked
  if (!post.likes.includes(req.user.userId)) {
    await post.updateOne({ $push: { likes: req.user.userId } });
    const likePost = await postModel.find();
    res.status(200).json({
      msg: "like added",
      postId,
      result: likePost,
    });
  } else {
    await post.updateOne({ $pull: { likes: req.user.userId } });
    const likePost = await postModel.find();
    res.status(200).json({
      msg: "disliked",
      postId,
      result: likePost,
    });
  }
};
exports.commentPost = async (req, res) => {
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  await post.updateOne({
    $push: {
      comments: {
        id: Math.random().toFixed(6).toString().split(".")[1],
        name: req.user.name,
        userId: req.user.userId,
        text: req.body.text,
      },
    },
  });
  const comment = await postModel.find();

  res.status(200).json({
    msg: "comment added",
    postId,
    result: comment,
  });
};

exports.timeline = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const currentUser = await User.findById({ _id: currentUserId });
    const Userposts = await postModel.find({ user: currentUserId });

    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        postModel.find({ user: friendId });
      })
    );
    res.status(200).json(Userposts.concat(...friendsPosts));
  } catch (err) {
    console.log(err.message);
  }
};
