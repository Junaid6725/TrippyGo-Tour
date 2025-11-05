import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BasicLayout from "./components/user/layout/BasicLayout";
import Home from "./pages/userPages/Home";
import Login from "./pages/userPages/Login";
import Register from "./pages/userPages/Register";
import Contact from "./pages/userPages/Contact";
import About from "./pages/userPages/About";
import Destinations from "./pages/userPages/Destinations";
import Booking from "./pages/userPages/Booking";
import Faqs from "./pages/userPages/Faqs";
import TourismInfrastructure from "./pages/userPages/TourismInfrastructure";
import BookingGuide from "./pages/userPages/BookingGuide";
import TermsConditions from "./pages/userPages/TermsConditions";
import Responsibilities from "./pages/userPages/Responsibilities";
import WhatToPack from "./pages/userPages/WhatToPack";
import NotFound from "./pages/userPages/NotFound";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Dashboard from "./components/admin/adminHomeComponent/Dashboard";
import Users from "./pages/adminPages/Users";
import AdminTour from "./pages/adminPages/AdminTour";
import AdminBookings from "./pages/adminPages/AdminBookings";
import EditTour from "./components/admin/adminTourComponent.jsx/EditTour";
import Tour from "./pages/userPages/Tour";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import UserDashboard from "./pages/userPages/UserDashboard";
import AddTour from "./components/admin/adminTourComponent.jsx/AddTour";
import AllTours from "./pages/userPages/AllTours";
import ScrollToTop from "./components/common/ScrollToTop";
import UserBooking from "./components/user/bookingPageComponent/UserBooking";
import UserLayout from "./components/user/layout/UserLayout";
import UserProfile from "./pages/userPages/UserProfile";
import AdminDestinations from "./pages/adminPages/AdminDestinations";
import AddDestination from "./components/admin/adminDestinationComponent/AddDestination";
import DestinationTours from "./components/user/userHomePageComponent/DestinationsTours";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <BasicLayout />
        </>
      ),

      children: [
        { path: "/", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "contact", element: <Contact /> },
        { path: "about", element: <About /> },
        { path: "destinations", element: <Destinations /> },
        // { path: "guides", element: },
        { path: "faqs", element: <Faqs /> },
        { path: "tourism-infrastructure", element: <TourismInfrastructure /> },
        { path: "booking-guide", element: <BookingGuide /> },
        { path: "terms-conditions", element: <TermsConditions /> },
        { path: "responsibilities", element: <Responsibilities /> },
        { path: "packing-list", element: <WhatToPack /> },
        { path: "tours", element: <AllTours /> },
        { path: "tours/:id", element: <Tour /> },
        { path: "booking/:id", element: <Booking /> },
        {
          path: "tours/destination/:destinationId",
          element: <DestinationTours />,
        },

        {
          element: <ProtectedRoutes role="user" />,
          children: [
            {
              path: "user-dashboard",
              element: <UserLayout />,
              children: [
                { path: "user-profile", element: <UserProfile /> },
                { path: "user-booking", element: <UserBooking /> },
              ],
            },
          ],
        },

        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/admin-dashboard",
      element: (
        <>
          <ScrollToTop />
          <ProtectedRoutes role="admin">
            <AdminLayout />
          </ProtectedRoutes>
        </>
      ),

      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "users", element: <Users /> },
        { path: "tour", element: <AdminTour /> },
        { path: "booking", element: <AdminBookings /> },
        { path: "edit-tour/:id", element: <EditTour /> },
        { path: "destination", element: <AdminDestinations /> },
        { path: "add-destination", element: <AddDestination /> },
        { path: "add-tour", element: <AddTour /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
