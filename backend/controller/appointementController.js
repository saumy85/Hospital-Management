import { Appointment } from "../models/appointmentSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

import cloudinary from "cloudinary";
export const postAppointment = catchAsyncErrors(async (req, resp, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    appointmentDate,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Adhar ||
    !dob ||
    !gender ||
    !appointmentDate ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(
      new ErrorHandler("Provide valide details in appointement filed", 400)
    );
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("No doctor with this name exist!!", 400));
  }

  if (isConflict.length > 1) {
    return next(new ErrorHandler("Please contact through email or phone", 400));
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    appointmentDate,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  console.log(appointment);
  resp.status(200).send({
    success: true,
    message: "Appointment sent Successfully",
    appointment,
  });
});

export const getAllAppointment = catchAsyncErrors(async (req, resp, next) => {
  const appointment = await Appointment.find();
  resp.status(200).send({
    success: true,
    appointment,
  });
});

export const getUserAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const appointments = await Appointment.findOne({ patientId: id });
  res.status(200).send({
    success: true,
    appointments,
  });
});

export const getUserAppointmentById = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    const appointments = await Appointment.findOne({ _id: id });
    res.status(200).send({
      success: true,
      appointments,
    });
  }
);

export const updateAppointmentStatus = catchAsyncErrors(
  async (req, resp, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment is found", 400));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    resp.status(200).send({
      success: true,
      message: "Status Updated successfully",
      appointment,
    });
  }
);

// export const updateDocument = catchAsyncErrors(async (req, resp, next) => {
//   if (!req.files || Object.keys(req.files).length === 0)
//     return next(new ErrorHandler("Doctor Avatar Required!", 400));
//   const { report, receipt } = req.files;
//   const allowedFormats = ["application/pdf"];

//   if (report && !allowedFormats.includes(report.mimetype)) {
//     return next(new ErrorHandler("File format not supported", 400));
//   }
//   if (receipt && !allowedFormats.includes(receipt.mimetype)) {
//     return next(new ErrorHandler("File format not supported", 400));
//   }

//   const { id } = req.params;

//   const cloudinaryResponse1 = await cloudinary.uploader.upload(
//     report.tempFilePath
//   );
//   if (!cloudinaryResponse1 || cloudinaryResponse1.error) {
//     console.error(
//       "Clodinary Error:",
//       cloudinaryResponse1.error || "Unknown Cloudinary Error"
//     );
//   }

//   const cloudinaryResponse2 = await cloudinary.uploader.upload(
//     receipt.tempFilePath
//   );
//   if (!cloudinaryResponse2 || cloudinaryResponse2.error) {
//     console.error(
//       "Clodinary Error:",
//       cloudinaryResponse2.error || "Unknown Cloudinary Error"
//     );
//   }
//   console.log("Receipt:", !cloudinaryResponse2);
//   console.log("Reoprt:", cloudinaryResponse1);
//   const document = await Appointment.findByIdAndUpdate(
//     id,
//     {
//       reports: {
//         public_id: cloudinaryResponse1.public_id,
//         url: cloudinaryResponse1.secure_url,
//       },
//       receipts: {
//         public_id: cloudinaryResponse2.public_id,
//         url: cloudinaryResponse2.secure_url,
//       },
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );
//   if (document) {
//     resp.status(200).send({
//       success: true,
//       message: "Status updated successfully",
//       document,
//     });
//   } else {
//     console.log("Error in uploading");
//   }
// });

export const updateDocument = catchAsyncErrors(async (req, resp, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Files are required!", 400));
  }

  const { report, receipt } = req.files;
  const allowedFormats = ["application/pdf"];

  if (report && !allowedFormats.includes(report.mimetype)) {
    return next(new ErrorHandler("Report file format not supported", 400));
  }
  if (receipt && !allowedFormats.includes(receipt.mimetype)) {
    return next(new ErrorHandler("Receipt file format not supported", 400));
  }

  const { id } = req.params;

  let cloudinaryResponse1, cloudinaryResponse2;

  try {
    cloudinaryResponse1 = await cloudinary.uploader.upload(report.tempFilePath);
    if (cloudinaryResponse1.error) {
      throw new Error(cloudinaryResponse1.error.message);
    }
  } catch (error) {
    //console.log(error);
    return next(new ErrorHandler("Cloudinary Error: " + error.message, 500));
  }

  try {
    cloudinaryResponse2 = await cloudinary.uploader.upload(
      receipt.tempFilePath
    );
    if (cloudinaryResponse2.error) {
      throw new Error(cloudinaryResponse2.error.message);
    }
  } catch (error) {
    return next(new ErrorHandler("Cloudinary Error: " + error.message, 500));
  }

  try {
    const document = await Appointment.findByIdAndUpdate(
      id,
      {
        reports: {
          public_id: cloudinaryResponse1.public_id,
          url: cloudinaryResponse1.secure_url,
        },
        receipts: {
          public_id: cloudinaryResponse2.public_id,
          url: cloudinaryResponse2.secure_url,
        },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!document) {
      return next(new ErrorHandler("Appointment not found", 404));
    }

    resp.status(200).json({
      success: true,
      message: "Status updated successfully",
      document,
    });
  } catch (error) {
    return next(new ErrorHandler("Database Error: " + error.message, 500));
  }
});

// export const updateDocument = catchAsyncErrors(async (req, resp, next) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return next(new ErrorHandler("Doctor Avatar Required!", 400));
//   }

//   const { report, receipt } = req.files;
//   const allowedFormats = ["application/pdf"];

//   if (report && !allowedFormats.includes(report.mimetype)) {
//     return next(new ErrorHandler("File format not supported", 400));
//   }
//   if (receipt && !allowedFormats.includes(receipt.mimetype)) {
//     return next(new ErrorHandler("File format not supported", 400));
//   }

//   const { id } = req.params;

//   let cloudinaryResponse1, cloudinaryResponse2;

//   try {
//     cloudinaryResponse1 = await cloudinary.uploader.upload(report.tempFilePath);
//     if (!cloudinaryResponse1 || cloudinaryResponse1.error) {
//       return next(
//         new ErrorHandler(
//           "Cloudinary Error: " +
//             (cloudinaryResponse1.error || "Unknown Cloudinary Error"),
//           500
//         )
//       );
//     }
//   } catch (error) {
//     return next(new ErrorHandler("Cloudinary Error: " + error.message, 500));
//   }

//   try {
//     cloudinaryResponse2 = await cloudinary.uploader.upload(
//       receipt.tempFilePath
//     );
//     if (!cloudinaryResponse2 || cloudinaryResponse2.error) {
//       return next(
//         new ErrorHandler(
//           "Cloudinary Error: " +
//             (cloudinaryResponse2.error || "Unknown Cloudinary Error"),
//           500
//         )
//       );
//     }
//   } catch (error) {
//     return next(new ErrorHandler("Cloudinary Error: " + error.message, 500));
//   }

//   try {
//     const document = await Appointment.findByIdAndUpdate(
//       id,
//       {
//         reports: {
//           public_id: cloudinaryResponse1.public_id,
//           url: cloudinaryResponse1.secure_url,
//         },
//         receipts: {
//           public_id: cloudinaryResponse2.public_id,
//           url: cloudinaryResponse2.secure_url,
//         },
//       },
//       {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       }
//     );

//     if (!document) {
//       return next(new ErrorHandler("Document not found", 404));
//     }

//     resp.status(200).send({
//       success: true,
//       message: "Status updated successfully",
//       document,
//     });
//   } catch (error) {
//     return next(new ErrorHandler("Database Error: " + error.message, 500));
//   }
// });

export const deleteAppointment = catchAsyncErrors(async (req, resp, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment is found", 400));
  }
  await appointment.deleteOne();
  resp.status(200).send({
    success: true,
    message: "Appointed delelted successfully",
  });
});
