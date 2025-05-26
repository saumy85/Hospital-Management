import express from "express";
import {
  patientRegister,
  login,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  logOutAdmin,
  logOutPatient,
  addNewDoctor,
  updateUser,
  searchDoctor,
} from "../controller/userController.js";
import {
  isAdminAuthentication,
  isPatientAuthentication,
  isDoctor,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/patientregister", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthentication, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthentication, getUserDetails);
router.get("/patient/me", isPatientAuthentication, getUserDetails);
router.get("/doctor/me", isDoctor, getUserDetails);
router.get("/admin/logout", isAdminAuthentication, logOutAdmin);
router.get("/patient/logout", isPatientAuthentication, logOutPatient);
router.post("/doctor/addNew", isAdminAuthentication, addNewDoctor);
router.put("/update/:id", isPatientAuthentication, updateUser);
router.get("/search/:keyword", searchDoctor);
export default router;
