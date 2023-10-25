import React from "react";
import MainBanner from "./MainBanner";
import Footer from "../../components/layout/footer/Footer";
import Hero from "./Hero";
import EmailSender from "./EmailSender";
import Details from "./Details";
import Features from "./Features";

const Landing = () => {
  return (
    <>
      <Hero />
      <MainBanner />
      <Features/>
      <Details/>
      <EmailSender/>
      <Footer />
    </>
  );
};

export default Landing;
