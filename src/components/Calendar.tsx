import React from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

type CalendarProps = {
  date: Dayjs | null;
  changeDate: (nuevaFecha: Dayjs | null ) => void;
  availableDates: string[];
};

const Calendar: React.FC<CalendarProps> = ({
  date,
  changeDate,
  availableDates,
}) => {
  return (
    <Box width={"40%"}>
      <DatePicker
        value={date}
        onChange={changeDate}
        shouldDisableDate={(date) => {
          const dateStr = dayjs(date).format("YYYY-MM-DD");
          return !availableDates.includes(dateStr);
        }}
        closeOnSelect
      />
    </Box>
  );
};

export default Calendar;