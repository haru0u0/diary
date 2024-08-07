import useAuthSuccessRedirect from "../hooks/useAuthSuccessRedirect";

function Login() {
  useAuthSuccessRedirect({
    successPath: "/calendar",
  });

  return (
    <>
      <p>By logging in/sign up, you can access to the full features!</p>
      <a className="nes-btn is-primary" href="http://localhost/api/v1/auth">
        <i className="fa-brands fa-google"></i>
        &nbsp;Login with Google
      </a>
    </>
  );
}

export default Login;
