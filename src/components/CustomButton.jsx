import { Button, styled } from "@mui/material";
import React from "react";

const CustomButton = ({
  backgroundColor,
  color,
  buttonText,
  breakpointWidth,
  breakpointHeight
}) => {
  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    padding: "0.5rem 1.25rem",
    borderRadius: "5px",
    fontWeight: "bold",
    textTransform: "none",
    display: "block",
    "&:hover": {
      backgroundColor: color,
      color: backgroundColor,
      borderColor: backgroundColor,
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "0.6rem",
        padding: "0",
        width: breakpointWidth,
        height: breakpointHeight
    },
    // [theme.breakpoints.down("sm")]: {

    // },
  }));

  return <CustomButton>{buttonText}</CustomButton>;
};

export default CustomButton;