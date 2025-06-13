import {createBrowserRouter} from "react-router";
import Classes from "../pages/Classes"
import ClassDetail from "../pages/ClassDetail";
import Login from "../pages/Login"
import Register from "../pages/Register"

const router = createBrowserRouter([
  {
    path: "/classes",
    element: <Classes/>,
  },
  {
    path: "/class/:id",
    element: <ClassDetail/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

export default router