import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Page = forwardRef(({ children, title = "", ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Container maxWidth='xl'>
      <Typography sx={{ pb: 2 }} variant='h4'>
        {title}
      </Typography>
      {children}
    </Container>
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
