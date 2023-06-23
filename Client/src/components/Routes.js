import React, { useEffect, useState } from "react";
import { useRoutes, Navigate } from "react-router";
import { io } from "socket.io-client";
import axios from "axios";
import Analyze from "./pages/Analyze";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import DashboardLayout from "./layouts/DashboardLayout";
import Profile from "./pages/Profile";
import { DefaultDataConfig } from "./config/defaultData";

const socket = io.connect("http://localhost:4001");

export default function Routes() {
  const [data, setData] = useState(DefaultDataConfig);
  const [events, setEvents] = useState({
    message: "Search For Events By topic!",
  });
  const [associationRules, setAssociationRules] = useState({
    message: "Click on BUILD to create associatoin model",
  });
  const [analyzeLoaded, setAnalyzeLoaded] = useState(true);
  const [searchLoaded, setSearchLoaded] = useState(true);

  useEffect(() => {
    searchEvents();
  }, []);

  useEffect(() => {
    socket.on("events_data", (res) => {
      console.log("res from server= ",res);
      setData(res);
    });
  }, [socket]);

  const searchEvents = async (query) => {
    // query && console.log(query);
    setEvents({ message: "Loading..." });
    setSearchLoaded(false);
    await axios("http://localhost:4000/api/eventsByDate", {
      params: query,
    })
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
        setSearchLoaded(true);
      })
      .catch((err) => {
        setEvents({
          message: `Something went wrong, please contact with developer teams!`,
        });
        console.error(err);
      });
  };

  const buildModel = async (query) => {
    console.log(query);
    setAssociationRules({ message: "Loading..." });
    setAnalyzeLoaded(false);
    await axios("http://localhost:4000/api/buildModel", {
      params: query,
    })
      .then((res) => {
        console.log(res.data);
        setAssociationRules(res.data);
      })
      .catch((err) => {
        setAssociationRules({
          message: "Something went wrong, please contact with developer teams!",
        });
        console.error(err);
      });
  };

  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "main",
          element: <Dashboard data={data} />,
        },
        {
          path: "search",
          element: (
            <Search
              events={events}
              searchEvents={searchEvents}
              loaded={searchLoaded}
            />
          ),
        },
        {
          path: "analyze",
          element: (
            <Analyze
              data={associationRules}
              buildModel={buildModel}
              loaded={analyzeLoaded}
              setLoaded={setAnalyzeLoaded}
            />
          ),
        },
        { path: "about", element: <About /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    {
      path: "/",
      children: [{ path: "/", element: <Navigate to="/dashboard/main" /> }],
    },
  ]);
}
