import { Box } from "@mui/material";
import React from "react";
import Routes from "./components/Routes";
import ScrollTop from "./components/utils/ScrollTop";
const backgroundImage =
  "https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg?w=1380&t=st=1677808218~exp=1677808818~hmac=b4490c75ba4205d13b522b4446200dd26829165f7cadbda62f3390f24b486610";

function App() {
  return (
    <Box sx={{ backgroundImage: `url(${backgroundImage})`, minHeight: 895 }}>
      <ScrollTop />
      <Routes />
    </Box>
  );
}

export default App;
