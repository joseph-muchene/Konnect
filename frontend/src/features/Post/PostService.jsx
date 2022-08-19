import axios from "axios";

const URL = "/api/v1/";
const createPost = async (postData) => {
  const token = JSON.parse(localStorage.getItem("user")).user.token;
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };
  const { data } = await axios.post(URL + "post", postData, config);

  return data;
};

const getAllPosts = async () => {
  const { data } = await axios.get(URL + "post");

  return data;
};

const AddComment = async (commentD) => {
  // const { postId, commentD } = commentD;
  const token = JSON.parse(localStorage.getItem("user")).user.token;
  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const { data } = await axios.put(
    URL + "post/comment/" + commentD.postId,
    commentD.commentData,
    config
  );

  return data;
};
// router.route("/like/:postId").put(verifyToken, like);
const AddLike = async (postId) => {
  const token = JSON.parse(localStorage.getItem("user")).user.token;

  const config = {
    headers: {
      token: "Bearer " + token,
    },
  };

  const { data } = await axios.put(URL + "post/like/" + postId, "", config);

  return data;
};

const PostService = {
  createPost,
  AddLike,
  getAllPosts,
  AddComment,
};

export default PostService;
