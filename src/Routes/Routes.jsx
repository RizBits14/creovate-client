import { createBrowserRouter } from "react-router-dom";
import HomePageLayout from "../Layout/HomePageLayout.jsx";
import Home from "../Pages/Home.jsx";
import Explore from "../Components/Explore.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
