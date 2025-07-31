import { z } from "zod";

// Contact information schema
export const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(1, "Please select a state"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
});

// Payment information schema
export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(19, "Please enter a complete card number")
    .regex(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      "Card number must be in format: 1234 5678 9012 3456"
    )
    .refine((val) => {
      // Luhn algorithm validation
      const digits = val.replace(/\D/g, "");
      if (digits.length !== 16) return false;

      let sum = 0;
      let isEven = false;

      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = Number.parseInt(digits[i]);

        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }

        sum += digit;
        isEven = !isEven;
      }

      return sum % 10 === 0;
    }, "Please enter a valid card number"),

  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .refine((val) => {
      const [month, year] = val.split("/");
      const expiry = new Date(
        2000 + Number.parseInt(year),
        Number.parseInt(month) - 1
      );
      const now = new Date();
      return expiry > now;
    }, "Card has expired"),

  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits")
    .regex(/^\d+$/, "CVV must contain only numbers"),
});

// Complete checkout schema
export const checkoutSchema = contactSchema.merge(paymentSchema);

// Search schema
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Please enter a search term")
    .max(100, "Search term is too long"),
});

// Newsletter signup schema
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// User registration schema
export const registrationSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Type exports
export type ContactFormData = z.infer<typeof contactSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type ContactFormFormData = z.infer<typeof contactFormSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
