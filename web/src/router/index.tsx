import {createBrowserRouter, Navigate} from "react-router";
import {AddNewClass} from "../components";
import PublicLayout from "./PublicLayout";
import ProtectedLayout from "./ProtectedLayout.tsx";
import ExamFlowLayout from "./ExamFlowLayout.tsx";
import StudentExamDetail from "../components/ExamGroup/Student/Page/examDetail.tsx";
import {Register, ClassDetail, Classes, Login, Profile, Invite, NotFound} from "../pages";

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
          {path: "/class/add", element: <AddNewClass/>},
          {path: "/profile", element: <Profile/>},

          // Exam Flow routes
          {
            element: <ExamFlowLayout/>,
            children: [
              {
                path: "/class/:id/*",
                element: <ClassDetail/>
              },
              {
                path: '/class/:id/exam/:examGroupId/doing',
                element: <StudentExamDetail/>
              },
            ],
          },
        ],
      },

      // Public invite + Home
      {path: "/invite", element: <Invite/>},
      {path: "/", element: <Classes/>},
      {path: "/", element: <Navigate to="/classes" replace/>},
      {path: "*", element: <NotFound/>},
    ],
  },
]);

export default router;
