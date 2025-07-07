import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import HourSelector from "./HourSelector";
import Calendar from "./Calendar";
import type { DataMap } from "../types";

import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Charts from "./Charts";

type DashboardProps = {
  data: DataMap;
};
const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(Object.keys(data)[0]));
  const [dateStr, setDateStr] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const changeDate = (newDate: Dayjs | null) => {
    setDate(newDate);
  };
  useEffect(() => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setDateStr(formattedDate);
      const newHour = Object.keys(data[formattedDate])[0];
      //const hourClean = firstHour?.split(".")[0]; // 🔧 limpiamos los milisegundos
      setHour(newHour);
    }
  }, [date]);
  return (
    <Box>
      <Box>
        <Typography component="h3" variant="h6">
          Inpección de presencia canal interior
        </Typography>
      </Box>
      {/*caja para seleccionar las fechas*/}
      <Box display={"flex"} justifyContent={"space-between"}>
        <Calendar
          availableDates={Object.keys(data)}
          date={date}
          changeDate={changeDate}
        />
        <HourSelector
          hour={hour}
          availableHours={dateStr ? Object.keys(data[dateStr]) : null}
          changeHour={(hour: string | null) => setHour(hour)}
        />
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} columnGap={30}>
        <Box>
          <List>
            <ListItem>
              <ListItemText primary="CONTADORES TOTALES DE PRODUCTOS" />
            </ListItem>
            {dateStr && hour && Object.keys(data[dateStr][hour]['total']).map((key ) => {
              return (
                <ListItem key={key}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography>{key}</Typography>
                    <Typography>{data[dateStr][hour]['total'][key]}</Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box>
          <List>
            <ListItem>
              <ListItemText primary="CONTADORES PARCIALES DE PRODUCTOS" />
            </ListItem>
            {dateStr && hour && Object.keys(data[dateStr][hour]['parcial']).map((key) => {
              return (
                <ListItem key={key}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography>{key}</Typography>
                    <Typography>{data[dateStr][hour]['parcial'][key]}</Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
      {dateStr && hour && <Charts data={data[dateStr][hour]}/>}
    </Box>
  );
};

export default Dashboard;
