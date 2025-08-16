import { createBrowserRouter } from "react-router"; // ✅ Use 'react-router-dom' not 'react-router'

import App from "../App";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/Notfound";
import DashBoard from "../Pages/Dashboard/DashBoard";
import AllDonations from "../Pages/AllDonations/AllDonations";
import Users from "../Pages/Dashboard/Users/Users"; // ✅ Parent layout for user dashboard
import Restaurants from "../Pages/Dashboard/Restaurants/Restaurant";
import Charity from "../Pages/Dashboard/Charity/Charity";
import Admin from "../Pages/Dashboard/Admin/Admin";
import DonationDetails from "../Pages/AllDonations/DonationDetails";

// ✅ User Dashboard Sub-Pages
import MyProfile from "../Pages/Dashboard/Users/MyProfile";
import RequestCharityRole from "../Pages/Dashboard/Users/RequestCharityRole";
import MyReviews from "../Pages/Dashboard/Users/MyReviews";
import TransactionHistory from "../Pages/Dashboard/Users/TransactionHistory";
import RestaurantProfile from "../Pages/Dashboard/Restaurants/RestaurantProfile";
import AddDonation from "../Pages/Dashboard/Restaurants/AddDonation";
import MyDonations from "../Pages/Dashboard/Restaurants/MyDonations";
import RequestedDonations from "../Pages/Dashboard/Restaurants/RequestedDonations";
import CharityProfile from "../Pages/Dashboard/Charity/CharityProfile";
import MyRequests from "../Pages/Dashboard/Charity/MyRequests";
import MyPickups from "../Pages/Dashboard/Charity/MyPickups";
import ReceivedDonations from "../Pages/Dashboard/Charity/ReceivedDonations";
import CharityTransactions from "../Pages/Dashboard/Charity/CharityTransactions";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import ManageDonations from "../Pages/Dashboard/Admin/ManageDonations";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageRoleRequests from "../Pages/Dashboard/Admin/ManageRoleRequests";
import ManageRequests from "../Pages/Dashboard/Admin/ManageRequests";
import FeatureDonations from "../Pages/Dashboard/Admin/FeatureDonations";
import Success from "../Pages/Dashboard/Users/Success";
import PrivateRoute from "../Context/PrivateRoute";
import Fav from "../Pages/Dashboard/Users/Fav";
import ReChart from "../Pages/Dashboard/Restaurants/ReChart";
import Overview from "../Pages/Dashboard/Users/OverView";
import AdminOverview from "../Pages/Dashboard/Admin/OverView";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";
import Profiles from "../Pages/Home/Profiles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "/all-donations",
        element: (
          <PrivateRoute>
            <AllDonations></AllDonations>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-donation/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/donations/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "profiles",
        element:<PrivateRoute><Profiles/></PrivateRoute> ,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      
      {
        path: "users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            ),
          },

          {
            path: "request-charity",
            element: (
              <PrivateRoute>
                <RequestCharityRole />
              </PrivateRoute>
            ),
          },
          {
            path: "favorites",
            element: <PrivateRoute><Fav /></PrivateRoute>,
          },
          {
            path: "reviews",
            element: <PrivateRoute><MyReviews /></PrivateRoute>,
          },
          {
            path: "transactions",
            element: <PrivateRoute><TransactionHistory /></PrivateRoute>,
          },
          {
            path: "over-view",
            element: <PrivateRoute><Overview /></PrivateRoute>,
          },
        ],
      },
      {
        path: "restaurants",
        element: <Restaurants />,
        children: [
          {
            index: true,
            element: <RestaurantProfile />,
          },

          {
            path: "add-donation",
            element: (
              <PrivateRoute>
                <AddDonation />
              </PrivateRoute>
            ),
          },
          {
            path: "my-donations",
            element: (
              <PrivateRoute>
                <MyDonations />
              </PrivateRoute>
            ),
          },
          {
            path: "requests",
            element: (
              <PrivateRoute>
                <RequestedDonations />
              </PrivateRoute>
            ),
          },
          {
            path: "donation-charts",
            element: (
              <PrivateRoute>
                <ReChart />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "charity",
        element: <Charity />,
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <CharityProfile />
              </PrivateRoute>
            ),
          },
          { path: "requests", element: <MyRequests /> },
          { path: "pickups", element: <MyPickups /> },
          { path: "received", element: <ReceivedDonations /> },
          { path: "transactions", element: <CharityTransactions /> },
        ],
      },
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-donations",
            element: (
              <PrivateRoute>
                <ManageDonations />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-users",
            element:<PrivateRoute><ManageUsers /></PrivateRoute> ,
          },
          {
            path: "manage-role-requests",
            element: <PrivateRoute><ManageRoleRequests /></PrivateRoute>,
          },
          {
            path: "manage-requests",
            element:<PrivateRoute><ManageRequests /></PrivateRoute> ,
          },
          {
            path: "feature-donations",
            element: <PrivateRoute><FeatureDonations /></PrivateRoute>,
          },
          {
            path: "over-view-admin",
            element:<PrivateRoute><AdminOverview /></PrivateRoute> ,
          },
        ],
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
    ],
  },
]);

export default router;
