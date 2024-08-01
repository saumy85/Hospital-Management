import React from "react";
import Hero from "../../component/Hero";
import Biography from "../../component/Biography";
import Department from "../../component/Department";
import MessageForm from "../../component/MessageForm";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import ServiceDetails from "../../component/ServiceDetails";
import CrousalCom from "../../component/CrousalCom";
//import "../Css.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ overflowX: "hidden" }} className="content">
        <CrousalCom />
        <Hero
          title={
            "Welcome to ZeeCare Medical Institute | Your Trusted Health Partner"
          }
          imageUrl={"/hero.png"}
        />
        <Biography imageUrl={"/about.png"} />
        <Department />

        <Footer />
      </div>
    </>
  );
};

export default Home;
