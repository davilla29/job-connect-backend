import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    workMode: {
      type: String,
      enum: ["On-site", "Hybrid", "Remote"],
      default: "Onsite",
    },

    description: { type: String },
    salary: { type: String },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    resumeRequired: {
      type: Boolean,
      default: true,
    },

    availability: {
      type: Boolean,
      default: true, // true means job is open for applications
    },
    picture: {
      type: String, // Added a field for the job's picture (e.g., company logo)
      required: false,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
