import {createBrowserRouter} from "react-router"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"

export const router = createBrowserRouter([
    {
        path: "/",
        element:<LoginPage/>
    },
    {
        path:"/home",
        element:<HomePage/>
    }
])