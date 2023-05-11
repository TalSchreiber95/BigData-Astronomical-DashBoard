import { Box, Card, CardHeader } from "@mui/material";
import Chart from "react-apexcharts";

export default function ChartDetails({ data, title, type }) {
  return (
    <Card>
      <CardHeader title={title} />
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          options={data.options}
          type={type}
          series={data.series}
          width='100%'
          height={"200%"}
        />
      </Box>
    </Card>
  );
}
