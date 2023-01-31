import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBloggers = createAsyncThunk(
  'recommends/fetchBloggers',
  async () => {
    const { data } = await axios.get('/recommends/bloggers');
    return data;
  }
);

const initialState = {
  bloggers: [],
  actual: [],
  isBloggersLoading: true,
  isActualLoading: true,
};

export const recommendsSlice = createSlice({
  name: 'recommends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBloggers.pending, (state, action) => {
      state.isBloggersLoading = true;
    });
    builder.addCase(fetchBloggers.fulfilled, (state, action) => {
      state.isBloggersLoading = false;
      state.bloggers = action.payload;
    });
  },
});

export const {} = recommendsSlice.actions;

export default recommendsSlice.reducer;
