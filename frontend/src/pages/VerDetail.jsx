import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import moment from "moment";

function VerDetail() {
  const incoming_params = useParams();

  const [version, setContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [badge, setBadge] = useState("");
  const [expressions, setExpressions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/entry/version", {
          params: { id: incoming_params.id },
        });
        setContent(res.data.version);
        setFeedback(res.data.feedback);
        setBadge(res.data.badge);
        setExpressions(res.data.expressions || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [incoming_params.id]);

  return (
    <>
      <div className="text-center my-8 lg:mx-56">
        <h2>
          Journal on
          <br></br>
          <span className="text-4xl">
            {moment(version.created_at).format("MMM Do YYYY")}
          </span>
        </h2>
        <p className="font-vt">{moment(version.created_at).format("h:mm a")}</p>
        <div className="m-5">{version.content}</div>
        <div className="nes-balloon from-left nes-pointer mb-10 w-full">
          {feedback}
        </div>
        <img
          src="../public/images/brown_dog_00.png"
          className="object-contain h-14"
        ></img>
        <div className="m-5">
          <h3 className="text-3xl">Next Time, Try These Alternatives!</h3>
          <p className="text-sm">
            Explore three fresh phrases to make your diary entries more engaging
          </p>
        </div>
        {expressions.length > 0 ? (
          expressions.map((expression, index) => (
            <div key={index}>
              <div className="nes-container is-rounded">
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
        <div className="m-5 grid justify-items-center grid-cols-1">
          <h3 className="text-3xl">Congrats! You’ve Earned...</h3>
          <p className="text-sm">
            Celebrate your exploration of a variety of topics with the badges
          </p>
          <img
            src={`../../public/images/badges/${badge}.png`}
            className="object-contain h-36 w-36"
          />
          <p className="capitalize">{badge} Badge</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Link to="/calendar" className="nes-btn is-primary font-vt text-lg ">
          Finish Review
        </Link>
      </div>
    </>
  );
}

export default VerDetail;
