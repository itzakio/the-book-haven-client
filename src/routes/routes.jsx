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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorRoutePage/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-books",
        element: (
            <PrivateRoute>
                <MyBooks />
            </PrivateRoute>
        ),
      },
      {
        path: "/book-details/:id",
        element: (
            <PrivateRoute>
                <BookDetails />
            </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
            <PrivateRoute>
                <UpdateBook />
            </PrivateRoute>
        ),
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
  {
    path: "*",
    element: <ErrorRoutePage/>
  }
]);

export default router;
