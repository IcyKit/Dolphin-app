import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/posts";
import userSlice from "./slices/user.js";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: userSlice,
  },
});
