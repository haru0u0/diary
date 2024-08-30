import axiosClient from "../api/axiosClient";
import { useEffect, useState } from "react";

function Wordbank() {
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
      {list.length > 0 ? (
        list.map((expression, index) => (
          <div key={index}>
            <div className="nes-container is-rounded text-wrap break-words">
              <div className="">
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
    </>
  );
}

export default Wordbank;
