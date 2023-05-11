import React from "react";
import { Grid, Typography } from "@mui/material";
import Page from "./Page";
import CounterDetails from "../dataViews/CounterDetails";
import ChartDetails from "../dataViews/ChartDetails";
import { ChartDetailsConfig } from "../config/charts";
import { CounterDetailsConfig } from "../config/counters";

const Dashboard = ({ data }) => {
  return (
    <Page title='Dashboard'>
      <Typography sx={{ py: 2 }} variant='h6'>
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
      </Grid>
    </Page>
  );
};

export default Dashboard;
