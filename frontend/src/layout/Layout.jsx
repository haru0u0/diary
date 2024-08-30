import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import LpComponent from "../components/Lp/LpMain";

function Layout() {
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
      <div className="m-10">
        {(() => {
          if (authState == true) {
            return <Outlet />;
          } else if (authState == false) {
            return <LpComponent />;
          } else {
            return <div>Loading...</div>;
          }
        })()}
      </div>
    </>
  );
}

export default Layout;
