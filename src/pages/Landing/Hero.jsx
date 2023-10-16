import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import JoinImage from "../../assets/image-join.jpg";
import CustomButton from "../../components/ui/CustomButton";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#0F172A",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box padding="3%" sx={{ backgroundColor: "greySecondary.main" }}>
      <Container>
        <CustomBox>
          <Box>
            <Typography
              variant="body2"          
              sx={{
                fontSize: "18px",
                color: "#0F172A",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to HypeHub
            </Typography>
            <Title variant="h1">Share Your Style with the World.</Title>
            <Typography variant="body2" sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}>
              Discover the latest trends, get inspired, and connect with fashion enthusiasts around the globe on HypeHub. Show off your favorite
              outfits, share styling tips, and connect with like-minded individuals who share your passion for fashion!
            </Typography>
            <CustomButton
              backgroundColor="#0EA5E9"
              color="secondary"
              buttonText="Join the Community"
              breakpointWidth="100dvw"
              breakpointHeight="5dvh"
            />
          </Box>
          <Box
            component="img"
            src={JoinImage}
            alt="Join community image."
            borderRadius={"1rem"}
            sx={{ maxWidth: "70%", hight: "auto" }}
          />
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
