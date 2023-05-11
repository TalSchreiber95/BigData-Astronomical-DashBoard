import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Icon } from "@iconify/react";

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  display: "flex",
  position: "relative",
  margin: 3,
  textTransform: "capitalize",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(8),
  color: "grey",
}));

const NavItem = ({ item }) => {
  const location = useLocation();

  return (
    <ListItemStyle
      component={NavLink}
      key={item.name}
      to={item.path}
      sx={[
        location.pathname === item.path && {
          content: "''",
          backgroundColor: "#353839",
          color: "white",
          borderRadius: 1,
          boxShadow: 1,
          "&:hover": {
            backgroundColor: "#353839",
          },
        },
        location.pathname !== item.path && {
          "&::after": {
            content: "''",
            position: "absolute",
            width: "0px",
            height: "5px",
            left: "50%",
            bottom: 0,
            backgroundColor: "#353839",
            transition: "all ease-in-out .2s",
          },
          "&:hover::after": {
            width: "90%",
            left: "4%",
          },
        },
      ]}>
      <ListItemIcon sx={[location.pathname == item.path && { color: "white" }]}>
        <Icon icon={item.icon} height={18} width={18} />
      </ListItemIcon>
      <ListItemText
        primary={item.name}
        primaryTypographyProps={{ fontSize: 13 }}
      />
    </ListItemStyle>
  );
};

export default NavItem;
