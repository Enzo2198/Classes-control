import {Navigate, Outlet} from "react-router";
import {Loading} from "../components";
import {FlowLayout} from "./FlowLayout.ts";

export default function PublicLayout() {
  const {isAuthenticated, isChecking} = FlowLayout()

  if (isChecking) return <Loading/>
  if (isAuthenticated) {
    return <Navigate to="/classes" replace/>
  }
  return <Outlet/>
}