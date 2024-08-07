import useAuthFalseRedirect from "../hooks/useAuthFalseRedirect";

function Collection() {
  useAuthFalseRedirect({
    falsePath: "/",
  });

  return (
    <>
      <h2>Collection</h2>
    </>
  );
}

export default Collection;
