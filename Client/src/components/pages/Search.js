import React, { useState } from "react";
import Page from "./Page";
import EventPicker from "../utils/EventPicker";
import EventsTable from "../dataViews/EventsTable";
import dayjs from "dayjs";

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

const Search = ({ events, searchEvents, loaded }) => {
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [selectedTelescopes, setSelectedTelescopes] = useState([]);
  const [selectedStars, setSelectedStars] = useState([]);
  const [fromDate, setFromDate] = useState(yesterday);
  const [toDate, setToDate] = useState(today);

  const onSearch = () => {
    searchEvents({
      selectedEventTypes,
      selectedTelescopes,
      selectedStars,
      fromDate: fromDate.format("YYYY-MM-DD"),
      toDate: toDate.format("YYYY-MM-DD"),
    });
  };

  return (
    <Page title="Search">
      <EventPicker
        setSelectedEventTypes={setSelectedEventTypes}
        setSelectedTelescopes={setSelectedTelescopes}
        setSelectedStars={setSelectedStars}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        onSearch={onSearch}
      />
      <EventsTable data={events} loaded={loaded} />
    </Page>
  );
};

export default Search;
