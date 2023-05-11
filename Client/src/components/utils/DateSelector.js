import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateSelector({ date, setDate }) {
  //   const [value, setValue] = React.useState(() => dayjs("2022-02-01T00:00"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture
        label='Date'
        openTo='year'
        views={["year", "month", "day"]}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => (
          <TextField value={date} size='small' sx={{ m: 2 }} {...params} />
        )}
      />
    </LocalizationProvider>
  );
}
