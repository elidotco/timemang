import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/dbConnect"; // Import your supabase client setup

// Middleware to check if the user is authenticated
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"

    // Verify the JWT with Supabase
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    // Attach the user to the request object for future use in routes
    (req as any).user = user; // You can use this to access user details in other parts of your app

    // Proceed to the next middleware or route handler
    next();
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
