import {useEffect, useState} from "react";
import {getValidAccessToken} from "../utils";

export function FlowLayout() {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token: string | null = await getValidAccessToken();
      setIsAuthenticated(!!token);
      setIsChecking(false);
    }

    checkAuth();
  },[]);

  return {isChecking, isAuthenticated};
}

