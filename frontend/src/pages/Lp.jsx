import { Link } from "react-router-dom";
import useAuthSuccessRedirect from "../hooks/useAuthSuccessRedirect";

function Lp() {
  useAuthSuccessRedirect({
    successPath: "/calendar",
  });

  return (
    <>
      <h2>Welcome to Diary app!</h2>
      <br />
      <Link className="nes-btn is-primary" to="/login">
        Login
      </Link>
    </>
  );
}

export default Lp;
