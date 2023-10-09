import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import LogoIcon from "../assets/logo-icon.png";

export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar position="sticky" color="primary" sx={{width: "100dvw", paddingLeft: "20dvw",paddingRight: "20dvw"}}>
        <Toolbar>
          <img src={LogoIcon} />
          <Typography variant="h3" component="div" fontFamily="Montserrat Alternates" sx={{ flexGrow: 1 }}>
            HypeHub
          </Typography>
          <Stack spacing={3} direction="row">
            <Button size="large" color="greySecondary" variant="contained" sx={{ color: "black" }}>
              Sign up
            </Button>
            <Button size="large" color="secondary" variant="contained" sx={{ color: "black" }}>
              Sign in
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
