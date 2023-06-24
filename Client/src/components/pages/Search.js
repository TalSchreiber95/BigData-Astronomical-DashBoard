import React, { useState } from "react";
import Page from "./Page";
import EventPicker from "../utils/EventPicker";
import EventsTable from "../dataViews/EventsTable";

const Search = ({ events, searchEvents, loaded }) => {
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedTelescope, setSelectedTelescope] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [starSearch, setStarSearch] = useState(null);

  const onSearch = () => {
    searchEvents({
      eventType: selectedEventType !== null ? selectedEventType : undefined,
      telescope: selectedTelescope !== null ? selectedTelescope : undefined,
      fromDate: fromDate !== null ? fromDate.format("YYYY-MM-DD") : undefined,
      toDate: toDate !== null ? toDate.format("YYYY-MM-DD") : undefined,
      starSearch: starSearch !== null ? starSearch : undefined,
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
