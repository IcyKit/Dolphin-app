import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const { data } = await axios.get('/me');
  return data;
});

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (userData) => {
    const { data } = await axios.post('/me', userData);
    return data;
  }
);

export const fetchUploadAvatar = createAsyncThunk(
  'user/fetchUploadAvatar',
  async ({ url }) => {
    const { data } = await axios.post('/me/avatar', { url });
  }
);

const initialState = {
  userData: {},
  isUserLoading: true,
  settings: {
    isSettingLoading: false,
    status: {},
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userData = {};
      state.isUserLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isUserLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userData = {};
      state.isUserLoading = false;
    });
    builder.addCase(fetchUpdateUser.pending, (state, action) => {
      state.settings.isSettingLoading = true;
    });
    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.settings.status = action.payload;
      state.settings.isSettingLoading = false;
    });
    builder.addCase(fetchUpdateUser.rejected, (state, action) => {
      state.settings.status = action.payload;
      state.settings.isSettingLoading = false;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
