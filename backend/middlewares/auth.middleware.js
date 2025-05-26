import { User } from "../models/user.Schema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
export const isAdminAuthentication = catchAsyncErrors(
  async (req, resp, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
      return next(new ErrorHandler("Admin is not Authenticated", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resources`,
          403
        )
      );
    }
    next();
  }
);

export const isPatientAuthentication = catchAsyncErrors(
  async (req, resp, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("Patient is not Authenticated", 400));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resources`,
          403
        )
      );
    }
    next();
  }
);

export const isDoctor = catchAsyncErrors(async (req, resp, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandler("Patient is not Authenticated", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Doctor") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resources`,
        403
      )
    );
  }
  next();
});
