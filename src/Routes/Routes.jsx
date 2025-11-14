import { createBrowserRouter } from "react-router-dom";
import HomePageLayout from "../Layout/HomePageLayout.jsx";
import Home from "../Pages/Home.jsx";
import Explore from "../Components/Explore.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import PrivateRoute from "../Routes/PrivateRoute.jsx";
import ArtworkDetails from "../Pages/ArtworkDetails.jsx";
import AddArtwork from "../Pages/AddArtwork.jsx";
import MyGallery from "../Pages/MyGallery.jsx";
import MyFavourites from "../Pages/MyFavourites.jsx";
import Error404Page from "../Pages/Error404Page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/art/:id",
        element: (
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-art",
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-gallery",
        element: (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/favourites",
        element: (
          <PrivateRoute>
            <MyFavourites />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <Error404Page />,
  },
]);

export default router;
