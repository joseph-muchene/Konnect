import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostService from "./PostService";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  posts: [],
  post: {},
  message: "",
};

// create a post

export const createPost = createAsyncThunk(
  "/post/create",
  async (postData, thunkAPI) => {
    try {
      return await PostService.createPost(postData);
    } catch (error) {
      const message = error.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// add comment
export const AddComment = createAsyncThunk(
  "comment/create",
  async (commentData, thunkAPI) => {
    try {
      return await PostService.AddComment(commentData);
    } catch (error) {
      const message = error.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllPosts = createAsyncThunk(
  "/posts/timeline",
  async (_, thunkAPI) => {
    try {
      return await PostService.getAllPosts();
    } catch (error) {
      const message = error.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//like/unlike post
export const LikePost = createAsyncThunk(
  "/post/like/unlike",
  async (postId, thunkAPI) => {
    try {
      return await PostService.AddLike(postId);
    } catch (error) {
      const message = error.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.message = action.payload.msg;
        state.isLoading = false;
        state.posts.push(action.payload.result);
        state.isSuccess = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(AddComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddComment.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(state.posts);
        state.posts = action.payload.result;
        state.isSuccess = true;
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isSuccess = false;
      })

      // handle likes
      .addCase(LikePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LikePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.result;
        state.isSuccess = true;
      })
      .addCase(LikePost.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;
