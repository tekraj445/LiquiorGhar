import { z } from "zod";

export const registerSchema = z.object({
  firstName      : z.string().min(2, "First name must be at least 2 characters"),
  lastName       : z.string().min(2, "Last name must be at least 2 characters"),
  email          : z.string().email("Invalid email address"),
  phone          : z.string().min(10, "Enter a valid phone number"),
  role           : z.enum(["user", "admin"]).default("user"), // ✅ ADD BHAYO
  address        : z.string().min(5, "Enter a valid address"),
  dob            : z.string().min(1, "Date of birth is required"),
  password       : z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms          : z.literal(true, { errorMap: () => ({ message: "You must agree to the terms" }) }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path   : ["confirmPassword"],
});