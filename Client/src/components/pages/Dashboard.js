import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import GenericTable from "../genericComponents/GenericTable";
import Page from "./Page";
import CounterDetails from "../dataViews/CounterDetails";
import ChartDetails from "../dataViews/ChartDetails";
import { ChartDetailsConfig } from "../config/charts";
import { CounterDetailsConfig } from "../config/counters";
import ActionAreaCard from "../dataViews/ActionAreaCard";
import ImageGallery from "../utils/ImageGallery";
const Dashboard = ({ data }) => {
  const isImportentNeo = (row) => {
    return row["Potentially Hazardous"] === "Yes";
  };
  const hasHighUrgency = (row) => {
    return row["Urgency"] >= "4";
  };
  const hasHighUrgencyInText = (row) => {
    return parseInt(row.text.split("Urgency: ")[1]) >= "4";
  };

  const isImportantStar = (row) => {
    return row ? row["Urgency"] > 3 : false;
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

  const defaultBrightSort = (array) => {
    array.sort((a, b) => {
      return a["Harvard Reference Number"] - b["Harvard Reference Number"];
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
        {data["astroEventTableObject"].body.length > 0 && (
          <Grid item xs={12} sm={12} md={3}>
            <ActionAreaCard
              data={data["Last Event"]}
              isImportant={hasHighUrgencyInText}
            />
          </Grid>
        )}
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
        {data["Sun Image Links"].length > 0 && (
          <Grid item xs={12} sm={4} md={6}>
            <ImageGallery images={data["Sun Image Links"]} />
          </Grid>
        )}
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
          <GenericTable
            tableObject={data["brightStars"]}
            isImportant={isImportantStar}
            title={"Bright Stars Catalog Table"}
            defaultSortFunction={defaultBrightSort}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Dashboard;
