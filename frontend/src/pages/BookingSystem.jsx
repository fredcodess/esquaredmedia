import { formatISO, getDay } from "date-fns";
import Calendar from "react-calendar";
import { useOpeningStore } from "../store/useOpeningStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

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
    <Box
      p={24}
      maxW="container.lg"
      mx="auto"
      display="flex"
      justifyContent="center"
      textColor="black"
    >
      <div className="flex h-screen flex-col items-center justify-center">
        <Calendar
          minDate={new Date()}
          value={currentDate}
          onChange={setCurrentDate}
          tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
          view="month"
          onClickDay={handleDateClick}
        />
      </div>
    </Box>
  );
};

export default BookingSystem;
