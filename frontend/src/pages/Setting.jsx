import useAuthFalseRedirect from "../hooks/useAuthFalseRedirect";

function Setting() {
  useAuthFalseRedirect({
    falsePath: "/",
  });

  return (
    <>
      <div>
        <h2 className="text-xl">You are logged in as:</h2>
        <p>inu@gmail.inu</p>
      </div>
      {/*
      <h2 className="text-xl">Your name</h2>
      <form action="" method="get">
        <input
          type="text"
          name="name"
          id="name"
          value="Haruka" 
          className="border-4 border-black block"
          required
        />
        <div className="form-example">
          <input className="nes-btn" type="submit" value="Subscribe!" />
        </div>
      </form>
      */}
      <a className="nes-btn mt-10" href="#">
        Log out
      </a>
      <br></br>
      <a className="nes-btn mt-3" href="#">
        Delete your account
      </a>
    </>
  );
}

export default Setting;
