import React from "react";
import { Box, Typography, Container, Grid, Avatar, Card } from "@mui/material";
import Page from "./Page";
import { developers } from "../config/developers";
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <Page title='Site Developers'>
      <Grid container spacing={4} sx={{ mt: 5 }}>
        {developers.map((dev) => {
          return (
            <Grid item xs={12} sm={4} md={3}>
              <motion.div
                style={{ backgroundColor: "#f0f8ff", color: "#000000" }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#353839",
                  color: "#f5f5f5",
                }}
                whileTap={{ scale: 1.05 }}>
                <Box sx={{ boxShadow: 1, borderRadius: 1 }}>
                  <Typography align='center' variant='h5' sx={{ p: 2 }}>
                    {dev.name}
                  </Typography>
                  <Typography
                    align='center'
                    variant='h6'
                    sx={{ p: 1, height: 80 }}>
                    {dev.role}
                  </Typography>
                  <Typography align='center' variant='h6' sx={{ p: 1 }}>
                    {dev.mail}
                  </Typography>

                  <Box align='center' sx={{ p: 3 }}>
                    <Avatar sx={{ width: 120, height: 120 }} src={dev.image} />
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      flexDirection: "column",
                      display: "flex",
                      pb: 3,
                    }}>
                    <a
                      style={{ color: "inherit" }}
                      target='_blank'
                      rel='noopener noreferrer'
                      href={dev.linkedin}>
                      Linked In
                    </a>
                    <a
                      style={{ color: "inherit" }}
                      target='_blank'
                      rel='noopener noreferrer'
                      href={dev.github}>
                      Git Hub
                    </a>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Page>
  );
};

export default Profile;
