import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root'
import Home from './Component/Home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children:
    {
      path: '/',
      element: <Home></Home>
    }
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
