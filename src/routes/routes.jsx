import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../pages/BookDetails";
import UpdateBook from "../pages/UpdateBook";
import ErrorRoutePage from "../components/ErrorRoutePage";
import About from "../pages/About";
import Terms from "../pages/Terms";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorRoutePage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-books",
        element: <AllBooks />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome/>
      },
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorRoutePage />,
  },
]);

export default router;
