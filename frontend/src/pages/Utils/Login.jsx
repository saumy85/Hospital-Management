import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "./Css.css";
const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, setUserId, user } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsAuthenticated(true);
          setUser(res.data.user);
          setUserId(res.data.user._id);
          navigate("/");
          toast.success(res.data.message);
        });
      console.log(email, password, confirmPassword);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  console.log(user);
  return (
    <>
      <Navbar />
      <div className="content">
        <div className="container form-component login-form">
          <form
            style={{
              borderRadius: "15px",
              boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              padding: "20px 40px 20px 40px",
            }}
            onSubmit={handleLogin}
          >
            <div
              w="100%"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2 style={{ marginBottom: "0" }}>Sign In</h2>
              <p>Please Login To Continue</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                est veniam aspernatur totam sequi optio.
              </p>
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm Password"
            />
            <div
              style={{
                gap: "10px",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <p style={{ marginBottom: 0 }}>Not Registered?</p>
              <Link
                style={{ textDecoration: "none", alignItems: "center" }}
                to={"/register"}
              >
                Register Now
              </Link>
            </div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button className="btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
