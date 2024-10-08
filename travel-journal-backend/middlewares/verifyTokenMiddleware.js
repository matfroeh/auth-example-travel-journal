import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
const verifyTokenMiddleware = (req, res, next) => {
  try {
    // const { headers: { authorization }} = req;
    const cookie = req.headers.cookie;
    if (!cookie) throw new ErrorResponse("Unauthorized", 401);

    const token = cookie.split("=")[1].split(";")[0]; 
    const secret = process.env.JWT_SECRET; // This will come from the server environment
    const { userId, userRole } = jwt.verify(token, secret); // Get the payload if verification is successful

    req.userId = userId; // Create property in request object
    req.userRole = userRole; 
    // console.log("Token verified by middleware of user:", userId);
    
    next(); // Call next handler
  } catch (e) {
    next(e);
  }
};

export default verifyTokenMiddleware;
