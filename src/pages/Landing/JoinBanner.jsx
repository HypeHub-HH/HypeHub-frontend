import { Box, Container, Typography, buttonClasses } from "@mui/material";
import React from "react";
import JoinImage from "../../assets/image-join.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import CustomButton from "../../components/ui/CustomButton";


const JoinBanner = () => {
  const JoinText = styled(Typography)(({ theme }) => ({
    fontFamily: "robot",
    borderRadius: "2rem",
    padding: "10%",
    backgroundColor: "#E6ECF3",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9rem",
    },
  }));

  return (
    <Box sx={{backgroundColor: "greySecondary.main"}}>
    <Container maxWidth={"xl"}>
      <Grid container spacing={2} display={"flex"} justifycontent={"center"} padding={"1dvw"}>
        <Grid md={6} display={"flex"} justifyContent={"center"}>
          <Box component="img" src={JoinImage} alt="Join community image." borderRadius={"1rem"} sx={{ maxWidth: "80%", hight: "auto" }} />
        </Grid>
        <Grid md={6} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignSelf={"center"}>
          <JoinText variant="h5" component="div" align="justify">
            Dive into a world where fashion is more than just clothing, it's an expression of individuality, creativity, and passion. Here, we've
            created a haven for fashion aficionados to share their favorite fashion items, clothes, and outfits with a community that truly
            understands and appreciates the art of dressing.
          </JoinText>
          <Box display={"flex"} justifyContent={"center"} marginTop={"5%"}>
            <CustomButton
              backgroundColor="#0EA5E9"
              color="secondary"
              buttonText="Join the Community"
              breakpointWidth="100dvw"
              breakpointHeight="5dvh"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default JoinBanner;
