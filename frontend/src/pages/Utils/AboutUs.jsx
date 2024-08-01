import React from "react";
import Hero from "../../component/Hero";
import Biography from "../../component/Biography";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
//import '../Css.css'

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Hero
          title={"Learn More About Us | ZeeCare Medical Institute"}
          imageUrl={"/about.png"}
        />
        <Biography imageUrl={"/whoweare.png"} />

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
