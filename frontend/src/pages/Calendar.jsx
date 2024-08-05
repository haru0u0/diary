import useAuth from "../hooks/useAuth";
import ReactCalendar from "react-calendar";
import { useState } from "react";
import { isSameDay } from "date-fns";
import "../calendar.css";

function Calendar() {
  useAuth();

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
    <div>
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
