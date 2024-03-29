import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const Loading = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: `url('https://www.pixelstalk.net/wp-content/uploads/images6/Space-Wallpaper-4K-Desktop.jpg') center/cover`,
        padding: "24px",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "white",
          marginBottom: "120px",
          marginTop: "-50px",
          WebkitTextStroke: "1px black",
          WebkitTextFillColor: "white",
          fontSize: "52px", // Adjust the font size as needed
        }}
      >
        Welcome to Astronomical Dashboard
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "white",
          marginBottom: "20px",
          marginX: "400px",
          WebkitTextStroke: "0.5px black",
          WebkitTextFillColor: "white",
          fontSize: "23px", // Adjust the font size as needed
        }}
      >
        Welcome to our React-based dashboard for real-time monitoring of
        astronomical events and sun behavior analysis! Our microservices
        architecture is designed to help you gain valuable insights into the
        physical signals generated by astronomical events, allowing you to
        optimize your knowledge of the cosmos and make better predictions for
        the future.
      </Typography>
      {message === "Unfortunately, Something went wrong!" ? (
        <ErrorIcon
          sx={{
            color: "red",
            fontSize: 80,
            marginBottom: "16px",
          }}
        />
      ) : (
        <CircularProgress
          size={80}
          sx={{
            color: "#FF4081",
            marginBottom: "16px",
            backgroundSize: "cover",
            animation: "spin 2s linear infinite",
          }}
        />
      )}
      <Typography variant="body1" sx={{ color: "white" }}>
        {message}
      </Typography>
      {message === "Unfortunately, Something went wrong!" && (
        <Typography
          variant="body1"
          sx={{
            color: "white",
            marginTop: "16px",
            fontStyle: "italic",
            fontSize: "16px",
          }}
        >
          We apologize for the inconvenience. Our team is working hard to fix it
          soon.
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
