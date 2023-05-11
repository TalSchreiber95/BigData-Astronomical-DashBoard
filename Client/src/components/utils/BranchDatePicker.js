import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
  Card,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import DateSelector from "./DateSelector";
import Branches from "../config/branches";
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
  currentBranch,
  setCurrentBranch,
  date,
  setDate,
  onSearch,
  showAllOrders,
}) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-around",
        m: 2,
        p: 1,
      }}>
      <FormControl size='small' sx={{ m: 2, width: "25%" }}>
        <InputLabel>Branch</InputLabel>
        <Select
          value={currentBranch}
          label='Branch'
          onChange={(event) => setCurrentBranch(event.target.value)}
          MenuProps={MenuProps}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {Branches.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <DateSelector date={date} setDate={setDate} />
      <Tooltip title='Search'>
        <IconButton color='info' onClick={onSearch}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Show All Orders'>
        <IconButton color='info' onClick={showAllOrders}>
          <BorderAllIcon />
        </IconButton>
      </Tooltip>
    </Card>
  );
}
