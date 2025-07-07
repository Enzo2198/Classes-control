import {createBrowserRouter} from "react-router";
import Classes from "../pages/Classes"
import ClassDetail from "../pages/ClassDetail";
import { OverviewContent, MembersContent, TestsContent } from "../components/ClassroomLayout/ClassroomContent";
import Login from "../pages/Login"
import Register from "../pages/Register"
import {AddNewClass} from "../components";

const router = createBrowserRouter([
  {
    path: "/classes",
    element: <Classes/>,
  },
  {
    path: "/class/:id",
    element: <ClassDetail />,
    children: [
      {
        index: true,
        element: <OverviewContent />,
      },
      {
        path: "overview",
        element: <OverviewContent />,
      },
      {
        path: "tests",
        element: <TestsContent />,
      },
      {
        path: "members",
        element: <MembersContent />,
      },
    ],
  },
  {
    path: "/class/add",
    element: <AddNewClass />,
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