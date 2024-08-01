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
//   const { user, setUser } = useContext(Context);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [Adhar, setAdhar] = useState("");
//   const [address, setAddress] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");

//   useEffect(() => {
//     setAddress(user.address);
//     setEmail(user.email);
//     setFirstName(user.firstName);
//     setLastName(user.lastName);
//     setAddress(user.address);
//     setPhone(user.phone);
//     setAdhar(user.Adhar);
//     setGender(user.gender);
//     setDob(user.dob);
//   }, [user]);
//   console.log(user.email);

//   const [person, setPerson] = useState("");

//   // setPerson(user);
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
//         <Input value={user.dob} focusBorderColor="brand.blue" type="dob" />
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
} from "@chakra-ui/react";
import Actions from "./Actions";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import axios from "axios";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const { user, setUser } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [Adhar, setAdhar] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const handleUpdate = async () => {
    // e.preventDefault();
    try {
      const { data } = await axios.put(
        `    https://hospital-management-r7hc.onrender.com/api/v1/user/update/${user._id}`,
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
      if (data) setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  useEffect(() => {
    setAddress(user.address);
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAddress(user.address);
    setPhone(user.phone);
    setAdhar(user.Adhar);
    setGender(user.gender);
    setDob(user.dob ? user.dob.substring(0, 10) : "");
  }, [user]);

  const [person, setPerson] = useState("");

  return (
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

      <FormControl onClick={handleUpdate}>
        <Actions work={"Update"} />
      </FormControl>
    </Grid>
  );
};

export default AccountSettings;
