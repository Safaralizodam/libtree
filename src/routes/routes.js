import { lazy } from "react";


export const Layout = lazy(() => import('../layout/layout'));
export const BookList = lazy(() => import('../pages/booklist/bookList'));
export const BookInfo = lazy(() => import('../pages/bookinfo/bookInfo'));
export const Basket = lazy(() => import('../pages/basket/basket'));
export const Login = lazy(() => import('../pages/login/login'));
