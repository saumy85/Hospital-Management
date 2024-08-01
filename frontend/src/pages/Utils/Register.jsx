import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
//import '../Css.css'
const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "    https://hospital-management-r7hc.onrender.com/api/v1/user/patientregister",
          { firstName, lastName, email, phone, Adhar, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setAdhar("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Navbar />
      <div className="content">
        <div
          className="container form-component register-form "
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              padding: "20px 0px 0px 0px",
              width: "80%",
            }}
          >
            {" "}
            <form
              style={{
                borderRadius: "15px",
                boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                padding: "20px 40px 20px 40px",
              }}
              onSubmit={handleRegistration}
            >
              <div
                w="100%"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2 style={{ marginBottom: "0" }}>Sign Up</h2>
                <p mt="0">Please Sign Up To Continue</p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Adhar Number"
                  value={Adhar}
                  onChange={(e) => setAdhar(e.target.value)}
                />
                <input
                  type={"date"}
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div
                style={{
                  gap: "10px",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                }}
              >
                <p style={{ marginBottom: 0 }}>Already Registered?</p>
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "#271776ca" }}
                >
                  Login Now
                </Link>
              </div>
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <button className="btn" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;
