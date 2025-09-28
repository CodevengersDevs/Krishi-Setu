import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "Untitled Notification",
    },
    description: {
      type: String,
      default: "No description provided.",
    },
    type: {
      type: String,
      enum: ["Central", "State"],
      default: "Central",
    },
    state: {
      type: String,
      default: "All States",
    },
    issued_by: {
      type: String,
      default: "Unknown Authority",
    },
    date_issued: {
      type: Date,
      default: Date.now,
    },
    valid_till: {
      type: Date,
      default: null,
    },
    eligibility: {
      type: String,
      default: "Open for all.",
    },
    link: {
      type: String,
      default: "#",
    },
    tags: [
      {
        type: String,
        trim: true,
        default: undefined, 
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
