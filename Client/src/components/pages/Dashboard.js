import React from "react";
import { Grid, Typography } from "@mui/material";
import GenericTable from "../genericComponents/GenericTable";
import Page from "./Page";
import CounterDetails from "../dataViews/CounterDetails";
import ChartDetails from "../dataViews/ChartDetails";
import { ChartDetailsConfig } from "../config/charts";
import { CounterDetailsConfig } from "../config/counters";
import ActionAreaCard from "../dataViews/ActionAreaCard";

const Dashboard = ({ data }) => {
  const makeText = (event) => {
    let txt = "Astroid's Id: " +event["Astroid's Id"]+"\n"
    txt += "Telescope's Name: " +event["Telescope's Name"]+"\n"
    txt += "Date: " +event["Date"]+ event["Time"]+"\n"
    txt += "Dec: " +event["Dec"]+" Ra: "+event["Ra"]+"\n"
    txt+= "Urgency: "+event["Urgency"]+"\n"
    return txt
  }
  const showMatchPic = (eventType) => {
    switch (eventType) {
      case "GRB":
        return "https://www.hayadan.org.il/images/content3/2023/01/Artists-Conception-of-a-Gamma-Ray-Burst-777x4081-1.webp";
      case "Rise Brightness Apparent":
        return "https://www.space.fm/astronomy/images/diagrams/apparent.gif";
      case "UV (Rise UV)":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/UV_Index_NYC.png/1200px-UV_Index_NYC.png";
      case "Rise Ray-X":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/PIA20061_-_Andromeda_in_High-Energy_X-rays%2C_Figure_1.jpg/500px-PIA20061_-_Andromeda_in_High-Energy_X-rays%2C_Figure_1.jpg";
      case "Comet":
        return "https://exact-sciences.m.tau.ac.il/sites/exactsci.tau.ac.il/files/styles/reaserch_main_image_580_x_330/public/shavit_580X330.jpg?itok=rE7s0Cdx";
      default:
        return "";
    }
  };
  const newAstroEvent = {
    title:
      data["astroEventTableObject"].body.length > 0
        ? data["astroEventTableObject"].body[0]["Event Type"]
        : "",
    img:
      data["astroEventTableObject"].body.length > 0
        ? showMatchPic(data["astroEventTableObject"].body[0]["Event Type"])
        : "",
    text: data["astroEventTableObject"].body.length > 0? makeText(data["astroEventTableObject"].body[0]):"",
    obj:
      data["astroEventTableObject"].body.length > 0
        ? data["astroEventTableObject"].body[0]
        : {},
  };

  const isImportentNeo = (row) => {
    return row["Potentially Hazardous"] === "Yes";
  };
  const hasHighUrgency = (row) => {
    return row["Urgency"] >= "4";
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
            <ActionAreaCard data={newAstroEvent} isImportent={true} />
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
