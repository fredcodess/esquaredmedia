import { useEffect, useState } from "react";
import { useOpeningStore } from "../store/useOpeningStore";
import { formatISO } from "date-fns";
import Calendar from "react-calendar";
import { toast } from "react-hot-toast";
import {
  Box,
  Button,
  Switch,
  Text,
  VStack,
  HStack,
  FormLabel,
  Tag,
  Select,
  FormControl,
} from "@chakra-ui/react";
import "../styles/Calendar.css";

const Availability = () => {
  const {
    openingHours,
    closedDays,
    fetchOpeningHours,
    fetchClosedDays,
    changeOpeningHours,
    closeDay,
    openDay,
    loading,
  } = useOpeningStore();
  // Initialize selectedDays with fetched openingHours
  const [selectedDays, setSelectedDays] = useState(openingHours);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [editableHours, setEditableHours] = useState([]);

  useEffect(() => {
    fetchOpeningHours();
    fetchClosedDays();
  }, [fetchOpeningHours]);

  useEffect(() => {
    if (openingHours.length > 0 && selectedDays.length === 0) {
      setSelectedDays(openingHours);
    }
  }, [openingHours]);

  useEffect(() => {
    // Always create 7 days, merging with fetched data
    const mergedHours = daysOfWeek.map((day) => {
      const existingDay = openingHours.find(
        (oh) => oh.dayOfWeek === day.dayOfWeek
      );
      return (
        existingDay || {
          dayOfWeek: day.dayOfWeek,
          name: day.name, // Include name
          openTime: "08:00",
          closeTime: "13:00",
        }
      );
    });
    setEditableHours(mergedHours);
  }, [openingHours]);

  const handleChange = (index, field, value) => {
    const updatedHours = [...editableHours];
    updatedHours[index] = {
      ...updatedHours[index],
      [field]: value,
    };
    setEditableHours(updatedHours);
  };

  const handleSave = () => {
    console.log("Sending data:", editableHours); // Debugging the data
    changeOpeningHours(editableHours); // Send the modified opening hours
  };

  const daysOfWeek = [
    { name: "Sunday", dayOfWeek: 0 },
    { name: "Monday", dayOfWeek: 1 },
    { name: "Tuesday", dayOfWeek: 2 },
    { name: "Wednesday", dayOfWeek: 3 },
    { name: "Thursday", dayOfWeek: 4 },
    { name: "Friday", dayOfWeek: 5 },
    { name: "Saturday", dayOfWeek: 6 },
  ];

  const handleCalendarClick = async (date) => {
    const isoDate = formatISO(date, { representation: "date" });
    if (closedDays.includes(isoDate)) {
      await openDay(isoDate);
    } else {
      await closeDay(isoDate);
    }
  };

  return (
    <Box p={6}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          {showCalendar ? "Calendar View" : "Hours Configuration"}
        </h1>
        <Switch
          isChecked={showCalendar}
          onChange={() => setShowCalendar((prev) => !prev)}
        />
      </Box>
      <Box
        maxW="6xl"
        mx="auto"
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap={8}
      >
        {/* Calendar and Closed Dates Section */}
        <HStack mb={6}>
          {showCalendar && (
            <Box display="flex" justifyContent="space-between" gap={8}>
              <Box bg="white" p={6} rounded="lg" shadow="md" flex="1">
                <Text fontSize="xl" fontWeight="semibold" mb={4}>
                  Closed Days Calendar
                </Text>
                <Calendar
                  value={currentDate}
                  onChange={setCurrentDate}
                  onClickDay={handleCalendarClick}
                  minDate={new Date()} // Prevent selecting past dates
                  tileClassName={({ date }) =>
                    closedDays.includes(
                      formatISO(date, { representation: "date" })
                    )
                      ? "line-through bg-red-50 text-red-500"
                      : ""
                  }
                  tileDisabled={({ date }) =>
                    closedDays.includes(
                      formatISO(date, { representation: "date" })
                    )
                  }
                  className="border rounded-lg p-2"
                />
              </Box>

              {/* Closed Days List */}
              <Box bg="white" p={6} rounded="lg" shadow="md" flex="1">
                <Text fontSize="xl" fontWeight="semibold" mb={4}>
                  Closed Dates
                </Text>
                <VStack spacing={4}>
                  {closedDays.map((date) => (
                    <HStack
                      key={date}
                      justify="space-between"
                      bg="gray.50"
                      p={3}
                      rounded="md"
                    >
                      <Text>{new Date(date).toLocaleDateString()}</Text>
                      <Button
                        onClick={() => openDay(date)}
                        color="red.500"
                        _hover={{ color: "red.700" }}
                        variant="link"
                      >
                        Remove
                      </Button>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </Box>
          )}
        </HStack>

        {/* Day Configuration Section */}
        {!showCalendar && (
          <Box>
            <VStack spacing={4} align="stretch">
              {daysOfWeek.map((day, index) => {
                const openingTime = editableHours[index]?.openTime || "08:00";
                const closingTime = editableHours[index]?.closeTime || "13:00";
                return (
                  <Box
                    key={index} // Use index as key to ensure uniqueness
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <span style={{ fontWeight: "600", width: "6rem" }}>
                        {day.name}
                      </span>{" "}
                      {/* Render `day.name` */}
                      <FormControl width="auto">
                        <FormLabel
                          htmlFor={`open-time-${index}`}
                          display="none"
                        >
                          Open Time
                        </FormLabel>
                        <Select
                          id={`open-time-${index}`}
                          value={openingTime}
                          onChange={(e) =>
                            handleChange(index, "openTime", e.target.value)
                          }
                          size="sm"
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option
                              key={i}
                              value={`${i.toString().padStart(2, "0")}:00`}
                            >
                              {`${i.toString().padStart(2, "0")}:00`}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl width="auto">
                        <FormLabel
                          htmlFor={`close-time-${index}`}
                          display="none"
                        >
                          Close Time
                        </FormLabel>
                        <Select
                          id={`close-time-${index}`}
                          value={closingTime}
                          onChange={(e) =>
                            handleChange(index, "closeTime", e.target.value)
                          }
                          size="sm"
                        >
                          {Array.from({ length: 24 }, (_, i) => (
                            <option
                              key={i}
                              value={`${i.toString().padStart(2, "0")}:00`}
                            >
                              {`${i.toString().padStart(2, "0")}:00`}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                );
              })}
            </VStack>
            <Button
              onClick={handleSave}
              mt={4}
              isLoading={loading}
              loadingText="Saving..."
              isDisabled={loading}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Availability;
