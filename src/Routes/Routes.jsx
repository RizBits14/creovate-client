import { createBrowserRouter } from 'react-router';
import HomePageLayout from '../Layout/HomePageLayout.jsx';
import Home from '../Pages/Home.jsx';
import Explore from '../Components/Explore.jsx';
import Login from '../Pages/Login.jsx';
import Register from '../Pages/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePageLayout,
    children:[
      {
        path:'/',
        Component: Home
      },
      {
        path:'/explore',
        Component: Explore
      },
      {
        path:'/login',
        Component: Login
      },
      {
        path:'/register',
        Component: Register
      }
    ]
  },
]);
export default router;