import React, { useState } from "react";
import Page from "./Page";
import BranchDatePicker from "../utils/BranchDatePicker";
import OrdersTable from "../dataViews/OrdersTable";
import dayjs from "dayjs";

const Search = ({ orders, searchOrders, loaded }) => {
  const [currentBranch, setCurrentBranch] = useState("");
  const [date, setDate] = useState(() => dayjs("2023-03-08T00:00"));

  const onSearch = () => {
    searchOrders({ branch: currentBranch, date: date.format("YYYY-MM-DD") });
  };

  const showAllOrders = () => {
    searchOrders();
  };

  return (
    <Page title='Search'>
      <BranchDatePicker
        currentBranch={currentBranch}
        setCurrentBranch={setCurrentBranch}
        date={date}
        setDate={setDate}
        onSearch={onSearch}
        showAllOrders={showAllOrders}
      />
      <OrdersTable data={orders} loaded={loaded} />
    </Page>
  );
};

export default Search;
