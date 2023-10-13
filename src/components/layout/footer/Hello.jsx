import React from "react";
import { Typography } from "@mui/material";

const Hello = () => {
  return (
    <>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Hello!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        We are the creative minds behind Hype Hub, a mini social media platform born from our passion for coding and streetwear. As aspiring
        full-stack developers, we embarked on this journey to create a digital space where people can connect, share, and thrive.
      </Typography>
    </>
  );
};

export default Hello;
