// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import UserLayout from "./components/user/layout/UserLayout";
// import Home from "./pages/userPages/Home";
// import Login from "./pages/userPages/Login";
// import Register from "./pages/userPages/Register";
// import Contact from "./pages/userPages/Contact";
// import About from "./pages/userPages/About";
// import Destinations from "./pages/userPages/Destinations";
// import Booking from "./pages/userPages/Booking";
// import Faqs from "./pages/userPages/Faqs";
// import TourismInfrastructure from "./pages/userPages/TourismInfrastructure";
// import BookingGuide from "./pages/userPages/BookingGuide";
// import TermsConditions from "./pages/userPages/TermsConditions";
// import Responsibilities from "./pages/userPages/Responsibilities";
// import WhatToPack from "./pages/userPages/WhatToPack";
// import NotFound from "./pages/userPages/NotFound";
// import AdminLayout from "./components/admin/layout/AdminLayout";
// import Dashboard from "./components/admin/adminHomeComponent/Dashboard";
// import Users from "./pages/adminPages/Users";
// import Query from "./pages/adminPages/Query";
// import AdminTour from "./pages/adminPages/AdminTour";
// import AdminBookings from "./pages/adminPages/AdminBookings";
// import EditTour from "./components/admin/adminTourComponent.jsx/EditTour";
// import Tour from "./pages/userPages/Tour";
// import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
// import UserDashboard from "./pages/userPages/UserDashboard";

// function App() {
//   const router = createBrowserRouter([
//     // USER ROUTES
//     {
//       path: "/",
//       element: <UserLayout />,
//       children: [
//         { path: "/", element: <Home /> },
//         { path: "/login", element: <Login /> },
//         { path: "/register", element: <Register /> },
//         { path: "/contact", element: <Contact /> },
//         { path: "/about", element: <About /> },
//         { path: "/destinations", element: <Destinations /> },
//         { path: "/guides", element: <Booking /> },
//         { path: "/faqs", element: <Faqs /> },
//         { path: "/tourism-infrastructure", element: <TourismInfrastructure /> },
//         { path: "/booking-guide", element: <BookingGuide /> },
//         { path: "/terms-conditions", element: <TermsConditions /> },
//         { path: "/responsibilities", element: <Responsibilities /> },
//         { path: "/packing-list", element: <WhatToPack /> },
//         { path: "/tours", element: <Tour /> },
//         {
//           path: "/user-dashboard",
//           element: (
//             <ProtectedRoutes role="user">
//               <UserDashboard />
//             </ProtectedRoutes>
//           ),
//         },
//         { path: "*", element: <NotFound /> },
//       ],
//     },

//     // ADMIN ROUTES (all protected under AdminLayout)
//     {
//       path: "/admin-dashboard",
//       element: <ProtectedRoutes role="admin" />,
//       children: [
//         {
//           path: "dashboard",
//           element: <AdminLayout />,
//           children: [
//             { path: "dashboard", element: <Dashboard /> },
//             { path: "users", element: <Users /> },
//             { path: "query", element: <Query /> },
//             { path: "tour", element: <AdminTour /> },
//             { path: "booking", element: <AdminBookings /> },
//             { path: "edit-tour", element: <EditTour /> },
//             { path: "*", element: <NotFound /> },
//           ],
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "./components/user/layout/UserLayout";
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
import Query from "./pages/adminPages/Query";
import AdminTour from "./pages/adminPages/AdminTour";
import AdminBookings from "./pages/adminPages/AdminBookings";
import EditTour from "./components/admin/adminTourComponent.jsx/EditTour";
import Tour from "./pages/userPages/Tour";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import UserDashboard from "./pages/userPages/UserDashboard";
import AddTour from "./components/admin/adminTourComponent.jsx/AddTour";
import AllTours from "./pages/userPages/AllTours";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <UserLayout />
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

        {
          element: <ProtectedRoutes role="user" />,
          children: [
            { path: "booking/:id", element: <Booking /> },
            { path: "user-dashboard", element: <UserDashboard /> },
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
        { path: "query", element: <Query /> },
        { path: "tour", element: <AdminTour /> },
        { path: "booking", element: <AdminBookings /> },
        { path: "edit-tour/:id", element: <EditTour /> },
        { path: "add-tour", element: <AddTour /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
