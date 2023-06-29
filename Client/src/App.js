import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import ScrollTop from "./components/utils/ScrollTop";
import axios from "axios";
import Loading from "./components/utils/Loading";

const backgroundImage =
  "https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg?w=1380&t=st=1677808218~exp=1677808818~hmac=b4490c75ba4205d13b522b4446200dd26829165f7cadbda62f3390f24b486610";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setIsLoadingMessage] = useState("Please wait for a few seconds...");

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setIsLoadingMessage("Please wait for a few seconds...")
      const res = await axios.get("http://localhost:4002/api/initialize");
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoadingMessage("Unfortunately, Something went wrong!")
      setIsLoading(true);
    }
  };

  return (
    <Box sx={{ backgroundImage: `url(${backgroundImage})`, minHeight: 895 }}>
      {isLoading ? (
        <Loading message={loadingMessage} />
      ) : (
        <>
          <ScrollTop />
          <Routes />
        </>
      )}
    </Box>
  );
}

export default App;
