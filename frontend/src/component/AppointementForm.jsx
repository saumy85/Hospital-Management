import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useConst } from "@chakra-ui/react";
import { Context } from "../main";

import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  Text,
  Heading,
} from "@chakra-ui/react";
// import "../Css.css";

const AppointementForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [dis, setDis] = useState(false);
  const [disS, setDisS] = useState(false);

  const navigate = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  const { user } = useContext(Context);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "    https://hospital-management-r7hc.onrender.com/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "    https://hospital-management-r7hc.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          Adhar,
          dob,
          gender,
          appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      navigate("/");
      localStorage.removeItem("doctor");
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const doctor = JSON.parse(localStorage.getItem("doctor"));

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setAdhar(user.Adhar);
    setGender(user.gender);
    setDis(true);
    setDob(user?.dob?.substring(0, 10));
    if (doctor) {
      setDoctorFirstName(doctor.firstName);
      setDoctorLastName(doctor.lastName);
      setDepartment(doctor.doctorDepartment);
      setDisS(true);
    }
  }, []);
  window.addEventListener("popstate", function (event) {
    localStorage.removeItem("doctor");
  });
  return (
    <>
      <div
        className="container form-component appointment-form"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            padding: "20px 0px 20px 0px",
            width: "70%",
          }}
        >
          <form
            style={{
              borderRadius: "15px",
              boxShadow: " 0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
              padding: "25px 40px 20px 40px",
            }}
            onSubmit={handleAppointment}
          >
            <div
              w="100%"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {" "}
              <h2 style={{ color: "black" }}>Appointment</h2>
            </div>

            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                disabled={dis ? "isDisabled" : ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                disabled={dis ? "isDisabled" : ""}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                disabled={dis ? "isDisabled" : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                disabled={dis ? "isDisabled" : ""}
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
                type="date"
                placeholder="Date of Birth"
                disabled={dis ? "isDisabled" : ""}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <select
                disabled={dis ? "isDisabled" : ""}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="date"
                placeholder="Appointment Date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div>
              <select
                disabled={disS ? "isDisabled" : ""}
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDoctorFirstName("");
                  setDoctorLastName("");
                }}
              >
                <option>Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              <select
                disabled={disS || !department ? "isDisabled" : ""}
                value={`${doctorFirstName} ${doctorLastName}`}
                onChange={(e) => {
                  const [firstName, lastName] = e.target.value.split(" ");
                  setDoctorFirstName(firstName);
                  setDoctorLastName(lastName);
                }}
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.doctorDepartment === department)
                  .map((doctor, index) => (
                    <option
                      value={`${doctor.firstName} ${doctor.lastName}`}
                      key={index}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <input
              rows="10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <div
              style={{
                gap: "10px",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <p style={{ marginBottom: 0 }}>Have you visited before?</p>
              <input
                type="checkbox"
                checked={hasVisited}
                onChange={(e) => setHasVisited(e.target.checked)}
                style={{ flex: "none", width: "25px" }}
              />
            </div>
            <button
              style={{ margin: "0 auto", marginBottom: "10px" }}
              className="btn"
            >
              GET APPOINTMENT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointementForm;
