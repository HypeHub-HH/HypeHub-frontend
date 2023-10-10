import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import LogoIcon from "../assets/logo-icon.png";
import styled from "@emotion/styled";
import CustomButton from "./CustomButton";
import Divider from "@mui/material";

export default function Navbar() {

  const LogoName = styled(Typography)(({ theme }) => ({
    fontFamily: "Montserrat Alternates",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  }));

  const Test = styled(Box)(({ theme }) => ({
    fontFamily: "Montserrat Alternates",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));


  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Test component="img" src={LogoIcon} alt="Icon logo image." borderRadius={"1rem"} sx={{ maxWidth: "80%", hight: "auto" }} />
        <LogoName variant="h3" component="div" sx={{ flexGrow: 1 }} >
            HypeHub
          </LogoName>
        <Stack spacing={3} direction="row">
          <CustomButton backgroundColor="#CBD5E1" color="black" buttonText="SIGN UP" breakpointWidth="3dvw" breakpointHeight="3dvh"/>
          <CustomButton backgroundColor="#0EA5E9" color="black" buttonText="SIGN IN" breakpointWidth="3dvw" breakpointHeight="3dvh"/>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
