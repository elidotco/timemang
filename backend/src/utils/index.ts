import bcrypt from "bcrypt";
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // You can increase this for more secure hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// decrypt passwird for log in
