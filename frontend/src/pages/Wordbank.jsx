import useAuthFalseRedirect from "../hooks/useAuthFalseRedirect";

function Wordbank() {
  useAuthFalseRedirect({
    successPath: "/wordbank",
    falsePath: "/",
  });

  return (
    <>
      <h2>Wordbank</h2>
    </>
  );
}

export default Wordbank;
