import React from "react";
import { Grid, Typography } from "@mui/material";
import GenericTable from "../genericComponents/GenericTable";
import Page from "./Page";
import CounterDetails from "../dataViews/CounterDetails";
import ChartDetails from "../dataViews/ChartDetails";
import { ChartDetailsConfig } from "../config/charts";
import { CounterDetailsConfig } from "../config/counters";
const Dashboard = ({ data }) => {
  const isImportentNeo = (row) => {
    return row["Potentially Hazardous"] === "Yes";
  };
  const hasHighUrgency = (row) => {
    return row["Urgency"] >= "4";
  };

  const defaultNeoSort = (array) => {
    array.sort((a, b) => {
      const dateA = new Date(
        `${a["Close Approach Date"]} ${a["Close Approach Time"]}`
      );
      const dateB = new Date(
        `${b["Close Approach Date"]} ${b["Close Approach Time"]}`
      );
      return dateB - dateA;
    });
    return array;
  };
  const defaultAstroSort = (array) => {
    array.sort((a, b) => {
      const dateA = new Date(`${a["Date"]} ${a["Time"]}`);
      const dateB = new Date(`${b["Date"]} ${b["Time"]}`);
      return dateB - dateA;
    });
    return array;
  };
  return (
    <Page title="Dashboard">
      <Typography sx={{ py: 2 }} variant="h6">
        Today's Statistics:
      </Typography>
      <Grid container spacing={3}>
        {CounterDetailsConfig.map((item) => {
          return (
            <Grid key={item.name} item xs={12} sm={4} md={3}>
              <CounterDetails
                title={item.name}
                data={data[item.name]}
                isloaded={data[item.name] != null}
                icon={item.icon}
                color={item.color}
              />
            </Grid>
          );
        })}
        {ChartDetailsConfig.map((item) => {
          return (
            <Grid key={item.name} item xs={12} sm={4} md={6}>
              <ChartDetails
                title={item.name}
                data={data[item.name]}
                isloaded={data[item.name] != null}
                type={item.type}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
          <GenericTable
            tableObject={data["neoTableObject"]}
            isImportent={isImportentNeo}
            title={"Neo Table"}
            defaultSortFunction={defaultNeoSort}
          />
          <GenericTable
            tableObject={data["astroEventTableObject"]}
            isImportent={hasHighUrgency}
            title={"Astro Event Table"}
            defaultSortFunction={defaultAstroSort}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Dashboard;
