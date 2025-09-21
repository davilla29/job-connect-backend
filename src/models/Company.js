import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cName: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    industry: { type: String },
    profilePictureURL: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${
          this.cName || "company"
        }&background=random`;
      },
    },
    role: { type: String, default: "company" },
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
