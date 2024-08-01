import React from "react";
import Navbar from "../../component/Navbar";
import Hero from "../../component/Hero";
import AppointementForm from "../../component/AppointementForm";
import Footer from "../../component/Footer";
//import "../Css.css";

const Appointment = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Hero
          title={"Schedule Your Appointment | ZeeCare Medical Institute"}
          imageUrl={"signin.png"}
        />
        <AppointementForm />
        <Footer />
      </div>
    </>
  );
};

export default Appointment;
