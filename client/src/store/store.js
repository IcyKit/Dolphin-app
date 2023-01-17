import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/posts";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});
