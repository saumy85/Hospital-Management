import {
  Box,
  Text,
  VStack,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Actions from "../Content/Actions";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../main";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Data() {
  const { isAuthenticated, setIsAuthenticated, patient, setPatient } =
    useContext(Context);
  const [status, setStatus] = useState("Pending");
  const [date, setDate] = useState("Not Fixed ");
  const [visited, setVisited] = useState("No");
  const [department, setDepartment] = useState("None");
  const [appointment, setAppointment] = useState({});
  let patient_id = localStorage.getItem("patient_id");

  //console.log(patient);
  // useEffect(() => {
  //   console.log(patient);
  //   setStatus(patient.status);
  //   setDate(
  //     patient.appointmentDate
  //       ? patient.appointmentDate.substring(0, 10)
  //       : "Not fixed"
  //   );
  //   setVisited(patient.hasVisited ? "YES" : "NO");
  //   setDepartment(patient.department);
  // }, [patient]);

  // useState(() => {
  //   setStatus(patient.status);
  //   setDate(
  //     patient.appointmentDate
  //       ? patient.appointmentDate.substring(0, 10)
  //       : "Not fixed"
  //   );
  //   setVisited(patient.hasVisited ? "YES" : "NO");
  //   setDepartment(patient.department);
  // }, []);

  // useEffect(() => {
  //   const fetchAppointment = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `     https://hospital-management-r7hc.onrender.com/api/v1/appointment/getOneAppointment/${patient._id}`,
  //         { withCredentials: true }
  //       );
  //       setStatus(data.appointments.status);
  //       //console.log(data.appointments);
  //       setDepartment(data.appointments.department);
  //       setVisited(data.appointments.hasVisited ? "YES" : "NO");
  //       setDate(data.appointments?.appointmentDate?.substring(0, 10));
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchAppointment();
  // }, []);

  // const list = [
  //   {
  //     id: 1,
  //     name: "Status",
  //     value: status,
  //     color: status == "Pending" || status == "Rejected" ? "#E53E3E" : "green",
  //   },
  //   {
  //     id: 2,
  //     name: "Next Appointment",
  //     value: status == "Pending" || status == "Rejected" ? "Apply Again" : date,
  //     color: status == "Pending" || "Rejected" ? "green" : "#ECC94B",
  //   },
  //   {
  //     id: 3,
  //     name: "Previously Visited",
  //     value: visited,
  //     color: status == "Pending" || status == "Rejected" ? "#ECC94B" : "green",
  //   },
  //   {
  //     id: 4,
  //     name: "Department",
  //     value: department,
  //     color:
  //       status == "Pending" || status == "Rejected" ? "#E53E3E" : "#ECC94B",
  //   },
  // ];
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          `     https://hospital-management-r7hc.onrender.com/api/v1/appointment/getOneAppointmentAdmin/${patient_id}`,
          { withCredentials: true }
        );
        console.log(data);
        setStatus(data.appointments.status);

        setDepartment(data.appointments.department);
        setVisited(data.appointments.hasVisited ? "YES" : "NO");
        setDate(data.appointments?.appointmentDate?.substring(0, 10));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointment();
  }, []);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        `    https://hospital-management-r7hc.onrender.com/api/v1/appointment/update/${patient_id}`,
        { status, date },
        { withCredentials: true }
      );
      setPatient(data.appointment);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  // const handleLogout = async () => {
  //   await axios
  //     .get("    https://hospital-management-r7hc.onrender.com/api/v1/patient/patient/logout", {
  //       withCredentials: true,
  //     })
  //     .then((resp) => {
  //       toast.success(resp.data.message);
  //       setIsAuthenticated(false);
  //       setPatient({});
  //       navigate("/login");
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.message);
  //     });
  // };
  // const onClose = () => {
  //   navigate("/profile");
  // };
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
      <Box
        as="li"
        w="full"
        py={3}
        px={5}
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        borderColor="brand.light"
      >
        <Select
          className={
            patient.status === "Pending"
              ? "value-pending"
              : patient.status === "Accepted"
              ? "value-accepted"
              : "value-rejected"
          }
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          // variant="outline"
          placeholder="Pending"
          width="auto"
          fontSize="md"
          fontWeight="bold"
          borderColor="#0E8797"
          style={{
            border: "solid ",
            borderColor: "#0E8797",
            borderWidth: "2px",
          }}
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
      </Box>

      <Box
        as="li"
        w="full"
        py={3}
        px={5}
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderColor="brand.light"
      >
        <Input
          fontWeight="bold"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          padding="7"
          value={date}
          type="date"
          className="datepicker-toggle datepicker-toggle-button"
          isInvalid
          errorBorderColor="#0E8797"
          placeholder="Date"
        />
      </Box>
      <Box
        as="li"
        w="full"
        py={3}
        px={5}
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        borderColor="brand.light"
      >
        <Text color="brand.dark">Previosly Visited</Text>
        <Text mb="2" color={"red.500"} fontWeight="bold">
          {visited}
        </Text>

        <Text color="brand.dark">Previosly Visited</Text>
        <Text color={"green"} fontWeight="bold">
          {department}
        </Text>
      </Box>

      <FormControl
        zIndex="1111"
        className="profile"
        mt={3}
        py={5}
        px={8}
        borderTopWidth={1}
        border={"none"}
      >
        <Button
          onClick={handleSubmit}
          style={{ border: "solid ", borderColor: "#0e8797" }}
          backgroundColor={"#0E8797"}
        >
          Submit
        </Button>
      </FormControl>

      {/* 
      <FormControl >
        <Actions work={"Logout"} />
      </FormControl> */}
    </VStack>
  );
}

export default Data;
