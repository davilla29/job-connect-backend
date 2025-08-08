import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // It cannot be accessible by javascript and it prevents XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //Prevents an attack called csrf
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
