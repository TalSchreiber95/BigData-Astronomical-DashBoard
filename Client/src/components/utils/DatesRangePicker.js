import { Typography, Button, Card } from "@mui/material";
import DateSelector from "./DateSelector";

export default function DatesRangePicker({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onBuildModel,
  loaded,
}) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        m: 2,
        p: 1,
      }}>
      <Typography>from</Typography>
      <DateSelector date={fromDate} setDate={setFromDate} />
      <Typography>to</Typography>
      <DateSelector date={toDate} setDate={setToDate} />
      {!loaded ? (
        <Button disabled>Bulding Model ...</Button>
      ) : (
        <Button
          sx={{ bgcolor: "#009900" }}
          color='success'
          variant='contained'
          onClick={onBuildModel}>
          Build Association Model
        </Button>
      )}
    </Card>
  );
}
