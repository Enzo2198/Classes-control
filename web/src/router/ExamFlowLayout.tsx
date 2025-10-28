import { Outlet } from "react-router"
import {ExamFlowProvider} from "../contexts/ExamFlowProvider.tsx";

export default function ExamFlowLayout() {
  return (
    <ExamFlowProvider>
      <Outlet />
    </ExamFlowProvider>
  )
}
