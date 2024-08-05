import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/auth/isAuthed")
      .then((res) => {
        if (res.data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error checking authentication", error);
        setIsAuthenticated(false);
        navigate("/login");
      });
  }, [navigate]);

  return isAuthenticated;
}

export default useAuth;
