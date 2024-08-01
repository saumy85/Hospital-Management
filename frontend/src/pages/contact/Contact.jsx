import React, { useEffect } from "react";
import "./Contact.css";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import ContactForm from "../../component/contactform/ContactForm";

const Contact = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div className="wrapper">
        <Navbar />
      </div>
      <br />
      <div className="Spacing">
        <div className="wrapper"></div>
        <div className="content2">
          <img src={"/Logo.png"} alt="Logo" width={100} />
        </div>
        <h2>Feel Free to Contact Us </h2>

        <div className="content1">
          <p>
            Hey there!
            <br />
            Feeling overwhelmed by your healthcare needs or worried about a
            loved one's medical condition? We understand! That's why ZeeCare
            Hospital is here for you. Think of us as your healthcare best
            friends. We'll support you through every step of your medical
            journey with compassion and expertise, making the process feel much
            less daunting. We're professionals who genuinely care, and we're
            always ready to answer any questions you might have!
            <br />
            Ready to leave the stress behind and join our caring community?
            Let's connect!
          </p>
        </div>
        <h2>
          We're here for you, Please drop us a message and our team will get in
          touch with you within 24 hours.
        </h2>

        <br />
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Contact;
