import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/Auth/AuthSlice";
import PostReducer from "../features/Post/PostSlice";
import UserReducer from "../features/Users/UserSlice";
import SearchReducer from "../features/Search/SearchSlice";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer,
    search: SearchReducer,
  },
});
