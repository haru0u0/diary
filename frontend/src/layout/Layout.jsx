import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="m-5">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
