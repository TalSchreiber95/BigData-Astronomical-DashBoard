import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
  Card,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DateSelector from "./DateSelector";
import eventTypes from "../config/eventTypes";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function BranchDatePicker({
  currentEventType,
  setCurrentEventType,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onSearch,
  showAllEvents,
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
        <InputLabel>Event type</InputLabel>
        <Select
          value={currentEventType}
          label="Event Type"
          onChange={(event) => setCurrentEventType(event.target.value)}
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {eventTypes.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Tooltip title="Search">
        <IconButton color="info" onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Card>
  );
}
