import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
  Card,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DateSelector from "./DateSelector";
import eventTypes from "../config/eventTypes";
import telescopes from "../config/telescopesList";
import stars from "../config/brightStarNames";
import CheckboxesTags from "./CheckboxesTags.js";

export default function EventPicker({
  setSelectedEventTypes,
  setSelectedTelescopes,
  setSelectedStars,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onSearch,
}) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        m: 2,
        p: 1,
      }}
    >
      <Typography>from</Typography>
      <DateSelector date={fromDate} setDate={setFromDate} />
      <Typography>to</Typography>
      <DateSelector date={toDate} setDate={setToDate} />
      <FormControl size="small" sx={{ m: 2, width: "25%" }}>
        <CheckboxesTags
          options={eventTypes}
          label={"Event types"}
          setSelectedOptions={setSelectedEventTypes}
        />
      </FormControl>
      <FormControl size="small" sx={{ m: 2, width: "25%" }}>
        <CheckboxesTags
          options={telescopes}
          label={"Telescopes"}
          setSelectedOptions={setSelectedTelescopes}
        />
      </FormControl>
      <FormControl size="small" sx={{ m: 2, width: "25%" }}>
        <CheckboxesTags
          options={stars}
          label={"Stars"}
          setSelectedOptions={setSelectedStars}
        />
      </FormControl>
      <Tooltip title="Search">
        <IconButton color="info" onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Card>
  );
}
