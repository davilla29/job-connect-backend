import { Applicant } from "../models/Applicant.js";
import { Company } from "../models/Company.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../mail/emailService.js";

const DUMMY_PASSWORD_HASH =
  "$2a$10$CwTycUXWue0Thq9StjUM0uJ8axFzjcxgXmjKPqExE7hFl/jfD2N.G";

const isProduction = process.env.NODE_ENV === "production";

export const signup = async (req, res) => {
  // const { fName, lName, email, password, role } = req.body;
  const { role, email, password, fName, lName, cName } = req.body;

  try {
    // Check if email exists in either Applicant or Company collections
    const applicantExists = await Applicant.findOne({ email });
    const companyExists = await Company.findOne({ email });

    if (applicantExists || companyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // // Check if email exists in Applicant or Company collections
    // let emailAlreadyExists = null;
    // if (role === "applicant") {
    //   emailAlreadyExists = await Applicant.findOne({ email });
    // } else if (role === "company") {
    //   emailAlreadyExists = await Company.findOne({ email });
    // } else {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Role not provided" });
    // }

    // if (emailAlreadyExists) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "User already exists" });
    // }

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // OTP
    const verificationToken = generateVerificationCode();
    const hashedVerificationToken = await bcryptjs.hash(verificationToken, 10);

    // Creating new user based on role provided
    let newUser;

    if (role === "applicant") {
      if (!fName || !lName) {
        return res.status(400).json({
          success: false,
          message: "First name and last name are required for applicants",
        });
      }
      newUser = new Applicant({
        fName,
        lName,
        email,
        password: hashedPassword,
        role,
        verificationToken: hashedVerificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
      });
    } else if (role === "company") {
      if (!cName) {
        return res.status(400).json({
          success: false,
          message: "Company name is required for companys",
        });
      }
      newUser = new Company({
        cName,
        email,
        password: hashedPassword,
        role,
        verificationToken: hashedVerificationToken,
        verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000, // Expires in 15 minutes
      });
    }

    // Saving to the database
    await newUser.save();

    try {
      await sendVerificationEmail(
        newUser.email,
        role === "applicant"
          ? `${newUser.fName} ${newUser.lName}`
          : newUser.cName,
        verificationToken
      );
    } catch (error) {
      console.error("Failed to send verification email:", error);
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
        verificationToken: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  // const { code } = req.body;
  const { code, email } = req.body;

  try {
    const applicantUser = await Applicant.findOne({
      email,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    const companyUser = await Company.findOne({
      email,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!applicantUser && !companyUser) {
      return res.status(400).json({
        success: false,
        message: "User not found or token expired",
      });
    }

    const user = applicantUser || companyUser;

    const isTokenValid = await bcryptjs.compare(code, user.verificationToken);

    if (!isTokenValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // Sending welcome email
    try {
      await sendWelcomeEmail(
        user.email,
        user.role === "applicant" ? `${user.fName} ${user.lName}` : user.cName
      );
    } catch (error) {
      console.error("Failed to send welcome email:", error);
    }

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
        isVerified: user.isVerified,
        isWelcomeEmailSent: user.isWelcomeEmailSent,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const resendCode = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    let user;
    let role;

    const applicantUser = await Applicant.findOne({ email });
    const companyUser = await Company.findOne({ email });

    if (!applicantUser && !companyUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (applicantUser) {
      if (applicantUser.isVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }
      user = applicantUser;
      role = "applicant";
    } else if (companyUser) {
      if (companyUser.isVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }
      user = companyUser;
      role = "company";
    }

    // Generate and hash new token
    const verificationToken = generateVerificationCode();
    const hashedVerificationToken = await bcryptjs.hash(verificationToken, 10);

    console.log("Verification code:", verificationToken);

    // Send email
    try {
      await sendVerificationEmail(
        user.email,
        role === "applicant" ? `${user.fName} ${user.lName}` : user.cName,
        verificationToken
      );

      // Only return success if email actually sent
      return res.status(200).json({
        success: true,
        message:
          "Email has been sent. Please check your inbox and spam folder.",
      });
    } catch (error) {
      console.error("Failed to send verification email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
        error: error.message,
      });
    }

    // Save token and expiry to user
    user.verificationToken = hashedVerificationToken;
    user.verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // res.status(200).json({ message: "Verification code resent successfully" });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Try to find the user in Applicant collection first
    let user = await Applicant.findOne({ email });
    let userType = "applicant";

    // If not found, try Company collection
    if (!user) {
      user = await Company.findOne({ email });
      userType = "company";
    }

    // If user still not found, do dummy compare and return error
    if (!user) {
      await bcryptjs.compare(password || "", DUMMY_PASSWORD_HASH);
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Checking if the password inputted by the user is the same as that in the database
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // To check if the user is verified
    if (!user.isVerified) {
      // // Generate a new code
      // const rawToken = crypto.randomBytes(3).toString("hex"); // 6-digit code
      // const hashedToken = await bcryptjs.hash(rawToken, 10);

      // To generate a new OTP and hash it before storing in the database
      const verificationToken = generateVerificationCode();
      const hashedVerificationToken = await bcryptjs.hash(
        verificationToken,
        10
      );

      user.verificationToken = hashedVerificationToken;
      user.verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mins
      await user.save();

      console.log(verificationToken);

      // Send verification code
      try {
        const displayName =
          userType === "applicant" ? `${user.fName} ${user.lName}` : user.cName;
        await sendVerificationEmail(user.email, displayName, verificationToken);
      } catch (error) {
        console.error("Failed to send verification email:", error);
      }

      return res.status(403).json({
        success: false,
        message:
          "Email not verified. Check your email or spam folder for the verification code.",
        needVerification: true,
      });
    }

    // To check if welcome email has been sent
    if (!user.isWelcomeEmailSent) {
      try {
        await sendWelcomeEmail(
          user.email,
          userType === "applicant" ? `${user.fName} ${user.lName}` : user.cName
        );
        user.isWelcomeEmailSent = true;
        await user.save();
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    }

    generateTokenAndSetCookie(res, user._id);
    // await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
        isVerified: user.isVerified,
        isWelcomeEmailSent: user.isWelcomeEmailSent,
      },
    });
    console.log(user);
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    let user;

    const applicantUser = await Applicant.findOne({ email });
    const companyUser = await Company.findOne({ email });

    if (!applicantUser && !companyUser) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset link has been sent.",
      });
    }
    // Pick whichever user exists
    user = applicantUser || companyUser;

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store the generated token in hashed version to the database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email with the link in it
    try {
      await sendPasswordResetEmail(
        user.email,
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`
      );

      // Only return success if email actually sent
      return res.status(200).json({
        success: true,
        message:
          "If that email exists, a reset link has been sent. Check your inbox or spam folder.",
      });
    } catch (error) {
      console.error("Password reset email error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send reset email. Please try again later.",
        error: error.message, // optional
      });
    }
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  }

  try {
    // Hash the token from URL
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    // console.log("Raw token:", token);
    // console.log("Hashed token:", hashedToken);

    // Search both models for user with valid token
    let user =
      (await Applicant.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpiresAt: { $gt: Date.now() },
      })) ||
      (await Company.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpiresAt: { $gt: Date.now() },
      }));

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset tokenn",
      });
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update and clear reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    user.passwordChangedAt = Date.now();

    await user.save();

    // Send success email
    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.log("Error in resetPassword:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    let user = await Applicant.findById(req.userId).select("-password");

    if (!user) {
      user = await Company.findById(req.userId).select("-password");
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
