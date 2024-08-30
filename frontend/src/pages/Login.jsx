function Login() {
  return (
    <>
      <p>By logging in/sign up, you can access to the full features!</p>
      <a className="nes-btn is-primary" href="/api/v1/auth">
        <i className="fa-brands fa-google"></i>
        &nbsp;Login with Google
      </a>
    </>
  );
}

export default Login;
