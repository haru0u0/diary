import ReactCalendar from "react-calendar";
import { useState, useEffect } from "react";
import "../calendar.css";
import moment from "moment";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

function Calendar() {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const [dateState, setDateState] = useState(today);
  const [dateEntries, setDateEntries] = useState([]);
  const [dateBadge, setDateBadge] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const startTime = moment(dateState).format();
      const endTime = moment(dateState).add(1, "days").format();

      try {
        const res = await axiosClient.get("/entry/date", {
          params: { start: startTime, end: endTime },
        });
        setDateEntries(res.data.dateEntry.rows);
      } catch (err) {
        console.log(err);
      }
    }

    fetchEntries();
  }, [dateState]);

  const fetchBadgeForDate = async (date) => {
    const startTime = moment(date).format();
    const endTime = moment(date).add(1, "days").format();

    try {
      const res = await axiosClient.get("/collection/badge/date", {
        params: { start: startTime, end: endTime },
      });
      if (res.data.dateBadge.rows.length != 0) {
        const badgeName = res.data.dateBadge.rows[0].name || "";
        setDateBadge((prevBadges) => ({
          ...prevBadges,
          [moment(date).format("YYYY-MM-DD")]: badgeName,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeDate = (e) => {
    setDateState(e);
  };

  const show = ({ date, view }) => {
    if (view === "month") {
      const dateKey = moment(date).format("YYYY-MM-DD");
      if (!dateBadge[dateKey]) {
        fetchBadgeForDate(date);
      }
      if (dateBadge[dateKey] != null) {
        return (
          <div className="flex justify-center">
            <img
              src={`../../public/images/badges/${dateBadge[dateKey]}.png`}
              className="object-contain pt-1 w-12 h-12"
            />
          </div>
        );
      } else {
        return (
          <i className="fa-solid fa-circle-xmark text-slate-200 block mt-4"></i>
        );
      }
    }
  };

  return (
    <>
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
                <p className="text-xs">
                  {moment(n.created_at).format("h:mm a")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Calendar;
