import { Container } from "@chakra-ui/layout";
import Cover from "./Cover";
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Button,
  Grid,
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import { BsFacebook } from "react-icons/bs";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import ReadMoreLess from "../../../component/ReadMore";

const handleEdit = () => {};
export default function DoctorViewProfile() {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  return (
    <>
      <Navbar />
      <div className="content">
        <Flex direction={["column", "column", "row"]} p={6}>
          <Flex
            borderRadius="8px"
            marginTop="6"
            marginLeft="9"
            direction="column"
            boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
            p="3"
          >
            <VStack
              padding="20"
              spacing={3}
              py={5}
              borderBottomWidth={1}
              borderColor="brand.light"
            >
              <Avatar
                _hover={{
                  transform: "scale(1.1)",

                  transition: "transform 0.1s ease-in-out",
                }}
                src={`${doctor.docAvatar.url}`}
                size="2xl"
                name=""
                cursor="pointer"
                boxShadow="inset 0 0 10px rgba(0, 0, 0, .5)"
              ></Avatar>

              <VStack spacing={1}>
                <Input
                  fontWeight="normal"
                  color="brand.black"
                  fontSize="lg"
                  value={`${doctor.firstName}` + " " + `${doctor.lastName}`}
                ></Input>
                <Input
                  fontWeight="normal"
                  color="brand.black"
                  fontSize="lg"
                  value={`${doctor.doctorDepartment}`}
                ></Input>
              </VStack>
            </VStack>
            <Flex ml="4" my="3" flexDirection="row">
              <Text
                fontWeight="extrabold"
                color="brand.black"
                fontSize="lg"
                ml="2"
              >
                {"Qualification : "}
              </Text>
              <Input
                fontWeight="thick"
                color="brand.black"
                fontSize="lg"
                value={"XYZ"}
              ></Input>
            </Flex>
            <Flex ml="4" my="3" flexDirection="row">
              <Text fontWeight="extrabold" color="brand.black" fontSize="lg">
                {"Email : "}
              </Text>
              <Text color="brand.black" fontWeight="thick" fontSize="lg">
                &nbsp; {`${doctor.email}`}
              </Text>
            </Flex>
            <Flex ml="4" my="3" flexDirection="row">
              <Text fontWeight="extrabold" color="brand.black" fontSize="lg">
                {"Address : "}
              </Text>
              <Text color="brand.black" fontWeight="thick" fontSize="lg">
                &nbsp;{`${doctor.address}`}
              </Text>
            </Flex>
            <Flex ml="4" my="3" flexDirection="row">
              <Text fontWeight="extrabold" color="brand.black" fontSize="lg">
                {"Ofiice Address : "}
              </Text>
              <Text color="brand.black" fontWeight="thick" fontSize="lg">
                &nbsp;XYZ PIN:0000
              </Text>
            </Flex>
            <Flex ml="4" my="3" flexDirection="row">
              <Text fontWeight="extrabold" color="brand.black" fontSize="lg">
                {"  Experience : "}
              </Text>
              <Text color="brand.black" fontWeight="thick" fontSize="lg">
                &nbsp;10 yrs
              </Text>
            </Flex>
            <Flex
              mt="10"
              borderTopWidth={1}
              py="3"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text mt="5" color="brand.black" fontWeight="bold" fontSize="lg">
                Contact
              </Text>
              <Flex w="100%" mt={2} justifyContent="center" flexDirection="row">
                <Box
                  _hover={{
                    borderRadius: "35px",
                    color: "white",
                    background: "#1877F2",
                    transform: "scale(1.5)",
                    cursor: "pointer",
                    transition: "transform 0.1s ease-in-out",
                  }}
                  mx="8px"
                >
                  <BsFacebook size="30px" />
                </Box>
                <Box
                  _hover={{
                    borderRadius: "5px",
                    transform: "scale(1.5)",
                    cursor: "pointer",
                    color: "white",
                    transition: "transform 0.1s ease-in-out",
                    // background: " #833ab4",
                    background:
                      " linear-gradient(to right,#833ab4,#fd1d1d,#fcb045)",
                    boxShadow: "0px 3px 10px rgba(0,0,0,.25)",
                  }}
                  mx="30px"
                >
                  <FaSquareInstagram size="30px" />
                </Box>
                <Box
                  _hover={{
                    color: "white",
                    borderRadius: "5px",
                    background: "#0072b1",
                    transform: "scale(1.5)",
                    cursor: "pointer",
                    transition: "transform 0.1s ease-in-out",
                  }}
                  mx="8px"
                >
                  <IoLogoLinkedin size="30px" />
                </Box>
              </Flex>
              <Flex pt="10">
                <Button
                  onClick={handleEdit}
                  style={{ border: "solid ", borderColor: "#0e8797" }}
                  backgroundColor={"#0E8797"}
                  _hover={{
                    color: "#0e8797",
                    backgroundColor: "white",
                    borderColor: "#0c6a78",
                  }}
                >
                  Submit
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            borderRadius="8px"
            marginTop="6"
            marginLeft="9"
            direction="column"
            boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
            p="3"
            flex="9"
          >
            <Box
              background="	#f8f8f8  "
              innerShadow="-8px -8px 8px 0 #FFFFFF 70% 8px 8px 8px 0 #AEAEC0 20%"
              px="4"
              // boxShadow="inset 0 0 10px rgba(0, 0, 0, .1)"
              my="3"
              borderRadius="20px"
              py="3"
              w="100%"
            >
              <Text
                my="4"
                fontWeight="extrabold"
                color="brand.black"
                fontSize="lg"
              >
                About
              </Text>
              <ReadMoreLess>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur unde odit commodi minus dolorum similique
                repudiandae architecto itaque rem rerum, mollitia quam sunt
                libero maiores deleniti esse dolores quasi nulla est omnis
                necessitatibus voluptas molestias ab. Excepturi suscipit
                consectetur deserunt nulla neque, saepe animi eos necessitatibus
                voluptatem quia sed eum quae nihil, sapiente officiis aliquid!
                Iusto fuga, unde vel nisi, repudiandae ipsam pariatur eius
                sapiente recusandae laudantium atque aliquam, praesentium
                quibusdam! Amet, labore, in neque omnis obcaecati corrupti
                minima dignissimos unde aspernatur repellendus consectetur
                fugiat, recusandae animi saepe natus reiciendis aliquid?
                Voluptatum non ducimus aliquam, temporibus ratione sequi iure
                sit?
              </ReadMoreLess>
            </Box>
            <Box
              px="4"
              background="	#f8f8f8 "
              innerShadow="-8px -8px 8px 0 #FFFFFF 70% 8px 8px 8px 0 #AEAEC0 20%"
              my="3"
              borderRadius="20px"
              py="3"
              w="100%"
            >
              <Text
                my="4"
                fontWeight="extrabold"
                color="brand.black"
                fontSize="lg"
              >
                Achievements
              </Text>
              <ReadMoreLess>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                iusto expedita consequatur amet nesciunt dignissimos harum,
                officia voluptate delectus sapiente eligendi aperiam quod veniam
                sequi id? Dolore dicta ab placeat dignissimos, voluptate quia
                sint sit, commodi rem veritatis suscipit corporis! Repellat
                ratione totam, sunt quo illo tempore in voluptatum ipsam dolor
                obcaecati velit amet ducimus nostrum asperiores! Possimus labore
                officia eos autem sit perferendis fugiat aperiam, quam delectus
                culpa eius quia consectetur numquam iusto soluta doloribus hic
                aliquid quibusdam illum.
              </ReadMoreLess>
            </Box>
            <Flex
              px="4"
              background="	#f8f8f8 "
              innerShadow="-8px -8px 8px 0 #FFFFFF 70% 8px 8px 8px 0 white  90%"
              my="3"
              borderRadius="20px"
              py="3"
              w="100%"
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                my="4"
                fontWeight="extrabold"
                color="brand.black"
                fontSize="lg"
              >
                Appointment Availability
              </Text>
              <Grid
                w="100%"
                templateColumns={{
                  base: "repeat(3,6fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(7, 1fr)",
                }}
                gap={6}
              >
                <Box>
                  <Text
                    fontWeight="extrabold"
                    color="brand.black"
                    fontSize="lg"
                  >
                    Sun
                  </Text>
                  <Text fontSize="md">10 AM - 2 PM</Text>
                </Box>

                <Box>
                  <Text
                    fontWeight="extrabold"
                    color="brand.black"
                    fontSize="lg"
                  >
                    Mon
                  </Text>
                  <Text fontSize="md">10 AM - 2 PM</Text>
                </Box>

                <Box>
                  <Text
                    fontWeight="extrabold"
                    color="brand.black"
                    fontSize="lg"
                  >
                    Tue
                  </Text>
                  <Text fontSize="md">10 AM - 2 PM</Text>
                </Box>
                <Box>
                  <Text
                    fontWeight="extrabold"
                    color="brand.black"
                    fontSize="lg"
                  >
                    Sun
                  </Text>
                  <Text fontSize="md">10 AM - 2 PM</Text>
                </Box>
                <Box>
                  <Text
                    fontWeight="extrabold"
                    color="brand.black"
                    fontSize="lg"
                  >
                    Sun
                  </Text>
                  <Text fontSize="md">10 AM - 2 PM</Text>
                </Box>

                <Box>
                  <Text
                    fontWeight="extrabold"
                    color="brand.black"
                    fontSize="lg"
                  >
                    Sun
                  </Text>
                  <Text fontSize="md">10 AM - 2 PM</Text>
                </Box>
                <Box>
                  <Text
                    fontWeight="extrabold"
                    color="brand.black"
                    fontSize="lg"
                  >
                    Sun
                  </Text>
                  <Text fontSize="md">10 AM - 2 PM</Text>
                </Box>
              </Grid>
            </Flex>
          </Flex>
        </Flex>

        <Footer />
      </div>
    </>
  );
}
