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

export const fetchFollowUser = createAsyncThunk(
  'user/fetchFollowUser',
  async ({ id, user_id }) => {
    await axios.post('/follow', { id, user_id });
    const { data } = await axios.get('/me');
    return data;
  }
);

export const fetchUnfollowUser = createAsyncThunk(
  'user/fetchUnfollowUser',
  async ({ id, user_id }) => {
    await axios.post('/unfollow', { id, user_id });
    const { data } = await axios.get('/me');
    return data;
  }
);

export const fetchUploadAvatar = createAsyncThunk(
  'user/fetchUploadAvatar',
  async (url) => {
    if (url) {
      const { data } = await axios.post('/me/avatar', { url });
      return data;
    }
  }
);

export const fetchUpdateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async ({ newPassword, oldPassword }) => {
    const { data } = await axios.post('/me/password', {
      newPassword,
      oldPassword,
    });
    return data;
  }
);

const initialState = {
  userData: { totalmessages: 0 },
  isUserLoading: true,
  settings: {
    isSettingLoading: false,
    status: {},
    nicknameError: false,
    oldPasswordError: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incPosts: (state) => {
      state.userData.totalmessages += 1;
    },
  },
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
      if (action.payload.status === 'nicknameError') {
        state.settings.nicknameError = true;
      } else {
        state.settings.status = action.payload;
      }
      state.settings.isSettingLoading = false;
    });
    builder.addCase(fetchUpdateUser.rejected, (state, action) => {
      state.settings.status = action.payload;
      state.settings.isSettingLoading = false;
    });
    builder.addCase(fetchUploadAvatar.fulfilled, (state, action) => {
      state.settings.status = action.payload;
      state.settings.isSettingLoading = false;
    });
    builder.addCase(fetchUploadAvatar.rejected, (state, action) => {
      state.settings.status = action.payload;
      state.settings.isSettingLoading = false;
    });
    builder.addCase(fetchUpdateUserPassword.pending, (state, action) => {
      state.settings.isSettingLoading = true;
    });
    builder.addCase(fetchUpdateUserPassword.fulfilled, (state, action) => {
      if (action.payload.status === 'oldPasswordError') {
        state.settings.oldPasswordError = true;
      } else {
        state.settings.status = action.payload;
        state.settings.oldPasswordError = false;
      }
      state.settings.isSettingLoading = false;
    });
  },
});

export const { incPosts } = userSlice.actions;

export const selectUserId = (state) => state.user.userId.id;

export default userSlice.reducer;
