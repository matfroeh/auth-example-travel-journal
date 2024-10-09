import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyTokenMiddleware = asyncHandler(async (req, res, next) => {
  try {
    // const { headers: { authorization }} = req;
    let cookie = req.headers.cookie;
    // console.log("Cookie:", cookie);
    if (!cookie) throw new ErrorResponse("Unauthorized", 401);

    const token = cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("auth="))
      .split("=")[1];
    if (!token) throw new ErrorResponse("Unauthorized", 401);
    // console.log("Token:", token);

    const secret = process.env.JWT_SECRET; // This will come from the server environment
    const { userId, userRole } = jwt.verify(token, secret); // Get the payload if verification is successful
    if (!userId) throw new ErrorResponse("Unauthorized", 401);

    req.userId = userId; // Create property in request object
    req.userRole = userRole;

    next(); // Call next handler
  } catch (e) {
    next(e);
  }
});

export default verifyTokenMiddleware;
