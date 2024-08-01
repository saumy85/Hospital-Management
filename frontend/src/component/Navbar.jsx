import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { color } from "framer-motion";
// import "../Css.css";
const Navbar = () => {
  const [show, setShow] = useState(true);
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios
      .get(
        "    https://hospital-management-r7hc.onrender.com/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        toast.success(resp.data.message);
        setIsAuthenticated(false);
        setUser({});
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoLogin = () => {
    navigate("/login");
    // toast.error("Hello");
  };
  const goToProfile = (value) => {
    if (value == "Profile") navigate("/user/profile");
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",

          zIndex: "1220",
        }}
        className="container header"
      >
        <div className="nav-col logo">
          {" "}
          <img src="/logo1.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinkss showmenu" : "navLinkss"}>
          <div className="links">
            <Link className="nav-col" to={"/"}>
              HOME
            </Link>
            {isAuthenticated ? (
              <Link className="nav-col" to={"/appointment"}>
                APPOINTMENT
              </Link>
            ) : (
              <Link className="nav-col" to={"/register"}>
                REGISTER
              </Link>
            )}
            <div>
              <select
                className="select-nav"
                onChange={(e) => {
                  goToProfile(e.target.value);
                }}
              >
                <option value="Services">SERVICES</option>
                {user ? (
                  <option value="Profile">Profile</option>
                ) : (
                  <option value="Emergency">Emergency</option>
                )}
                <option value="Normal">Normal</option>
              </select>
            </div>
            <Link className="nav-col" to={"/doctors"}>
              DOCTORS
            </Link>
            <Link className="nav-col" to={"/about"}>
              ABOUT US
            </Link>
          </div>
          {isAuthenticated ? (
            <button
              style={{ backgroundColor: "black" }}
              className="btn nav-col"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              style={{ backgroundColor: "black" }}
              className="  btn nav-col"
              onClick={gotoLogin}
            >
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger">
          {show ? (
            <GiHamburgerMenu
              style={{ color: "white" }}
              className="ham-hov"
              onClick={() => setShow(!show)}
            />
          ) : (
            <RxCross2
              style={{ color: "white", strokeWidth: "1", fontSize: "28px" }}
              className="ham-hov"
              onClick={() => setShow(!show)}
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
