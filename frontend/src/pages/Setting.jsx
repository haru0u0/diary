import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Setting() {
  let navigate = useNavigate();
  const [account, setAccount] = useState("Loading");

  useEffect(() => {
    async function checkAuth() {
      const auth = await axiosClient.get("/auth/isAuthed");
      setAccount(auth.data.user);
    }
    checkAuth();
  }, []);

  async function handleLogout() {
    try {
      await axiosClient.post("/auth/logout");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    try {
      await axiosClient.post("/auth/delete");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  function openModal() {
    document.getElementById("dialog-rounded").showModal();
  }

  function closeModal() {
    document.getElementById("dialog-rounded").close();
  }

  return (
    <>
      <div className="my-5">
        <h2 className="text-xl">You are logged in as:</h2>
        <p>{account}</p>
      </div>
      <div>
        <h2 className="text-xl">Links To...</h2>
        <Link to="https://forms.gle/PfM8xEaGxXSE6rdP6" target="_blank">
          Contact
        </Link>
        <br></br>
        <Link to="/privacypolicy">Privacy Policy</Link>
      </div>
      <button className="nes-btn mt-10 is-primary" onClick={handleLogout}>
        Log out
      </button>
      <br></br>
      <button className="nes-btn mt-3" onClick={openModal}>
        Delete your account
      </button>

      <dialog className="nes-dialog is-rounded w-full" id="dialog-rounded">
        <h2 className="text-2xl">Are you absolutely sure?</h2>
        <p>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </p>
        <div>
          <button className="m-3 ml-0 nes-btn" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="m-3 ml-0 nes-btn is-primary"
            onClick={handleDelete}
          >
            Yes, delete my account
          </button>
        </div>
      </dialog>
    </>
  );
}

export default Setting;
