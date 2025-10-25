import {createBrowserRouter, Navigate} from "react-router";
import Classes from "../pages/Classes"
// import ClassDetail from "../pages/ClassDetail";
import Login from "../pages/Login"
import Register from "../pages/Register"
// import {AddNewClass} from "../components"; // , CreateExam, ExamDetail, ExamsContent, MembersContent, OverviewContent
// import NotFound from "../pages/NotFound";
import PublicLayout from "./PublicLayout";
import ProtectedLayout from "./ProtectedLayout.tsx";
// import ExamFlowLayout from "./ExamFlowLayout.tsx";
// import Profile from "../pages/Profile";
// import Invite from "../pages/Invite/index.tsx";

const router = createBrowserRouter([
  {
    // errorElement: <NotFound/>,
    children: [
      // Public routes
      {
        element: <PublicLayout/>,
        children: [
          {path: "/login", element: <Login/>},
          {path: "/register", element: <Register/>},
        ],
      },

      // Protected routes
      {
        element: <ProtectedLayout/>,
        children: [
          {path: "/classes", element: <Classes/>},
          // {path: "/class/add", element: <AddNewClass/>},
          // {path: "/profile", element: <Profile/>},

          // Exam Flow routes
          {
            path: "/class/:id",
            // element: <ExamFlowLayout/>,
            children: [
              // {index: true, element: <ClassDetail/>},
              // { path: "exam/:examGroupId/doing", element: <StudentExamDetail /> },
            ],
          },
        ],
      },

      // Public invite + Home
      // {path: "/invite", element: <Invite/>},
      // { path: "/", element: <Index /> },
      {path: "/", element: <Navigate to="/classes" replace />},
      // {path: "*", element: <NotFound/>},
    ],
  },
]);

export default router;
