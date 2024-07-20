import { configureStore } from '@reduxjs/toolkit';
import bookListReducer from '../reducers/booklist/bookListSlice';
import loginReducer from '../reducers/login/loginSlice';

export const store = configureStore({
    reducer: {
        bookList: bookListReducer,
        login: loginReducer
    },
});
