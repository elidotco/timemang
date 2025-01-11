// services/authService.ts
import { supabase } from "../config/dbConnect";

export const createUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

export const createCompany = async (companyDetails: {
  companyName: string;
  companyAddress: string;
  contactEmail: string;
  contactPhone: string;
  subscriptionPlanId: number;
}) => {
  const {
    companyName,
    companyAddress,
    contactEmail,
    contactPhone,
    subscriptionPlanId,
  } = companyDetails;

  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyName,
        address: companyAddress,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        subscription_plan_id: subscriptionPlanId,
        subscription_expires_at: null, // Optional, based on your business logic
      },
    ])
    .select()
    .single();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

export const createUserProfile = async (userId: string, companyId: number) => {
  const { data, error } = await supabase
    .from("users")
    .upsert([
      {
        user_id: userId,
        company_id: companyId,
        role: "admin", // Default role is admin
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const LogUserIn = async (
  email: string,
  password: string
): Promise<{ user: any; session: any }> => {
  try {
    // Call Supabase to sign in the user with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Handle errors returned by Supabase
    if (error) {
      throw new Error(error.message);
    }

    // Check if user and session data exist
    if (!data.user || !data.session) {
      throw new Error("Authentication failed. Please try again.");
    }

    // Return user and session data on success
    return {
      user: data.user,
      session: data.session,
    };
  } catch (err: any) {
    // Log error for debugging and throw it to the caller
    console.error("Login error:", err.message);
    throw new Error(err.message || "An unknown error occurred during login.");
  }
};

export const logUserOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    throw new Error(error.message);
  }

  console.log("User logged out successfully");
};
