import express from "express";
import {
  deleteAppointment,
  getAllAppointment,
  postAppointment,
  getUserAppointment,
  updateAppointmentStatus,
  getUserAppointmentById,
  updateDocument,
} from "../controller/appointementController.js";
import {
  isAdminAuthentication,
  isPatientAuthentication,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuthentication, postAppointment);
router.get("/getAppointment", isAdminAuthentication, getAllAppointment);
router.get(
  "/getOneAppointment/:id",
  isPatientAuthentication,
  getUserAppointment
);
router.get(
  "/getOneAppointmentAdmin/:id",
  isAdminAuthentication,
  getUserAppointmentById
);

router.put("/update/:id", isAdminAuthentication, updateAppointmentStatus);

router.put("/updateDocument/:id", isAdminAuthentication, updateDocument);

router.delete("/delete/:id", isAdminAuthentication, deleteAppointment);

export default router;
