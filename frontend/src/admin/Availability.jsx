import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Button, createTheme, ThemeProvider } from "@mui/material";
import useDisabledDatesStore from "../store/useDisabledDatesStore";

const theme = createTheme();
const Availability = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { addDisabledDate, fetchDisabledDates } = useDisabledDatesStore();

  const handleAddDate = async () => {
    if (!selectedDate) return alert("Please select a date");

    await addDisabledDate(selectedDate);
    setSelectedDate(null);
    fetchDisabledDates(); // Refresh the list of disabled dates
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Disable a date"
          value={selectedDate}
          onChange={setSelectedDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          variant="contained"
          onClick={handleAddDate}
          style={{ marginTop: 10 }}
        >
          Add Disabled Date
        </Button>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Availability;
