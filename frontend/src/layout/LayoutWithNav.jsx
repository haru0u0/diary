import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import LpComponent from "../components/Lp/LpMain";

function LayoutWithNav() {
  const [authState, setAuthState] = useState("Loading");

  useEffect(() => {
    async function checkAuth() {
      const auth = await axiosClient.get("/auth/isAuthed");
      setAuthState(auth.data.authenticated);
    }
    checkAuth();
  }, []);
  return (
    <>
      {(() => {
        if (authState == true) {
          return (
            <>
              <div className="m-10 mb-24 lg:ml-64">
                <Outlet />
              </div>
              <Navbar />
            </>
          );
        } else if (authState == false) {
          return <LpComponent />;
        } else {
          return <div>Loading...</div>;
        }
      })()}
    </>
  );
}

export default LayoutWithNav;
