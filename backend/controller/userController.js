import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";
export const patientRegister = catchAsyncErrors(async (req, resp, next) => {
  const { firstName, lastName, email, phone, Adhar, dob, gender, password } =
    req.body;
  // console.log(firstName, lastName, email, phone, Adhar, dob, gender, password);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Adhar ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    password,
    role: "Patient",
  });
  generateToken(user, "Patient registered successfully", 200, resp);
  //   resp.status(200).send({
  //     success: true,
  //     message: "Patient registered successfully",
  //     user,
  //   });
});

export const login = catchAsyncErrors(async (req, resp, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Passowrd and confirm password do not match", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalide login credentials", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalide Password Or Email", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with this role is not found", 400));
  }
  generateToken(user, "User logged in Successfully", 200, resp);
  //   resp.status(200).send({
  //     success: true,
  //     message: "User logged in Successfully",
  //   });
});

export const addNewAdmin = catchAsyncErrors(async (req, resp, next) => {
  const { firstName, lastName, email, phone, Adhar, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Adhar ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Admin with this email already exist", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    password,
    role: "Admin",
  });
  resp.status(200).send({
    success: true,
    message: "New Admin is added",
    user,
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, resp, next) => {
  const doctors = await User.find({ role: "Doctor" });
  resp.status(200).send({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, resp, next) => {
  const user = req.user;
  console.log(user);
  resp.status(200).send({
    success: true,
    user,
  });
});

export const logOutAdmin = catchAsyncErrors(async (req, resp, next) => {
  resp
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .send({
      success: true,
      message: "User log Out successfully!!",
    });
});

export const logOutPatient = catchAsyncErrors(async (req, resp, next) => {
  resp
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: true,
      sameSite: "None",
    })
    .send({
      success: true,
      message: "Patient log Out successfully!!",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, resp, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  const { docAvatar } = req.files;
  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp,",
    "image/webp,",
  ];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !Adhar ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please provide valide doctor details", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email`,
        400
      )
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Clodinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    Adhar,
    dob,
    gender,
    password,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  resp.status(200).send({
    success: true,
    message: "New Doctor is registered",
    doctor,
  });
});

export const updateUser = catchAsyncErrors(async (req, resp, next) => {
  const { id } = req.params;
  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User is found", 400));
  }
  user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  resp.status(200).send({
    success: true,
    message: "Status Updated successfully",
    user,
  });
});

export const searchDoctor = async (req, resp) => {
  try {
    const { keyword } = req.params;
    if (!keyword) {
      const result = await User.find({
        role: "Doctor",
      });
      resp.status(200).send({
        success: true,
        result,
      });
    } else {
      const result = await User.find({
        role: "Doctor",
        $or: [
          { firstName: { $regex: keyword, $options: "i" } },
          { lastName: { $regex: keyword, $options: "i" } },
          { doctorDepartment: { $regex: keyword, $options: "i" } },
        ],
      });
      resp.status(200).send({
        success: true,
        result,
      });
    }
  } catch (error) {
    resp.status(400).send({
      success: false,
      message: "Error in Search API",
      error,
    });
  }
};
