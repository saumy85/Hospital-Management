import {
  FormControl,
  FormLabel,
  Switch,
  Box,
  Button,
  Text,
  Input,
  Grid,
} from "@chakra-ui/react";
import Actions from "./Actions";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Notifications() {
  const [receipt, setReceipt] = useState("");
  const [report, setReport] = useState("");
  const patient_id = localStorage.getItem("patient_id");
  // const handleReceipt = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setReceipt(file);
  //   };
  // };

  // const handleReport = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setReport(file);
  //   };
  // };
  // const handleSubmit = async (e) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("report", report);
  //     formData.append("receipt", receipt);

  //     await axios
  //       .put(
  //         `http://localhost:4000/api/v1/appointment/updateDocument/${patient_id}`,
  //         formData,
  //         {
  //           withCredentials: true,
  //           headers: { "Content-Type": "multipart/form-data" },
  //         }
  //       )
  //       .then((res) => {
  //         toast.success("Document Uploaded Successfully");
  //       });
  //   } catch (error) {
  //     toast.error("Try Again");
  //     console.log(error);
  //   }
  // };

  const handleReport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setReport(file);
      };
    }
  };

  const handleReceipt = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setReceipt(file);
      };
    }
  };

  const handleSubmit = async (e) => {
    if (!report && !receipt) {
      toast.error("Both report and receipt are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("report", report);
      formData.append("receipt", receipt);

      const response = await axios.put(
        `http://localhost:4000/api/v1/appointment/updateDocument/${e}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Document Uploaded Successfully");
      }
    } catch (error) {
      toast.error("Try Again");
      console.log(error);
    }
  };

  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={8}
      >
        <FormControl id="report">
          <FormLabel>Upload Reports</FormLabel>
          <Input
            onChange={handleReport}
            width="auto"
            height="50px"
            fontSize="md"
            fontWeight="bold"
            borderColor="#0E8797"
            style={{
              border: "solid ",
              borderColor: "#0E8797",
              borderWidth: "2px",
            }}
            focusBorderColor="brand.green"
            type="file"
            p="2"
            // value={report}
          />
        </FormControl>
        <FormControl id="receipt">
          <FormLabel>Upload Receipt</FormLabel>
          <Input
            width="auto"
            height="50px"
            fontSize="md"
            fontWeight="bold"
            borderColor="#0E8797"
            style={{
              border: "solid ",
              borderColor: "#0E8797",
              borderWidth: "2px",
            }}
            focusBorderColor="brand.green"
            p="2"
            onChange={handleReceipt}
            type="file"
          />
        </FormControl>
      </Grid>
      <Grid
        shadow="lg"
        mt="50px"
        mb="2px"
        paddingBottom="6"
        width="100%"
        templateColumns="1fr 1fr"
        gap={6}
        alignItems="center"
      >
        <Box className="profile" gridColumn="1 / span 2" textAlign="center">
          <Button
            onClick={(e) => {
              handleSubmit(patient_id);
            }}
            style={{ border: "solid", borderColor: "#0e8797" }}
            backgroundColor={"#0E8797"}
          >
            Upload
          </Button>
        </Box>
      </Grid>
    </>
  );
}

export default Notifications;
