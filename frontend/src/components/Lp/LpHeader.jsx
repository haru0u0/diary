function LpHeader() {
  return (
    <>
      <div className="text-center">
        <div className="pt-36 bg-slate-300">
          <div>
            <img src="/images/chara.png" className="h-32 w-32 m-auto poyooon" />
            <h2 className="text-5xl">Diary Quest</h2>
            <p>Enhance your English fluency through journaling</p>
            <a
              className="nes-btn is-primary mt-20 mb-10"
              href="http://localhost/api/v1/auth"
            >
              <i className="fa-brands fa-google"></i>
              &nbsp;Login / Sign Up with Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LpHeader;
