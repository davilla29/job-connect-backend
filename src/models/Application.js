import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
      required: true,
    },
    resumeLink: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
    interview: {
      scheduled: { type: Boolean, default: false },
      date: { type: Date },
      location: { type: String }, 
      notes: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications to the same job
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);
