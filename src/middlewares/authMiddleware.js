// middleware/auth.js
import jwt from "jsonwebtoken";
import { Applicant } from "../models/Applicant.js";
import { Company } from "../models/Company.js";

export const verifyToken = async (req, res, next) => {
  // Checks token from cookie
  const token = req.cookies?.token;

  // If no token is present, deny access
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized! Kindly login" });

  try {
    //   Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If decoding fails, deny access
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });

    // Try to find the user in Applicant collection
    let user = await Applicant.findById(decoded.userId).select("-password");

    // If not found, try Company collection
    if (!user) {
      user = await Company.findById(decoded.userId).select("-password");
    }

    // If the user doesn't exist, deny access
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - user not found" });

    // Check if the user's password was changed after the token was issued
    if (user.passwordChangedAt) {
      const changedTimestamp = parseInt(
        user.passwordChangedAt.getTime() / 1000,
        10
      );
      if (decoded.iat < changedTimestamp) {
        return res.status(401).json({
          success: false,
          message: "Password was changed recently. Please log in again.",
        });
      }
    }

    // Attach the userId to the request object so it can be used in next middleware/controllers
    req.user = user;
    req.userId = decoded.userId;
    req.userRole = user.role;

    next();
  } catch (error) {
    // Catch any unexpected errors and respond with a server error
    console.log("Error in verifyToken ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const isCompany = (req, res, next) => {
  if (!req.userRole || req.userRole !== "company") {
    return res
      .status(403)
      .json({ message: "Only companies can perform this action" });
  }
  next();
};

export const isApplicant = (req, res, next) => {
  if (!req.userRole || req.userRole !== "applicant") {
    return res
      .status(403)
      .json({ message: "Only applicants can perform this action" });
  }
  next();
};
