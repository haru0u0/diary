import { Link, useNavigate } from "react-router-dom";
import useAuthFalseRedirect from "../hooks/useAuthFalseRedirect";
import axiosClient from "../api/axiosClient";

function New() {
  let navigate = useNavigate();
  useAuthFalseRedirect({
    falsePath: "/",
  });

  function openModal() {
    document.getElementById("dialog-rounded").showModal();
  }

  function closeModal() {
    document.getElementById("dialog-rounded").close();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = new FormData(e.target).get("entry");

    try {
      const created = await axiosClient.post("/entry/new", {
        diary: input,
      });

      //console.log("version:" + created.data.version_id);
      //console.log("entry:" + created.data.entry_id);

      navigate(`/version/${created.data.version_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 mb-2 lg:ml-5">
        <Link
          to="/calendar"
          className="font-vt text-2xl justify-self-start self-center"
        >
          &times;
        </Link>
        <button
          type="submit"
          form="diary"
          className="nes-btn is-primary justify-self-end text-lg pt-0 pb-0 self-center"
        >
          Submit
        </button>
      </div>
      <form id="diary" className="block lg:ml-5" onSubmit={handleSubmit}>
        <textarea
          name="entry"
          placeholder="How was your day?"
          rows="10"
          className="w-full border-0"
          autoFocus
        ></textarea>
      </form>

      <section>
        <div className="fixed bottom-0 right-0 m-2">
          <button onClick={() => openModal()}>
            <img
              src="../public/images/book.png"
              className="object-contain h-12 w-12"
            />
          </button>
        </div>
        <dialog
          className="nes-dialog is-rounded w-full h-full"
          id="dialog-rounded"
        >
          <button className="text-2xl" onClick={() => closeModal()}>
            &times;
          </button>
          <h2 className="text-2xl">Rounded dialog</h2>
          <p>This is a dialog.</p>
        </dialog>
      </section>
    </>
  );
}

export default New;

/*
  function openModal() {
    document.querySelector("#modal").classList.remove("hidden");
  }

  function closeModal() {
    document.querySelector("#modal").classList.add("hidden");
  }
  
        <div className="fixed bottom-0 right-0 m-2">
        <button onClick={() => openModal()}>
          <img
            src="../public/images/book.png"
            className="object-contain h-12 w-12"
          />
        </button>
      </div>
      <div className="nes-container with-title is-rounded hidden" id="modal">
        <button className="text-2xl block" onClick={() => closeModal()}>
          &times;
        </button>
        <p>Alert: this is a dialog.</p>
      </div>
  */
