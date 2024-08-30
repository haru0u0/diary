import { Link } from "react-router-dom";

function LpFooter() {
  return (
    <>
      <div className="bg-slate-300 text-center">
        <div className="pb-36 pt-5">
          <h2 className="text-3xl">Let's Get Started!</h2>
          <a className="nes-btn is-primary mt-10" href="/api/v1/auth">
            <i className="fa-brands fa-google"></i>
            &nbsp;Login / Sign Up with Google
          </a>
        </div>
        <div className="pb-2 text-slate-500 font-vt">
          <Link to="/">Home</Link> |{" "}
          <Link to="https://forms.gle/PfM8xEaGxXSE6rdP6" target="_blank">
            Contact
          </Link>{" "}
          | <Link to="/privacypolicy">Privacy Policy</Link>
        </div>
        <div className="pb-5 text-slate-500 font-vt">© 2024 Diary Quest</div>
      </div>
    </>
  );
}

export default LpFooter;
