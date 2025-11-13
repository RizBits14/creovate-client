import { createBrowserRouter } from 'react-router';
import HomePageLayout from '../Layout/HomePageLayout.jsx';
import Home from '../Pages/Home.jsx';
import Explore from '../Components/Explore.jsx';

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
      }
    ]
  },
]);
export default router;