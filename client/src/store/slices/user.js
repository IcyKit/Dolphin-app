import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const { data } = await axios.get('/me');
  console.log(data);
  return data;
});

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async ({ userData }) => {
    await axios.post('/me', {
      userData,
    });
    const { data } = await axios.get('/me');
    return data;
  }
);

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userData = [];
      state.isUserLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isUserLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userData = [];
      state.isUserLoading = false;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
