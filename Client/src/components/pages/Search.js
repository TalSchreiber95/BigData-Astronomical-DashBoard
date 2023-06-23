import React, { useState } from "react";
import Page from "./Page";
import EventDatePicker from "../utils/EventDatePicker";
import EventsTable from "../dataViews/EventsTable";
import dayjs from "dayjs";

const Search = ({ events, searchEvents, loaded }) => {
  const [currentEventType, setCurrentEventType] = useState("");
  const [fromDate, setFromDate] = useState(() => dayjs("2023-02-22T00:00"));
  const [toDate, setToDate] = useState(() => dayjs("2023-02-22T00:00"));

  const onSearch = () => {
    searchEvents({
      eventType: currentEventType,
      fromDate: fromDate.format("YYYY-MM-DD"),
      toDate: toDate.format("YYYY-MM-DD"),
    });
  };

  const showAllEvents = () => {
    searchEvents();
  };

  return (
    <Page title="Search">
      <EventDatePicker
        currentEventType={currentEventType}
        setCurrentEventType={setCurrentEventType}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        onSearch={onSearch}
        showAllEvents={showAllEvents}
      />
      <EventsTable data={events} loaded={loaded} />
    </Page>
  );
};

export default Search;
