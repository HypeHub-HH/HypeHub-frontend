import React from "react";
import Navbar from "../../components/layout/navbar/Navbar";
import JoinBanner from "./JoinBanner";
import MainBanner from "./MainBanner"
import Footer from "../../components/layout/footer/Footer";

const Landing = () => {
  return (
    <>
      <JoinBanner/>
      <MainBanner/>
      <Footer/>
    </>
  );
};

export default Landing;
