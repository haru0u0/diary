import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function useAuthFalseRedirect(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/auth/isAuthed")
      .then((res) => {
        if (res.data.authenticated) {
          setIsAuthenticated(res.data.user);
        } else {
          setIsAuthenticated(false);
          navigate(props.falsePath);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication", error);
        setIsAuthenticated(false);
        navigate(props.falsePath);
      });
  }, [navigate]);

  return isAuthenticated;
}

export default useAuthFalseRedirect;
