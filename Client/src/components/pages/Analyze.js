import React, { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import Page from "./Page";
import dayjs from "dayjs";
import RelationTable from "../dataViews/RelationTable";
import DatesRangePicker from "../utils/DatesRangePicker";

const Analyze = ({ buildModel, data, loaded, setLoaded }) => {
  const [fromDate, setFromDate] = useState(() => dayjs("2023-02-22T00:00"));
  const [toDate, setToDate] = useState(() => dayjs("2023-02-22T00:00"));
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Preparing the Dataset",
    "Establishing a Connection with BigML Servers",
    "Model Built Successfully",
  ];

  const onBuildModel = async () => {
    setActiveStep(0);
    setTimeout(() => {
      setActiveStep(1);
    }, 4000);
    await buildModel({
      date: {
        $gte: fromDate.format("YYYY-MM-DD"),
        $lte: toDate.format("YYYY-MM-DD"),
      },
    });
    setActiveStep(2);
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  };
  return (
    <Page title='Analyze'>
      <DatesRangePicker
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        onBuildModel={onBuildModel}
        loaded={loaded}
      />
      {!loaded && (
        <Stepper
          sx={{ p: 5, color: "green" }}
          alternativeLabel
          activeStep={activeStep}>
          {steps.map((label) => (
            <Step
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "#009900",
                },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#009900",
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.black",
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "white",
                },
              }}
              key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      <RelationTable data={data} loaded={loaded} />
    </Page>
  );
};

export default Analyze;
