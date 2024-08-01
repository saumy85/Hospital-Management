import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import SideBar from "./SideBar";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stack,
  Select,
  Grid,
  Box,
  HStack,
  Button,
} from "@chakra-ui/react";
const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "    https://hospital-management-r7hc.onrender.com/api/v1/appointment/getAppointment",
          { withCredentials: true }
        );
        setAppointments(data.appointment);
      } catch (error) {
        setAppointments([]);
        console.log(data);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `    https://hospital-management-r7hc.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  const { isAuthenticated, admin, patient, setPatient } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const handleUpdate = (appo) => {
    setPatient(appo);
    localStorage.setItem("patient_id", appo._id);
    let xt = JSON.stringify(appo);
    console.log(xt);
    localStorage.setItem("patient__id", xt);
    navigate("/profile");
  };
  return (
    <>
      <SideBar />
      <section
        className="dashboard page"
        style={{ backgroundColor: " #0e8797 " }}
      >
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div style={{ backgroundColor: "	#ADD8E6" }} className="secondBox">
            <p>Total Appointments</p>
            <h3>1500</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner" zIndex="-1">
          <h5>Appointments</h5>
          {/* <table>
            <thead>
              <tr>
                <Th>Patient</Th>
                <Th>Date</Th>
                <Th>Doctor</Th>
                <Th>Department</Th>
                <Th>Status</Th>
                <Th>Visited</Th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <Td>{`${appointment.firstName} ${appointment.lastName}`}</Td>
                    <Td>{appointment.appointmenTdate.substring(0, 16)}</Td>
                    <Td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</Td>
                    <Td>{appointment.department}</Td>
                    <Td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </option>
                    </Td>
                    <Td>
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="6">No Appointments Found!</Td>
                </tr>
              )}
            </tbody>
          </table> */}

          <TableContainer>
            <Table variant="" colorScheme="">
              <Thead>
                <Tr>
                  <Th fontSize={{ sm: "lg" }}>Patient</Th>

                  <Th fontSize={{ sm: "lg" }}>Doctor</Th>
                  <Th fontSize={{ sm: "lg" }}>Department</Th>
                  <Th fontSize={{ sm: "lg" }}>Status</Th>
                  <Th fontSize={{ sm: "lg" }}>Visited</Th>
                  <Th fontSize={{ sm: "lg" }}>Update</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <Tr key={appointment._id}>
                      <Td mx="2">{`${appointment.firstName} ${appointment.lastName}`}</Td>

                      <Td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</Td>
                      <Td>{appointment.department}</Td>
                      <Td>
                        <Select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                          variant="outline"
                          placeholder="Pending"
                          width="140px"
                          fontSize="sm"
                          borderColor="brand.blue"
                          focusBorderColor="brand.green"
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </Select>
                      </Td>
                      <Td>
                        {appointment.hasVisited ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </Td>

                      <Td className="profile ">
                        <Button
                          onClick={(e) => {
                            handleUpdate(appointment);
                          }}
                          isDisabled={false}
                          style={{ border: "solid ", borderColor: "#0e8797" }}
                          backgroundColor={"#0E8797"}
                        >
                          Update
                        </Button>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="6">No Appointments Found!</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
