import React, { useState } from "react";
import Page from "./Page";
import EventPicker from "../utils/EventPicker";
import EventsTable from "../dataViews/EventsTable";
import dayjs from "dayjs";

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

const Search = ({ events, searchEvents, loaded }) => {
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedTelescope, setSelectedTelescope] = useState("");
  const [starSearch, setStarSearch] = useState("");
  const [fromDate, setFromDate] = useState(yesterday);
  const [toDate, setToDate] = useState(today);

  const onSearch = () => {
    searchEvents({
      eventType: selectedEventType !== "" ? selectedEventType : undefined,
      telescope: selectedTelescope !== "" ? selectedTelescope : undefined,
      starSearch: starSearch !== "" ? starSearch : undefined,
      fromDate: fromDate !== null ? fromDate.format("YYYY-MM-DD") : undefined,
      toDate: toDate !== null ? toDate.format("YYYY-MM-DD") : undefined,
    });
  };

  return (
    <Page title="Search">
      <EventPicker
        selectedEventType={selectedEventType}
        setSelectedEventType={setSelectedEventType}
        selectedTelescope={selectedTelescope}
        setSelectedTelescope={setSelectedTelescope}
        starSearch={starSearch}
        setStarSearch={setStarSearch}
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
