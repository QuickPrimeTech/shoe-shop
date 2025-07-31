import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" }),
  rating: z.object({
    rate: z
      .number()
      .min(0, "Rating must be at least 0")
      .max(5, "Rating can't exceed 5")
      .positive("Rating must be positive"),
    count: z.number().positive("Rating count must be positive"),
  }),
});

export type ProductFormData = z.infer<typeof productSchema>;
