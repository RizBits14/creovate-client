import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import router from './Routes/Routes.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './Provider/ThemeContext.jsx';


createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <StrictMode>
      <AuthProvider>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </StrictMode>
  </ThemeProvider>
)
