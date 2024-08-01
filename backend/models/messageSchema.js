import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be of at leat 3 character"],
    },

    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last name must be of at leat 3 character"],
    },

    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valide email"],
    },
    phone: {
      type: String,
      required: true,
      minLength: [10, "phone no. must be of at leat 11 characters"],
      maxLength: [10, "phone no. at most have 11 characters"],
    },

    message: {
      type: String,
      required: true,
      minLength: [10, "Message must be of at leat 10 characters"],
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
