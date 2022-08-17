import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserData from "./UserService";

const initialState = {
  users: [],
  user: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "/participants/all",
  async (_, thunkAPI) => {
    try {
      return await UserData.getAllUsers();
    } catch (err) {
      const message = err.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getSignedUser = createAsyncThunk(
  "/signed/user",
  async (_, thunkAPI) => {
    try {
      return await UserData.getUser();
    } catch (err) {
      const message = err.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "/update/user",
  async (userData, thunkAPI) => {
    try {
      return await UserData.updateUser(userData);
    } catch (err) {
      const message = err.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "/unfollow/user",
  async (userId, thunkAPI) => {
    try {
      return await UserData.unfollowUser(userId);
    } catch (error) {
      const message = error.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const followUser = createAsyncThunk(
  "/follow/user",
  async (userId, thunkAPI) => {
    try {
      return await UserData.followUser(userId);
    } catch (error) {
      const message = error.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/id",
  async (userId, thunkAPI) => {
    try {
      return await UserData.getUserById(userId);
    } catch (error) {
      const message = error.response.data.msg.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getSignedUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSignedUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.message = "";
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getSignedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "";
        state.isError = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      // follow user
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.users = action.payload.result;
        state.isSuccess = true;
        state.message = action.payload.msg;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.isSuccess = false;
      })
      // unfollow user

      .addCase(unfollowUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.users = action.payload.result;
        state.isSuccess = true;
        state.message = action.payload.msg;
        state.isError = false;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      // get user by Id
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.message = "";
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = UserSlice.actions;

export default UserSlice.reducer;
