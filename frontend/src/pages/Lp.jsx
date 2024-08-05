import { Link } from "react-router-dom";

function Lp() {
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
