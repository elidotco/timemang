// types.ts
export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  max_users: number | null;
  features: Record<string, boolean>;
}

export interface Company {
  id: number;
  name: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  subscription_plan_id: number;
  subscription_expires_at: string | null;
}

export interface UserProfile {
  id: string; // Supabase auth ID
  company_id: number;
  role: "admin" | "manager" | "employee";
}
