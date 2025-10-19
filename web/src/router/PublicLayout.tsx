import {useEffect, useState} from "react";
import {getValidAccessToken} from "./auth.ts";
import { Navigate, Outlet } from "react-router";
import {Loading} from "../components";

export default function PublicLayout() {
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = await getValidAccessToken();
      if (isMounted) {
        setIsAuthenticated(!!token)
        setIsChecking(false)
      }
    }

    checkAuth()
    return () => {
      isMounted = false
    }
  }, [])
   if (isChecking) return <Loading />
   if (isAuthenticated) return <Navigate to="/classes" />

   return <Outlet />
}