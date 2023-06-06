import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import "./card.css"; // Import the external CSS file

export default function ActionAreaCard({ data, isImportant = () => false }) {
  return (
    <Card sx={{ maxWidth: 545 }} className={isImportant(data) ? "flashing-card" : ""}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data?.img}
          alt="new event"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.title}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {data?.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
