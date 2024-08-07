import ReactCalendar from "react-calendar";
import { useState } from "react";
import { isSameDay } from "date-fns";
import "../calendar.css";
import useAuthFalseRedirect from "../hooks/useAuthFalseRedirect";

function Calendar() {
  useAuthFalseRedirect({
    falsePath: "/",
  });

  const [value, onChange] = useState();

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
    <div className="flex justify-center">
      <ReactCalendar
        onChange={onChange}
        value={value}
        tileContent={show}
        locale="en-GB"
      />
    </div>
  );
}

export default Calendar;
