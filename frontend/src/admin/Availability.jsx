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
  Select,
  FormControl,
  useColorMode,
  IconButton,
  Divider,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import "../styles/Calendar.css";

const Availability = () => {
  const { colorMode } = useColorMode();
  const {
    openingHours,
    closedDays,
    fetchOpeningHours,
    fetchClosedDays,
    changeOpeningHours,
    closeDay,
    openDay,
    loading,
    error,
  } = useOpeningStore();
  const [selectedDays, setSelectedDays] = useState(openingHours);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [editableHours, setEditableHours] = useState([]);

  useEffect(() => {
    fetchOpeningHours();
    fetchClosedDays();
  }, [fetchOpeningHours, fetchClosedDays]); // Added fetchClosedDays to dependencies

  useEffect(() => {
    if (openingHours.length > 0 && selectedDays.length === 0) {
      setSelectedDays(openingHours);
    }
  }, [openingHours, selectedDays]);

  useEffect(() => {
    const mergedHours = daysOfWeek.map((day) => {
      const existingDay = openingHours.find(
        (oh) => oh.dayOfWeek === day.dayOfWeek
      );
      return (
        existingDay || {
          dayOfWeek: day.dayOfWeek,
          name: day.name,
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

  const handleSave = async () => {
    try {
      await changeOpeningHours(editableHours);
      toast.success("Opening hours updated successfully!");
    } catch (error) {
      toast.error("Failed to update opening hours.");
    }
  };

  const handleCalendarClick = async (date) => {
    const isoDate = formatISO(date, { representation: "date" });
    try {
      if (closedDays.includes(isoDate)) {
        await openDay(isoDate);
        toast.success(`Opened ${isoDate}`);
      } else {
        await closeDay(isoDate);
        toast.success(`Closed ${isoDate}`);
      }
    } catch (error) {
      toast.error("Failed to update date status.");
    }
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

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("gray.100", "gray.600");
  const closedDateHoverBg = useColorModeValue("gray.50", "gray.600");

  return (
    <Box p={24} maxW="7xl" mx="auto">
      <Flex justify="space-between" align="center" mb={8}>
        <Text
          fontSize="2xl"
          fontWeight="800"
          letterSpacing="tight"
          color={textColor}
        >
          Availability Manager
        </Text>
        <Switch
          size="lg"
          colorScheme="teal"
          isChecked={showCalendar}
          onChange={() => setShowCalendar((prev) => !prev)}
        />
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", lg: showCalendar ? "1fr 1fr" : "1fr" }}
        gap={8}
      >
        {showCalendar ? (
          <>
            <GridItem>
              <Box
                bg={bgColor}
                p={6}
                rounded="2xl"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Text
                  fontSize="xl"
                  fontWeight="600"
                  mb={6}
                  color={subTextColor}
                >
                  Business Calendar
                </Text>
                {loading ? (
                  <Spinner size="lg" />
                ) : error ? (
                  <Text color="red.500">Error: {error}</Text>
                ) : (
                  <Calendar
                    value={currentDate}
                    onChange={setCurrentDate}
                    onClickDay={handleCalendarClick}
                    minDate={new Date()}
                    tileClassName={({ date }) =>
                      closedDays.includes(
                        formatISO(date, { representation: "date" })
                      )
                        ? "line-through bg-red-50 text-red-500"
                        : ""
                    }
                    tileDisabled={({ date }) => {
                      const formatted = formatISO(date, {
                        representation: "date",
                      });
                      const isDisabled = closedDays.includes(formatted);
                      console.log(`Checking date ${formatted}: ${isDisabled}`);
                      return isDisabled;
                    }}
                  />
                )}
              </Box>
            </GridItem>

            <GridItem>
              <Box
                bg={bgColor}
                p={6}
                rounded="2xl"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Text
                  fontSize="xl"
                  fontWeight="600"
                  mb={6}
                  color={subTextColor}
                >
                  Closed Dates
                </Text>
                {loading ? (
                  <Spinner size="lg" />
                ) : error ? (
                  <Text color="red.500">Error: {error}</Text>
                ) : closedDays.length === 0 ? (
                  <Text color={subTextColor}>No closed dates.</Text>
                ) : (
                  <VStack spacing={3} align="stretch">
                    {closedDays.map((date) => (
                      <Flex
                        key={date}
                        justify="space-between"
                        align="center"
                        p={3}
                        _hover={{ bg: closedDateHoverBg }}
                        rounded="md"
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="500"
                          color={subTextColor}
                        >
                          {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Text>
                        <IconButton
                          aria-label="Remove closed date"
                          icon={<CloseIcon boxSize={3} />}
                          size="xs"
                          variant="ghost"
                          onClick={() => openDay(date)}
                          colorScheme="red"
                        />
                      </Flex>
                    ))}
                  </VStack>
                )}
              </Box>
            </GridItem>
          </>
        ) : (
          <GridItem>
            <Box
              bg={bgColor}
              p={6}
              rounded="2xl"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <VStack spacing={6} align="stretch">
                {daysOfWeek.map((day, index) => (
                  <Box key={index}>
                    <Flex align="center" justify="space-between" mb={4}>
                      <Text fontWeight="600" minW="120px" color={subTextColor}>
                        {day.name}
                      </Text>
                      <Flex gap={4} align="center">
                        <Select
                          value={editableHours[index]?.openTime || "08:00"}
                          onChange={(e) =>
                            handleChange(index, "openTime", e.target.value)
                          }
                          variant="filled"
                          size="sm"
                          w="120px"
                          _focus={{
                            borderColor: "transparent",
                            boxShadow: "none",
                          }}
                          _focusVisible={{
                            borderColor: "transparent",
                            boxShadow: "none",
                          }}
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
                        <Text fontSize="sm" color="gray.500">
                          to
                        </Text>
                        <Select
                          value={editableHours[index]?.closeTime || "13:00"}
                          onChange={(e) =>
                            handleChange(index, "closeTime", e.target.value)
                          }
                          variant="filled"
                          size="sm"
                          w="120px"
                          _focus={{
                            borderColor: "transparent",
                            boxShadow: "none",
                          }}
                          _focusVisible={{
                            borderColor: "transparent",
                            boxShadow: "none",
                          }}
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
                      </Flex>
                    </Flex>
                    {index < 6 && <Divider />}
                  </Box>
                ))}
                <Button
                  onClick={handleSave}
                  colorScheme="teal"
                  size="lg"
                  isLoading={loading}
                  loadingText="Saving..."
                  mt={6}
                  alignSelf="flex-end"
                >
                  Save Schedule
                </Button>
              </VStack>
            </Box>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

export default Availability;
