import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function LayoutWithNav() {
  return (
    <>
      <div className="flex justify-center m-5">
        <Outlet />
      </div>
      <Navbar />
    </>
  );
}

export default LayoutWithNav;
