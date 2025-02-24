import { formatISO, getDay } from "date-fns";
import Calendar from "react-calendar";
import { useOpeningStore } from "../store/useOpeningStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSystem = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { closedDays, fetchClosedDays } = useOpeningStore();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    fetchClosedDays();
  }, []);

  const handleDateClick = (date) => {
    const dayOfWeek = getDay(date);
    const selectedDate = formatISO(date);

    localStorage.setItem("selectedDate", selectedDate);
    localStorage.setItem("selectedDay", daysOfWeek[dayOfWeek]);

    navigate(`/select-time?day=${dayOfWeek}`);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Select a Date</h2>
      <Calendar
        minDate={new Date()}
        value={currentDate}
        onChange={setCurrentDate}
        tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
        view="month"
        onClickDay={handleDateClick}
      />
    </div>
  );
};

export default BookingSystem;
