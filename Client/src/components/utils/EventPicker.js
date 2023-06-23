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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DateSelector from "./DateSelector";
import eventTypes from "../config/eventTypes";
import telescopes from "../config/telescopesList";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function EventPicker({
  selectedEventType,
  setSelectedEventType,
  selectedTelescope,
  setSelectedTelescope,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  onSearch,
}) {
  const handleClearFilter = () => {
    setSelectedEventType(null);
    setSelectedTelescope(null);
    setFromDate(null);
    setToDate(null);
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
