import ReactCalendar from "react-calendar";
import { useState, useEffect } from "react";
import { isSameDay } from "date-fns";
import "../calendar.css";
import useAuthFalseRedirect from "../hooks/useAuthFalseRedirect";
import moment from "moment";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

function Calendar() {
  useAuthFalseRedirect({
    falsePath: "/",
  });

  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const [dateState, setDateState] = useState(today);
  const [dateEntries, setDateEntries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const startTime = moment(dateState).format();
      const endTime = moment(dateState).add(1, "days").format();
      setDateState(startTime);

      try {
        const res = await axiosClient.get("/entry/date", {
          params: { start: startTime, end: endTime },
        });
        setDateEntries(res.data.dateEntry.rows);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [dateState]);

  const changeDate = async (e) => {
    const startTime = moment(e).format();
    setDateState(startTime);
  };

  const show = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      if (isSameDay(date, today)) {
        return <div>Today!</div>;
      }
    }
    return null;
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:grid-">
      <div className="flex justify-center mb-3 lg:mr-10 lg:ml-10">
        <ReactCalendar
          onChange={changeDate}
          value={dateState}
          tileContent={show}
          locale="en-GB"
          maxDate={new Date()}
        />
      </div>
      {dateEntries.length === 0 ? (
        <div>No entries on this day</div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center w-full">
          {dateEntries.map((n) => (
            <Link
              to={`/version/${n.version_id}`}
              key={n.id}
              className="nes-balloon from-right nes-pointer mb-10 w-full"
            >
              <p>{n.content}</p>
              <p className="text-xs">{moment(n.created_at).format("h:mm a")}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendar;
