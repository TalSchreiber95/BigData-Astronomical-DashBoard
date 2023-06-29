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
import dayjs from "dayjs";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};
const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

export default function EventPicker({
  selectedEventType,
  setSelectedEventType,
  selectedTelescope,
  setSelectedTelescope,
  starSearch,
  setStarSearch,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onSearch,
}) {
  const handleClearFilter = () => {
<<<<<<< HEAD
    setSelectedEventType(null);
    setSelectedTelescope(null);
    setFromDate(null);
    setToDate(null);
=======
    setSelectedEventType("");
    setSelectedTelescope("");
    setStarSearch("");
    setFromDate(yesterday);
    setToDate(today);
>>>>>>> 86c7a66870727f0c4d3a76d1076d49c7417e0d41
  };

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
          value={selectedEventType}
          label="Event Type"
          onChange={(event) => setSelectedEventType(event.target.value)}
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
      <FormControl size="small" sx={{ m: 2, width: "25%" }}>
        <InputLabel>Telescope</InputLabel>
        <Select
          value={selectedTelescope}
          label="Telescope"
          onChange={(event) => setSelectedTelescope(event.target.value)}
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {telescopes.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        label="Star"
        variant="outlined"
        value={starSearch}
        onChange={(e) => setStarSearch(e.target.value)}
      />
      <Tooltip title="Search">
        <IconButton color="info" onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Button
        size="small"
        sx={{ marginLeft: "15px" }}
        onClick={handleClearFilter}
        variant="contained"
        color="primary"
      >
        Clear filters
      </Button>
    </Card>
  );
}
