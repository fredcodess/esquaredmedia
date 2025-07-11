import { formatISO, getDay } from "date-fns";
import Calendar from "react-calendar";
import { useOpeningStore } from "../store/useOpeningStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Spinner, Text } from "@chakra-ui/react";

const BookingSystem = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { closedDays, fetchClosedDays, loading, error } = useOpeningStore();

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
  }, [fetchClosedDays]);

  const handleDateClick = (date) => {
    const dayOfWeek = getDay(date);
    const selectedDate = formatISO(date, { representation: "date" });

    localStorage.setItem("selectedDate", selectedDate);
    localStorage.setItem("selectedDay", daysOfWeek[dayOfWeek]);

    navigate(`/select-time?day=${dayOfWeek}`);
  };

  useEffect(() => {
    console.log("Current closedDays in BookingSystem:", closedDays);
  }, [closedDays]);

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
        {loading ? (
          <Spinner size="lg" />
        ) : error ? (
          <Text color="red.500">Error loading closed days: {error}</Text>
        ) : (
          <Calendar
            minDate={new Date()}
            value={currentDate}
            onChange={setCurrentDate}
            tileDisabled={({ date }) => {
              const formatted = formatISO(date, { representation: "date" });
              const isDisabled = closedDays.includes(formatted);
              console.log(`Checking date ${formatted}: ${isDisabled}`);
              return isDisabled;
            }}
            view="month"
            onClickDay={handleDateClick}
          />
        )}
      </div>
    </Box>
  );
};

export default BookingSystem;
