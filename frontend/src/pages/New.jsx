import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useState, useEffect } from "react";

function New() {
  let navigate = useNavigate();
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

      navigate(`/version/${created.data.version_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosClient.get("/collection/expression");
        setList(res.data.expressions.rows || []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

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
          className="nes-dialog is-rounded h-full w-full"
          id="dialog-rounded"
        >
          <div className="border-b-4 border-black pb-4">
            <button
              className="text-2xl float-right"
              onClick={() => closeModal()}
            >
              &times;
            </button>
            <div>
              <h2 className="text-3xl">Word Bank</h2>
              <p>
                Use the expressions you learnt in your previous entries to
                enrich your expression.
              </p>
            </div>
          </div>
          {list.length > 0 ? (
            list.map((expression, index) => (
              <div key={index}>
                <div className="border-b-2 border-black p-4 text-wrap break-words">
                  <div className="text-wrap">
                    <p className="inline text-sm">{expression.original} </p>
                    <i className="fa-solid fa-arrow-right fa-xs"></i>
                    <p className="font-vt text-3xl">{expression.expression}</p>
                  </div>
                  <p>{expression.explanation}</p>
                </div>
                <div className="m-5"></div>
              </div>
            ))
          ) : (
            <p>No expressions available</p>
          )}
        </dialog>
      </section>
    </>
  );
}

export default New;
