import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    address: { type: String },
    education: { type: String },
    skills: { type: [String] },
    experience: { type: String },
    profilePictureURL: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${
          this.fName || "User"
        }&background=random`;
      },
    },

    role: { type: String, default: "applicant" },
    resumeLink: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export const Applicant = mongoose.model("Applicant", applicantSchema);
