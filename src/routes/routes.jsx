import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path:"/all-books",
                element: <AllBooks/>
            },
            {
                path:"/add-book",
                element: <AddBook/>
            },
            {
                path:"/my-books",
                element: <MyBooks/>
            },
            {
                path:"/login",
                element: <Login/>
            },
            {
                path:"/register",
                element: <Register/>
            },
        ]
    }
])

export default router;