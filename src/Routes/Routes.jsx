import { createBrowserRouter } from "react-router-dom";
import HomePageLayout from "../Layout/HomePageLayout.jsx";
import Home from "../Pages/Home.jsx";
import Explore from "../Components/Explore.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import PrivateRoute from "../Routes/PrivateRoute.jsx";
import ArtworkDetails from "../Pages/ArtworkDetails.jsx";
import Error404Page from "../Pages/Error404Page.jsx";
import About from "../Pages/About.jsx";
import Contact from "../Pages/Contact.jsx";

import DashboardHome from "../Pages/Dashboard/DashboardHome.jsx";
import Profile from "../Pages/Dashboard/Profile.jsx";
// import DashboardLayout from "../Layout/DashBoardLayout.jsx";

import AddArtwork from "../Pages/AddArtwork.jsx";
import MyGallery from "../Pages/MyGallery.jsx";
import MyFavourites from "../Pages/MyFavourites.jsx";
import DashBoardLayout from "../Layout/DashBoardLayout.jsx";
// import DashboardLayout from "../Layout/DashboardLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      { path: "/art/:id", element: <ArtworkDetails /> },
    ],
  },


  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-art", element: <AddArtwork /> },
      { path: "my-gallery", element: <MyGallery /> },
      { path: "favourites", element: <MyFavourites /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  { path: "*", element: <Error404Page /> },
]);

export default router;
