import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
} from "@mui/material";
import axios from "axios";

const SimulatorControl = ({ open, setOpen }) => {
  const [rates, setRates] = useState({ eventsRate: 5 });
  const [status, setStatus] = useState("TBD");

  useEffect(() => {
    getSimulatorStatus();
  }, []);

  const getSimulatorStatus = async () => {
    await axios("http://localhost:4002/api/getSimulatorStatus")
      .then((res) => {
        console.log(res.data);
        setStatus(res.data);
      })
      .catch((err) => console.error(err));
  };

  const startSimulator = async () => {
    await axios("http://localhost:4002/api/startSimulator", {
      params: rates,
    })
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        setStatus(res.data);
      })
      .catch((err) => console.error(err));
  };

  const stopSimulator = async () => {
    await axios("http://localhost:4002/api/stopSimulator")
      .then((res) => {
        console.log(res.data);
        setStatus(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setRates((prevState) => {
      return {
        eventsRate:
          e.target.id == "events" ? e.target.value : prevState.eventsRate,
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle variant="h5">Simulator Controller</DialogTitle>
      <DialogContent>
        <DialogContentText variant="subtitle">
          Control the Simulator - Start Stop and get Live Status.
        </DialogContentText>
        <DialogContentText variant="subtitle">
          Before Starting set the Simulator Publish Rates of Astro Events (in
          seconds).
        </DialogContentText>
        <br/>
        Events Rate:
        <Input
          id="events"
          type="number"
          placeholder="events rate"
          sx={{ width: "20%" }}
          value={rates.eventsRate}
          onChange={handleChange}
          slotProps={{
            input: {
              min: 1,
            },
          }}
        />
        <DialogContentText sx={{ textAlign: "center" }} variant="overline">
          Status: {status}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-around", p: 3 }}>
        <Button variant="outlined" color="error" onClick={stopSimulator}>
          Stop Simulator
        </Button>
        <Button variant="outlined" color="success" onClick={startSimulator}>
          Start Simulator
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimulatorControl;
