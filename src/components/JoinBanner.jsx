import { Box, Button, Container, Typography, buttonClasses } from "@mui/material";
import React from "react";
import Logo from "../assets/logo-white-on-transparent-background.png";
import JoinImage from "../assets/image-join.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const JoinBanner = () => {
  return (
    <Box sx={{ backgroundColor: "greySecondary.main" }}>
      <Grid container spacing={2}>
        <Grid md={6} display={"flex"} justifyContent={"center"} marginTop={"10dvh"}>
          <Box component="img" src={JoinImage} alt="Join community image." borderRadius={"1rem"} sx={{ maxWidth: "80%", hight: "auto" }} />
        </Grid>
        <Grid md={6} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignSelf={"center"}>
          <Typography variant="h5" component="div" fontFamily="robot" align="center" padding="10%" backgroundColor="#E6ECF3" borderRadius={"2rem"} sx={{ flexGrow: 1 }}>
            Welcome to our vibrant social media platform, the ultimate destination for style enthusiasts like you! Dive into a world where fashion is
            more than just clothing; it's an expression of individuality, creativity, and passion. Here, we've created a haven for fashion aficionados
            to share their favorite fashion items, clothes, and outfits with a community that truly understands and appreciates the art of dressing.
          </Typography>
          <Box display={"flex"} justifyContent={"center"} marginTop={"5%"}>
            <Button variant="contained" color="secondary" size="large" >
              Join the Community
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JoinBanner;
