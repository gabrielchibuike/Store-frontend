import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  subCategory: z.string().min(1, {
    message: "Please select a sub-category.",
  }),
  gender: z.string().min(1, {
    message: "Please select a gender.",
  }),
  tags: z.array(z.string()).default([]),
  color: z.array(z.string()).default([]),
  size: z.array(z.string()).default([]),
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Quantity must be a valid number.",
    }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Price must be a valid number.",
  }),
  discount: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100),
      {
        message: "Discount must be between 0 and 100.",
      }
    ),
  images: z.any().optional(),
  additionalInfo: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
