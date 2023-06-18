import { Typography, Button, Card } from "@mui/material";
import DateSelector from "./DateSelector";

export default function DatesRangePicker({
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
