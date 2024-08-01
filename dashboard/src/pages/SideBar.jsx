import React, { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import "./../App";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/admin/doctor");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/admin/message");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/admin/addNewDoctor");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addNewAdmin");
    setShow(!show);
  };
  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />

          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        {" "}
        {show ? (
          <RxCross2
            style={{ strokeWidth: "1", fontSize: "80px" }}
            className="hamburger"
            onClick={() => setShow(!show)}
          />
        ) : (
          <GiHamburgerMenu
            className="hamburger"
            onClick={() => setShow(!show)}
          />
        )}
      </div>
    </>
  );
};

export default SideBar;
