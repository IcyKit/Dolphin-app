import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ followingId, id }) => {
    const { data } = await axios.post('/posts/followed', { followingId, id });
    return data;
  }
);

export const fetchPostsById = createAsyncThunk(
  'posts/fetchPostsById',
  async (id) => {
    if (id) {
      const { data } = await axios.get(`/posts/${id}`);
      return data;
    }
  }
);

export const fetchCreatePost = createAsyncThunk(
  'posts/fetchCreatePost',
  async ({ text, img }) => {
    await axios.post('/posts', {
      content: text,
      attachment: img,
    });
    const { data } = await axios.get('/posts');
    return data;
  }
);

const initialState = {
  posts: [],
  filteredPosts: [],
  isPostsLoading: false,
  isEditorLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isPostsLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.filteredPosts = action.payload;
      state.isPostsLoading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isPostsLoading = false;
    });
    builder.addCase(fetchCreatePost.pending, (state, action) => {
      state.isEditorLoading = true;
    });
    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isEditorLoading = false;
    });
    builder.addCase(fetchCreatePost.rejected, (state, action) => {
      state.isEditorLoading = false;
    });
    builder.addCase(fetchPostsById.fulfilled, (state, action) => {
      state.filteredPosts = action.payload;
    });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
