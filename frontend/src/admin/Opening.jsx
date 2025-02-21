import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import TimeSelector from "@components/TimeSelector";
import { Switch } from "@headlessui/react";
import { formatISO } from "date-fns";
import { Calendar } from "react-calendar";
import toast, { Toaster } from "react-hot-toast";
import { now } from "src/constants/config";
import { capitalize, classNames, weekdayIndexToName } from "src/utils/helper";

const Opening = () => {
  const [enabled, setEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [openingHrs, setOpeningHrs] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      const response = await fetch("/api/days");
      const data = await response.json();
      setDays(data);

      setOpeningHrs(
        data.map((day) => ({
          name: weekdayIndexToName(day.dayOfWeek),
          openTime: day.openTime,
          closeTime: day.closeTime,
        }))
      );
    };

    fetchDays();
  }, []);

  const changeTime = (day, type, time) => {
    setOpeningHrs((prev) =>
      prev.map((d) =>
        d.name === weekdayIndexToName(day.dayOfWeek)
          ? { ...d, [type]: time }
          : d
      )
    );
  };

  const handleSave = async () => {
    try {
      await fetch("/api/updateOpeningHours", {
        method: "POST",
        body: JSON.stringify(openingHrs),
      });
      toast.success("Opening hours saved");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleToggleDay = async () => {
    if (!selectedDate) return;
    try {
      await fetch(`/api/toggleDay`, {
        method: "POST",
        body: JSON.stringify({ date: selectedDate }),
      });
      toast.success(dayIsClosed ? "Shop opened" : "Shop closed");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const closedDays = [];
  const dayIsClosed =
    selectedDate && closedDays.includes(formatISO(selectedDate));

  return (
    <div className="mx-auto max-w-xl">
      <Toaster />
      <div className="mt-6 flex justify-center gap-6">
        <p className={!enabled ? "font-medium" : ""}>Opening times</p>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "block h-5 w-5 transform bg-white rounded-full"
            )}
          />
        </Switch>
        <p className={enabled ? "font-medium" : ""}>Opening days</p>
      </div>

      {!enabled ? (
        <div className="my-12 flex flex-col gap-8">
          {days.map((day) => (
            <div className="grid grid-cols-3 place-items-center" key={day.id}>
              <h3 className="font-semibold">
                {capitalize(weekdayIndexToName(day.dayOfWeek))}
              </h3>
              <TimeSelector
                type="openTime"
                changeTime={(time) => changeTime(day, "openTime", time)}
                selected={
                  openingHrs.find(
                    (d) => d.name === weekdayIndexToName(day.dayOfWeek)
                  )?.openTime
                }
              />
              <TimeSelector
                type="closeTime"
                changeTime={(time) => changeTime(day, "closeTime", time)}
                selected={
                  openingHrs.find(
                    (d) => d.name === weekdayIndexToName(day.dayOfWeek)
                  )?.closeTime
                }
              />
            </div>
          ))}
          <Button onClick={handleSave} colorScheme="green">
            Save
          </Button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-6">
          <Calendar
            minDate={now}
            className="REACT-CALENDAR p-2"
            view="month"
            onClickDay={setSelectedDate}
            tileClassName={({ date }) =>
              closedDays.includes(formatISO(date)) ? "closed-day" : null
            }
          />
          <Button
            onClick={handleToggleDay}
            disabled={!selectedDate}
            colorScheme="green"
          >
            {dayIsClosed ? "Open shop this day" : "Close shop this day"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Opening;
