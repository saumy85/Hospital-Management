// import {
//   FormControl,
//   FormLabel,
//   Grid,
//   Input,
//   Select,
//   Tabs,
// } from "@chakra-ui/react";
// import Actions from "./Actions";
// import { useContext, useEffect, useState } from "react";
// import { Context } from "../../../main";

// const AccountSettings = () => {
//   // useEffect(() => {
//   //   const fetchAppointments = async () => {
//   //     try {
//   //       const { data } = await axios.get(
//   //         "    https://hospital-management-r7hc.onrender.com/api/v1/appointment/getAppointment",
//   //         { withCredentials: true }
//   //       );
//   //       setAppointments(data.appointment);
//   //     } catch (error) {
//   //       setAppointments([]);
//   //       console.log(data);
//   //     }
//   //   };
//   //   fetchAppointments();
//   // }, []);
//   const { data.appointments, setdata.appointments } = useContext(Context);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [Adhar, setAdhar] = useState("");
//   const [address, setAddress] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");

//   useEffect(() => {
//     setAddress(data.appointments.address);
//     setEmail(data.appointments.email);
//     setFirstName(data.appointments.firstName);
//     setLastName(data.appointments.lastName);
//     setAddress(data.appointments.address);
//     setPhone(data.appointments.phone);
//     setAdhar(data.appointments.Adhar);
//     setGender(data.appointments.gender);
//     setDob(data.appointments.dob);
//   }, [data.appointments]);
//   console.log(data.appointments.email);

//   const [person, setPerson] = useState("");

//   // setPerson(data.appointments);
//   // const handleUpdateStatus = async (appointmentId, status) => {
//   //   try {
//   //     const { data } = await axios.put(
//   //       `    https://hospital-management-r7hc.onrender.com/api/v1/appointment/update/${appointmentId}`,
//   //       { status },
//   //       { withCredentials: true }
//   //     );
//   //     setAppointments((prevAppointments) =>
//   //       prevAppointments.map((appointment) =>
//   //         appointment._id === appointmentId
//   //           ? { ...appointment, status }
//   //           : appointment
//   //       )
//   //     );
//   //     toast.success(data.message);
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || "Error updating status");
//   //   }
//   // };

//   return (
//     <Grid
//       templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
//       gap={8}
//     >
//       <FormControl id="firstName">
//         <FormLabel>First Name</FormLabel>
//         <Input value={firstName} focusBorderColor="brand.blue" type="text" />
//       </FormControl>
//       <FormControl id="lastName">
//         <FormLabel>Last Name</FormLabel>
//         <Input value={lastName} focusBorderColor="brand.blue" type="text" />
//       </FormControl>
//       <FormControl id="phoneNumber">
//         <FormLabel>Phone Number</FormLabel>
//         <Input value={phone} focusBorderColor="brand.blue" type="tel" />
//       </FormControl>
//       <FormControl id="emailAddress">
//         <FormLabel>Email Address</FormLabel>
//         <Input value={email} focusBorderColor="brand.blue" type="email" />
//       </FormControl>

//       <FormControl id="adharNo">
//         <FormLabel>Adhar Number</FormLabel>
//         <Input value={Adhar} focusBorderColor="brand.blue" type="email" />
//       </FormControl>
//       <FormControl id="dob">
//         <FormLabel>Date Of Birth</FormLabel>
//         <Input value={data.appointments.dob} focusBorderColor="brand.blue" type="dob" />
//       </FormControl>
//       <FormControl id="Gender">
//         <FormLabel>Gender</FormLabel>
//         <Input value={gender} focusBorderColor="brand.blue" type="gender" />
//       </FormControl>

//       <FormControl id="Address">
//         <FormLabel>Address</FormLabel>
//         <Input value={address} focusBorderColor="brand.blue" type="address" />
//       </FormControl>

//       <FormControl>
//         <Actions work={"Update"} />
//       </FormControl>
//     </Grid>
//   );
// };

// export default AccountSettings;

import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Tabs,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
} from "@chakra-ui/react";
import Actions from "./Actions";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { data.appointments, setdata.appointments } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Adhar, setAdhar] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const patient_id = localStorage.getItem("patient_id");

  console.log(patient_id);
  const handleLogout = async () => {
    // e.preventDefault();
    try {
      const { data } = await axios.put(
        `    https://hospital-management-r7hc.onrender.com/api/v1/data.appointments/update/${patient_id}`,
        {
          firstName,
          lastName,
          phone,
          Adhar,
          email,
          address,
        },
        { withCredentials: true }
      );
      if (data) setdata.appointments(data.user);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };
  const goBack = () => {
    localStorage.removeItem("patient_id");
    localStorage.removeItem("patient__id");
    navigate("/");
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          `     https://hospital-management-r7hc.onrender.com/api/v1/appointment/getOneAppointmentAdmin/${patient_id}`,
          { withCredentials: true }
        );
        console.log(data);

        setAddress(data.appointments.address);
        setEmail(data.appointments.email);
        setFirstName(data.appointments.firstName);
        setLastName(data.appointments.lastName);
        setAddress(data.appointments.address);
        setPhone(data.appointments.phone);
        setAdhar(data.appointments.Adhar);
        setGender(data.appointments.gender);
        setDob(
          data.appointments.dob ? data.appointments.dob.substring(0, 10) : ""
        );
        setStatus(data.appointments.status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointment();
  }, []);

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `     https://hospital-management-r7hc.onrender.com/api/v1/appointment/delete/${pId}`,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(`Appointment is deleted`);
      } else {
        toast.error(data.message);
      }
      localStorage.removeItem("patient_id");
      localStorage.removeItem("patient__id");
      navigate("/");
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };

  const [person, setPerson] = useState("");

  return (
    <>
      {" "}
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={8}
      >
        <FormControl id="firstName">
          <FormLabel>First Name</FormLabel>
          <Input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            focusBorderColor="brand.blue"
            type="text"
          />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>Last Name</FormLabel>
          <Input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            focusBorderColor="brand.blue"
            type="text"
          />
        </FormControl>
        <FormControl id="phoneNumber">
          <FormLabel>Phone Number</FormLabel>
          <Input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            focusBorderColor="brand.blue"
            type="tel"
          />
        </FormControl>
        <FormControl id="emailAddress">
          <FormLabel>Email Address</FormLabel>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            focusBorderColor="brand.blue"
            type="email"
          />
        </FormControl>

        <FormControl id="adharNo">
          <FormLabel>Adhar Number</FormLabel>
          <Input value={Adhar} focusBorderColor="brand.blue" type="text" />
        </FormControl>
        <FormControl id="dob">
          <FormLabel>Date Of Birth</FormLabel>
          <Input
            disabled="disabled"
            value={dob}
            focusBorderColor="brand.blue"
            type="text"
          />
        </FormControl>
        <FormControl id="Gender">
          <FormLabel>Gender</FormLabel>
          <Input
            disabled="disabled"
            value={gender}
            focusBorderColor="brand.blue"
            type="text"
          />
        </FormControl>

        <FormControl id="Address">
          <FormLabel>Address</FormLabel>
          <Input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            focusBorderColor="brand.blue"
            type="text"
          />
        </FormControl>
      </Grid>
      <Grid
        mt="20px"
        mb="2px"
        width="100%"
        templateColumns="1fr 1fr"
        gap={6}
        alignItems="center"
      >
        <Box className="profile">
          <Button
            style={{ border: "solid ", borderColor: "#0e8797" }}
            backgroundColor={"#0E8797"}
            onClick={onOpen}
          >
            Delete
          </Button>

          <Modal className="zidx" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>Are you sure to Delete!!</ModalBody>

              <ModalFooter>
                <Button
                  style={{ border: "solid ", borderColor: "#0e8797" }}
                  backgroundColor={"#0E8797"}
                  mr={3}
                  onClick={onClose}
                  variant="ghost"
                >
                  Close
                </Button>
                <Button
                  style={{
                    border: "solid ",
                    borderColor: "#0e8797",
                    color: "#0e8797",
                  }}
                  backgroundColor={"white"}
                  variant="ghost"
                  onClick={(e) => {
                    handleDelete(patient_id);
                  }}
                >
                  Yes, I want!!
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Box className="profile" textAlign="right">
          <Button
            onClick={goBack}
            style={{ border: "solid ", borderColor: "#0e8797" }}
            backgroundColor={"#0E8797"}
          >
            <IoMdArrowRoundBack
              style={{ marginLeft: "0", fontSize: "22px", fontWeight: "bold" }}
            />
            Back
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default AccountSettings;
