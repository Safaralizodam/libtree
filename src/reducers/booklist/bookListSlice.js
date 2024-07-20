import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosTodo } from '../../utils/axiosRequest/axiosRequest';

export const getlist = createAsyncThunk('bookList/getlist', async () => {
  try {
    const { data } = await axiosTodo();
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const bookListSlice = createSlice({
  name: 'bookList',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getlist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

  },
});

export default bookListSlice.reducer;
