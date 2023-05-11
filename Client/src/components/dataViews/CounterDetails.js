import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, CircularProgress, Container } from "@mui/material";
import { Icon } from "@iconify/react";

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const CounterDetails = ({ data, isloaded, color = "#fff", title, icon }) => {
  return (
    <RootStyle
      style={{
        backgroundImage: `linear-gradient(135deg, ${alpha(
          color,
          0
        )} 0%, ${alpha(color, 0.7)} 100%)`,
      }}>
      <Typography
        variant='h6'
        sx={{ mb: 2, ml: 3, opacity: 0.72 }}
        align='left'>
        {title}
      </Typography>
      <IconWrapperStyle
        style={{
          backgroundImage: `linear-gradient(135deg, ${alpha(
            color,
            0
          )} 0%, ${alpha(color, 0.24)} 100%)`,
        }}>
        <Icon icon={icon} fontSize={40} />
      </IconWrapperStyle>
      <Container maxWidth='xl' sx={[isloaded && { overflow: "auto" }]}>
        {isloaded ? (
          <Typography variant='h5'>{data}</Typography>
        ) : (
          <CircularProgress color='inherit' />
        )}
      </Container>
    </RootStyle>
  );
};

export default CounterDetails;
