import { FormControl, FormLabel, Switch, Box, Button } from "@chakra-ui/react";
import Actions from "./Actions";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { Link } from "react-router-dom";

function Notifications() {
  const { user, setUser } = useContext(Context);
  const [receipt, setReceipt] = useState("");
  const [report, setReport] = useState("");

  const handleDownload = (fileUrl, fileName) => {
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.setAttribute("download", fileName);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          `     https://hospital-management-r7hc.onrender.com/api/v1/appointment/getOneAppointment/${user._id}`,
          { withCredentials: true }
        );
        setReport(data.appointments.reports.url);
        setReceipt(data.appointments.receipts.url);
        //console.log(data.appointments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointment();
  }, []);

  return (
    <Box>
      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormLabel
          htmlFor="notificationReceipt"
          mb={0}
          cursor="pointer"
          userSelect="none"
        >
          Download Fee Receipt
        </FormLabel>

        <Box my="3" className="profile" textAlign="right">
          <Button
            onClick={(e) => {
              handleDownload(receipt, "Receipt.pdf");
            }}
            style={{ border: "solid ", borderColor: "#0e8797" }}
            backgroundColor={"#0E8797"}
          >
            Download
          </Button>
        </Box>
      </FormControl>

      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <FormLabel
          htmlFor="notificationReceipt"
          mb={0}
          cursor="pointer"
          userSelect="none"
        >
          Download Lab Reports
        </FormLabel>

        <Box className="profile" textAlign="right">
          <Button
            onClick={(e) => {
              handleDownload(report, "Report.pdf");
            }}
            style={{ border: "solid ", borderColor: "#0e8797" }}
            backgroundColor={"#0E8797"}
          >
            Download
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}

export default Notifications;
