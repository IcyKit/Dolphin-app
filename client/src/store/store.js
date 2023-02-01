import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './slices/posts';
import userSlice from './slices/user.js';
import recommendsSlice from './slices/recommends';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: userSlice,
    recommends: recommendsSlice,
  },
});
