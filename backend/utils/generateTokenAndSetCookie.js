import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie("token", token, {
    httpOnly: true, // XSS protection
    secure: process.env.NODE_ENV === "production",
    samesite: "strict", // cookie sent only in https
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return token;
};
