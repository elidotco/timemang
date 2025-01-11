// services/authService.ts
import { User } from "@supabase/supabase-js";
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
