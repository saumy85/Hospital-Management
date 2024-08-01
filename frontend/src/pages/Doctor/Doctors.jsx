import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Grid,
  Box,
  Flex,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdPersonSearch } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleAppointment = (ele) => {
    localStorage.setItem("doctor", JSON.stringify(ele));
    navigate("/appointment");
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors"
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  const handleSearch = async (search) => {
    try {
      let key = search ? search : "";
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/user/search/${key}`
      );

      setDoctors(data.result);
      console.log(doctors);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGo = (e) => {
    navigate("/doctorProfile");
    localStorage.setItem("doctor", JSON.stringify(e));
  };
  return (
    <>
      <Navbar />
      <div className="content">
        <Flex
          mt="0"
          p="20"
          backgroundImage="url(cover.png)"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          mb="20"
          alignItems="center"
          flexDirection="column"
        >
          <Box mt="20" width="50%">
            <InputGroup size="md">
              <Input
                onChange={(e) => {
                  console.log(e.target.value);
                  handleSearch(e.target.value ? e.target.value : "");
                }}
                backgroundColor="white"
                opacity="1"
                shadow="md"
                pr="4.5rem"
                borderColor="white"
                style={{
                  border: "solid ",
                  borderColor: " #fff ",
                  borderWidth: "2px",
                  borderRadius: "25px",
                  height: "50px",
                }}
                focusBorderColor="white"
                type="search"
                placeholder="Search doctor"
              />
              <InputRightElement width="4.5rem">
                <MdPersonSearch
                  className="search"
                  style={{
                    marginTop: "8",
                    marginLeft: "15",
                    fontSize: "30px",
                    fontWeight: "thin",
                    cursor: "pointer",
                    color: "black",
                  }}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>
        <Grid
          width={{ base: "100%" }}
          templateColumns={{
            base: "repeat(1,6fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          w="full"
          mx="auto"
          gap={6}
          px={12} // Adjust padding as needed
          mb="20"
        >
          {doctors &&
            doctors.map((ele, idx) => (
              <Box shadow="lg" maxW="lg" mx="auto" key={idx}>
                <Card maxW="lg">
                  <CardBody>
                    <Image
                      height="290"
                      src={ele.docAvatar.url}
                      alt="Green double couch with wooden legs"
                      borderRadius="100%"
                    />
                    <Stack mt="6" spacing="3">
                      <Flex flexDirection="row">
                        <Text
                          fontWeight="extrabold"
                          color="brand.black"
                          fontSize="lg"
                        >
                          {"Doctor : "}
                        </Text>
                        <Text
                          color="brand.black"
                          fontWeight="thick"
                          fontSize="lg"
                        >
                          &nbsp; {ele.firstName + " " + ele.lastName}
                        </Text>
                      </Flex>
                      <Flex flexDirection="row">
                        <Text
                          fontWeight="extrabold"
                          color="brand.black"
                          fontSize="lg"
                        >
                          {"Department : "}
                        </Text>
                        <Text
                          color="brand.black"
                          fontWeight="thick"
                          fontSize="lg"
                        >
                          &nbsp;{ele.doctorDepartment}
                        </Text>
                      </Flex>

                      <Flex flexDirection="row">
                        <Text color="blue.600" fontSize="2xl">
                          {"Fees : "}
                        </Text>

                        <Text color="blue.600" fontSize="2xl">
                          {"500₹"}
                        </Text>
                      </Flex>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup
                      justifyContent="space-between"
                      spacing="2"
                      w="full"
                    >
                      <Box className="profile" textAlign="right">
                        <Button
                          onClick={(e) => {
                            handleAppointment(ele);
                          }}
                          shadow="md"
                          style={{ border: "solid", borderColor: "#0e8797" }}
                          backgroundColor={"#0E8797"}
                        >
                          Appointment
                        </Button>
                      </Box>
                      <Box className="profile" textAlign="right">
                        <Button
                          onClick={(e) => {
                            handleGo(ele);
                          }}
                          shadow="md"
                          style={{ border: "solid", borderColor: "#0e8797" }}
                          backgroundColor={"#0E8797"}
                        >
                          Profile
                        </Button>
                      </Box>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
            ))}
        </Grid>
        <Footer />
      </div>
    </>
  );
};

export default Doctors;
