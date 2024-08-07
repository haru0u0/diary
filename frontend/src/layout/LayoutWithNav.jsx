import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function LayoutWithNav() {
  return (
    <>
      <div className="m-5 mb-24 lg:ml-64">
        <Outlet />
      </div>
      <Navbar />
    </>
  );
}

export default LayoutWithNav;
