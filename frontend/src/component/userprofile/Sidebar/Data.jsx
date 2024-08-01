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
} from "@chakra-ui/react";
import Actions from "../Content/Actions";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../main";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Data() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);
  const [status, setStatus] = useState("Pending");
  const [date, setDate] = useState("Not Fixed ");
  const [visited, setVisited] = useState("No");
  const [department, setDepartment] = useState("None");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          ` http://localhost:4000/api/v1/appointment/getOneAppointment/${user._id}`,
          { withCredentials: true }
        );
        setStatus(data.appointments.status);
        //console.log(data.appointments);
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

  const list = [
    {
      id: 1,
      name: "Status",
      value: status,
      color: status == "Pending" || status == "Rejected" ? "#E53E3E" : "green",
    },
    {
      id: 2,
      name: "Next Appointment",
      value: status == "Pending" || status == "Rejected" ? "Apply Again" : date,
      color: status == "Pending" || "Rejected" ? "green" : "#ECC94B",
    },
    {
      id: 3,
      name: "Previously Visited",
      value: visited,
      color: status == "Pending" || status == "Rejected" ? "#ECC94B" : "green",
    },
    {
      id: 4,
      name: "Department",
      value: department,
      color:
        status == "Pending" || status == "Rejected" ? "#E53E3E" : "#ECC94B",
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((resp) => {
        toast.success(resp.data.message);
        setIsAuthenticated(false);
        setUser({});
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  // const onClose = () => {
  //   navigate("/profile");
  // };
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
      {list.map((item) => (
        <Box
          key={item.id}
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
          <Text color="brand.dark">{item.name}</Text>
          <Text color={`${item.color}`} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}
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
          style={{ border: "solid ", borderColor: "#0e8797" }}
          backgroundColor={"#0E8797"}
          onClick={onOpen}
        >
          Logout
        </Button>

        <Modal className="zidx" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>Are you sure to log out!!</ModalBody>

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
                onClick={handleLogout}
              >
                Yes,I want!!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </FormControl>

      {/* 
      <FormControl >
        <Actions work={"Logout"} />
      </FormControl> */}
    </VStack>
  );
}

export default Data;
