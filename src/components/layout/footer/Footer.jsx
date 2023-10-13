import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box } from "@mui/material";
import AboutUs from "./AboutUs";
import Hello from "./Hello";
import EmailSender from "./EmailSender";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#CBD5E1",
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} display={"flex"} justifyContent={"center"} alignSelf={"center"}>
          <Grid item xs={12} sm={4}>
            <Hello />
          </Grid>
          <Grid item xs={12} sm={3}>
            <AboutUs />
          </Grid>
          <Grid item xs={8} sm={3}>
          <EmailSender/>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © HypeHub "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
