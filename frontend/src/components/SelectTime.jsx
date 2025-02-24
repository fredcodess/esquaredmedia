import { useEffect, useState } from "react";
import { useOpeningStore } from "../store/useOpeningStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

const SelectTime = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedDayName = localStorage.getItem("selectedDay");

  const { openingHours, fetchOpeningHours } = useOpeningStore();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const selectedDay = daysOfWeek.indexOf(selectedDayName); // Convert day name back to index

  useEffect(() => {
    fetchOpeningHours();
  }, []);

  useEffect(() => {
    if (openingHours.length === 0) return;

    const hoursForDay = openingHours.find(
      (entry) => entry.dayOfWeek === selectedDay
    );
    if (hoursForDay) {
      const times = generateTimeSlots(
        hoursForDay.openTime,
        hoursForDay.closeTime
      );
      setAvailableTimes(times);
    }
  }, [selectedDay, openingHours]);

  const generateTimeSlots = (openTime, closeTime) => {
    if (!openTime || !closeTime) return [];

    const startHour = parseInt(openTime.split(":")[0], 10);
    const endHour = parseInt(closeTime.split(":")[0], 10);
    let times = [];

    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
    }

    return times;
  };

  useEffect(() => {
    if (selectedStartTime && selectedEndTime) {
      const selectedData = {
        selectedDate: localStorage.getItem("selectedDate"),
        selectedDay: selectedDayName,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      };

      // Save selected time in localStorage
      localStorage.setItem("selectedTime", JSON.stringify(selectedData));

      navigate("/services"); // Redirect after selecting time
    }
  }, [selectedStartTime, selectedEndTime, selectedDayName, navigate]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      bg="gray.50"
      px={6}
    >
      <Heading mb={4} fontSize="2xl" color="gray.700">
        Select Time for{" "}
        <Text as="span" fontWeight="bold" color="blue.500">
          {selectedDayName}
        </Text>
      </Heading>

      {availableTimes.length > 0 ? (
        <Flex wrap="wrap" justify="center" gap={4} maxW="400px">
          {availableTimes.map((time, i) => (
            <Button
              key={`time-${i}`}
              size="lg"
              colorScheme={
                selectedStartTime === time || selectedEndTime === time
                  ? "blue"
                  : "gray"
              }
              variant={
                selectedStartTime === time || selectedEndTime === time
                  ? "solid"
                  : "outline"
              }
              _hover={{ bg: "blue.100" }}
              onClick={() => {
                if (!selectedStartTime) {
                  setSelectedStartTime(time);
                } else {
                  setSelectedEndTime(time);
                }
              }}
            >
              {time}
            </Button>
          ))}
        </Flex>
      ) : (
        <Text color="gray.600">No available times for this day.</Text>
      )}

      {selectedStartTime && selectedEndTime && (
        <VStack mt={6} spacing={2} bg="white" p={4} rounded="md" shadow="sm">
          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Selected Time:
          </Text>
          <Text fontSize="xl" color="blue.600">
            {selectedStartTime} - {selectedEndTime}
          </Text>
        </VStack>
      )}
    </Flex>
  );
};

export default SelectTime;
