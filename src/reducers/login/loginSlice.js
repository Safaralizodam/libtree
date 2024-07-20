import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosLogin } from '../../utils/axiosRequest/axiosRequest';
import { saveToken } from '../../utils/token/token';

export const postLogin = createAsyncThunk('login/postLogin', async (loginCredentials, { rejectWithValue }) => {
    try {
        const { data } = await axiosLogin.post('/api/Auth/Login', loginCredentials); 
        saveToken(data.token); 
        console.log(data);
        return data; 
    } catch (error) {
        return rejectWithValue(error.response.data); 
    }
});

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; 
            })
    },
});

export default loginSlice.reducer;
