// controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import {
  createUser,
  createCompany,
  createUserProfile,
  LogUserIn,
} from "../services/authServices";

export const companySignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, companyDetails } = req.body;

  try {
    // Create user in Supabase authentication
    const user = await createUser(email, password);
    if (!user) {
      return res.status(400).json({ error: "User creation failed" });
    }

    // Create company in the database
    const company = await createCompany(companyDetails);

    // Create the user profile with role 'admin' by default
    const userProfile = await createUserProfile(user.id, company.id);

    // Return the created company and user profile details

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
      company,
      userProfile,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Log the user IN
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const { user, session } = await LogUserIn(email, password);
    res.status(200).json({
      message: "Login successful",
      user,
      session,
    });
    console.log(user);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("hello");
  }
};
