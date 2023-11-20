import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = '/api/recommendation';

export const fetchData = createAsyncThunk('data/fetchData', async (postData) => {
    try {
      const response = await axios.post(apiUrl, {fileId:postData});
      return response.data.message;
    } catch (error) {
      throw error;
    }
  });

const recommendSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recommendSlice.reducer;
