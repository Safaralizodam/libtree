import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Basket, BookInfo, BookList, Layout, Login } from './routes/routes';
import FullPageLoader from './components/components1/FullPageLoader';
import Spinner from './components/components2/Spinner';
import { ThemeProvider } from './components/context/ThemeContext'; 
import Header from './components/header/header'; 
import ProtectedRout from '../src/utils/protectedRoute/protectedRoute';

// Define the router
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense fallback={<FullPageLoader />}>
        <Layout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<Spinner message="Loading... " />}>
            <BookList />
          </React.Suspense>
        ),
      },
      {
        path: 'book/:id',
        element: (
          <React.Suspense fallback={<Spinner message="Loading... " />}>
           <ProtectedRout>
              <BookInfo />
            </ProtectedRout>
            
          </React.Suspense>
        ),
      },
      {
        path: '/basket',
        element: (
          <React.Suspense fallback={<Spinner message="Loading... " />}>
            <ProtectedRout>
              <Basket />
            </ProtectedRout>
          </React.Suspense>
        ),
      },
    
      {
        path: '/login',
        element: (
          <React.Suspense fallback={<Spinner message="Loading... " />}>
            <Login/>
          </React.Suspense>
        ),
      },
    ],
  },
]);

// Main App component
const App = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Header />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;
