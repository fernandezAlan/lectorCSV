    import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,BarChart,CartesianGrid,XAxis,YAxis,Bar
} from 'recharts';
import { Box, Typography } from '@mui/material';
import type { Alldata } from "../types";
type Props ={ 
    data:Alldata
}
const Charts:React.FC<Props> = ({data})=>{
    const pieDataParcial = Object.keys(data.parcial).map((d)=>({name:d,value:Number(data.parcial[d])}))
    const barDataTotal = Object.keys(data.total).map((d)=>({name:d,value:Number(data.parcial[d])}))
    console.log("barDataTotal",barDataTotal)


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA46BE'];
return (
    <Box display={'flex'} flexDirection={'column'} rowGap={8} alignItems={'center'} mt={10}>
  <Typography component="h2" fontSize={25}>Parcial</Typography>
  <ResponsiveContainer width="80%" height={300}>
    <PieChart>
      <Pie
        data={pieDataParcial}
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
        dataKey="value"
      >
        {pieDataParcial.map((entry, index) => (
          <Cell key={`cell-${index}-${entry.name}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
  <Typography component="h2" fontSize={25}>Total</Typography>
   <ResponsiveContainer width="100%" height={300}>
    <BarChart data={barDataTotal}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
  </Box>
);
} 

export default Charts