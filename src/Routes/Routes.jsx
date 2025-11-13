import { createBrowserRouter } from "react-router-dom";
import HomePageLayout from "../Layout/HomePageLayout.jsx";
import Home from "../Pages/Home.jsx";
import Explore from "../Components/Explore.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import PrivateRoute from "../Routes/PrivateRoute.jsx";
import ArtworkDetails from "../Pages/ArtworkDetails.jsx";

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
      {
        path: "/art/:id", 
        element: (
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
