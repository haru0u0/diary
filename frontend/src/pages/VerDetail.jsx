import useAuthFalseRedirect from "../hooks/useAuthFalseRedirect";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

function VerDetail() {
  const incoming_params = useParams();
  useAuthFalseRedirect({
    falsePath: "/",
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/entry/version", {
          params: { id: incoming_params.id },
        });
        setContent(res.data.version.rows[0].content);
        console.log(res.data.version.rows[0].content);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [incoming_params.id]);

  return (
    <>
      <div className="grid grid-cols-2 mb-2 lg:ml-5">
        <Link
          to="/calendar"
          className="font-vt text-2xl justify-self-start self-center"
        >
          &times;
        </Link>
      </div>
      <p>{incoming_params.id}</p>
      <p>{content}</p>
    </>
  );
}

export default VerDetail;
