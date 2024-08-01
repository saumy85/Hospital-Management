import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
// import "../Css.css";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <footer className={"container footer"}>
        <hr />
        <div className="contentt ">
          <div>
            <img src="/logo1.png" alt="logo" className="logo-img" />
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link style={{ color: "black" }} to={"/"}>
                Home
              </Link>
              <Link style={{ color: "black" }} to={"/appointment"}>
                Appointment
              </Link>
              <Link style={{ color: "black" }} to={"/about"}>
                About
              </Link>
              <Link style={{ color: "black" }} to={"/contact"}>
                Contact Us
              </Link>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span style={{ color: "black" }}>{element.day}</span>
                  <span style={{ color: "black" }}>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>999-999-9999</span>
            </div>
            <div>
              <MdEmail />
              <span>xyz@mail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Silchar,India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
