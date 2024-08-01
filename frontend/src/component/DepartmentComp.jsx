import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
  Avatar,
  SimpleGrid,
  border,
} from "@chakra-ui/react";

const DepartmentPage = () => {
  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Box p={8} maxW="1200px" mx="auto">
      {/* Department Header */}
      <Flex w="100%" justifyContent="center" py={10} px={4}>
        <Box
          w="100%"
          direction="column"
          //   w={{ base: "90%" }}
          py={10}
          borderRadius="8px"
          boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
          mb={10}
          textAlign="center"
        >
          <Heading as="h1" size="2xl" mb={4}>
            Cardiology Department
          </Heading>
          <Text fontSize="lg" size="3xl" color="gray.600" mb={7}>
            Providing comprehensive cardiac care and services.
          </Text>
          <Image
            src="https://media.istockphoto.com/id/1367729537/vector/future-technologies-in-cardiology-and-healthcare-emerging-technologies-to-treat-heart.jpg?s=1024x1024&w=is&k=20&c=mJV-26m0nHW9PqLjDvzr-ct6F_Kg1nzqKgM6liDyRSo="
            alt="Department Image"
            borderRadius="lg"
            mb={10}
            mx="auto"
            w="60%"
          />
        </Box>
      </Flex>
      {/* Department Image */}

      {/* Department Services */}
      <Box
        p={10}
        borderRadius="8px"
        boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
        mb={10}
      >
        <Heading as="h2" size="xl" mb={4}>
          Services Offered
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box>
            <Heading as="h3" size="md" mb={2}>
              Cardiac Consultation
            </Heading>
            <Text>
              Providing expert consultations for heart-related issues.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" size="md" mb={2}>
              Electrocardiogram (ECG)
            </Heading>
            <Text>
              State-of-the-art ECG services for accurate heart monitoring.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" size="md" mb={2}>
              Echocardiography
            </Heading>
            <Text>Advanced echocardiography for detailed heart imaging.</Text>
          </Box>
          <Box>
            <Heading as="h3" size="md" mb={2}>
              Cardiac Surgery
            </Heading>
            <Text>
              Comprehensive cardiac surgery options for various conditions.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Department Doctors */}
      <Box
        p={10}
        borderRadius="8px"
        boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
        mb={10}
      >
        <Heading as="h2" size="xl" mb={4}>
          Our Doctors
        </Heading>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["medium", "small "]}
        >
          <VStack
            my="5"
            mx="3"
            borderRadius="15"
            py="30"
            p="10"
            _hover={{
              transform: "scale(1.1)",

              transition: "transform 0.1s ease-in-out",
            }}
            cursor="pointer"
            boxShadow="inset 0 0 10px  #0e8797"
          >
            <Avatar
              size="xl"
              name="Dr. John Doe"
              src="https://bit.ly/dan-abramov"
            />
            <Text fontWeight="bold">Dr. John Doe</Text>
            <Text>Cardiologist</Text>
          </VStack>
          <VStack
            my="5"
            mx="3"
            borderRadius="15"
            py="20"
            p="10"
            _hover={{
              transform: "scale(1.1)",

              transition: "transform 0.1s ease-in-out",
            }}
            cursor="pointer"
            boxShadow="inset 0 0 10px  #0e8797"
          >
            <Avatar
              size="xl"
              name="Dr. Jane Smith"
              src="https://bit.ly/prosper-baba"
            />
            <Text fontWeight="bold">Dr. Jane Smith</Text>
            <Text>Cardiac Surgeon</Text>
          </VStack>
          <VStack
            my="5"
            mx="3"
            borderRadius="15"
            py="20"
            p="10"
            _hover={{
              transform: "scale(1.1)",

              transition: "transform 0.1s ease-in-out",
            }}
            cursor="pointer"
            boxShadow="inset 0 0 10px  #0e8797"
          >
            <Avatar
              size="xl"
              name="Dr. Jane Smith"
              src="https://bit.ly/prosper-baba"
            />
            <Text fontWeight="bold">Dr. Jane Smith</Text>
            <Text>Cardiac Surgeon</Text>
          </VStack>
          <VStack
            mx="3"
            my="5"
            borderRadius="15"
            py="20"
            p="10"
            _hover={{
              transform: "scale(1.1)",

              transition: "transform 0.1s ease-in-out",
            }}
            cursor="pointer"
            boxShadow="inset 0 0 10px  #0e8797"
          >
            <Avatar
              size="xl"
              name="Dr. Jane Smith"
              src="https://bit.ly/prosper-baba"
            />
            <Text fontWeight="bold">Dr. Jane Smith</Text>
            <Text>Cardiac Surgeon</Text>
          </VStack>
          <VStack
            mx="3"
            my="5"
            borderRadius="15"
            py="20"
            p="10"
            _hover={{
              transform: "scale(1.1)",

              transition: "transform 0.1s ease-in-out",
            }}
            cursor="pointer"
            boxShadow="inset 0 0 10px  #0e8797"
          >
            <Avatar
              size="xl"
              name="Dr. Jane Smith"
              src="https://bit.ly/prosper-baba"
            />
            <Text fontWeight="bold">Dr. Jane Smith</Text>
            <Text>Cardiac Surgeon</Text>
          </VStack>
          <VStack
            mx="3"
            my="5"
            borderRadius="15"
            py="20"
            p="10"
            _hover={{
              transform: "scale(1.1)",

              transition: "transform 0.1s ease-in-out",
            }}
            cursor="pointer"
            boxShadow="inset 0 0 10px 
    #0e8797"
          >
            <Avatar
              size="xl"
              name="Dr. Jane Smith"
              src="https://bit.ly/prosper-baba"
            />
            <Text fontWeight="bold">Dr. Jane Smith</Text>
            <Text>Cardiac Surgeon</Text>
          </VStack>
        </Carousel>

        {/* <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
         
        </SimpleGrid> */}
      </Box>

      {/* Department Contact Information */}
      <Box
        p="10"
        boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
        textAlign="center"
      >
        <Heading as="h2" size="xl" mb={4}>
          Contact Us
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={2}>
          For appointments and inquiries, please contact us at:
        </Text>
        <Text fontSize="lg" color="gray.600" mb={2}>
          Email: cardiology@hospital.com
        </Text>
        <Text fontSize="lg" color="gray.600" mb={2}>
          Phone: (123) 456-7890
        </Text>
        <Text fontSize="lg" color="gray.600">
          Address: 123 Heart Street, Healthy City, Wellness State, 45678
        </Text>
      </Box>
    </Box>
  );
};

export default DepartmentPage;
