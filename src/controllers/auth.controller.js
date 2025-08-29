import { Applicant } from "../models/Applicant.js";
import { Company } from "../models/Company.js";
import bcryptjs from "bcryptjs";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

const DUMMY_PASSWORD_HASH =
  "$2a$10$CwTycUXWue0Thq9StjUM0uJ8axFzjcxgXmjKPqExE7hFl/jfD2N.G";

export const signup = async (req, res) => {
  // const { fName, lName, email, password, role } = req.body;
  const { role, email, password, fName, lName, cName } = req.body;

  try {
    // Check if email exists in Applicant or Company collections
    let emailAlreadyExists = null;
    if (role === "applicant") {
      emailAlreadyExists = await Applicant.findOne({ email });
    } else if (role === "company") {
      emailAlreadyExists = await Company.findOne({ email });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Role not provided" });
    }

    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10);

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
      });
    }

    // Saving to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Try to find the user in Applicant collection first
    let user = await Applicant.findOne({ email });

    // If not found, try Company collection
    if (!user) {
      user = await Company.findOne({ email });
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

    generateTokenAndSetCookie(res, user._id);
    // await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
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
