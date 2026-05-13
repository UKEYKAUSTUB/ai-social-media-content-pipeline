import jwt from "jsonwebtoken";
import User from "../model/User.js";

const protect = async (req, res, next) => {

  let token;

  // CHECK IF TOKEN EXISTS

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      // GET TOKEN FROM HEADER

      token = req.headers.authorization.split(" ")[1];

      // VERIFY TOKEN

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // GET USER FROM DATABASE

      req.user = await User.findById(decoded.id).select("-password");

      next();

    } catch (error) {

      res.status(401).json({
        message: "Not authorized, token failed",
      });

    }

  }

  // NO TOKEN

  if (!token) {

    res.status(401).json({
      message: "Not authorized, no token",
    });

  }
};

export default protect;