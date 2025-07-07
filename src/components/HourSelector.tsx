import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box
} from '@mui/material';

type Props ={
    hour:string | null;
    availableHours:null | string[]
    changeHour: (hour:string | null)=>void
}
const HourSelector:React.FC<Props>= ({hour,availableHours,changeHour})=>{

   // availableHours = availableHours?availableHours.map((hour)=>hour.split(".")[0]) : null


  return (
    <Box width={'40%'}>
    <FormControl fullWidth>
      <Select
        value={hour}
        label="Horario disponible"
        onChange={(e)=>changeHour(e.target.value)}
      >
        {availableHours?.map((hora) => (
          <MenuItem key={hora} value={hora}>
            {hora}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  );
}

export default HourSelector