import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function useAuthSuccessRedirect(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/auth/isAuthed")
      .then((res) => {
        if (res.data.authenticated) {
          setIsAuthenticated(res.data.user);
          navigate(props.successPath);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication", error);
        setIsAuthenticated(false);
      });
  }, [navigate]);

  return isAuthenticated;
}

export default useAuthSuccessRedirect;
