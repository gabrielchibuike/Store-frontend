"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { ProductDescription } from "./ProductDescription";
import { ProductCategories } from "./ProductCategories";
import { ProductPublish } from "./ProductPublish";
import { ProductGeneralInfo } from "./ProductGeneralInfo";
import { ProductGallery } from "./ProductGallery";
import { useSidebar } from "@/components/ui/sidebar";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  createProductFromUrl,
  createProducts,
} from "@/lib/services/productService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductFormValues, productSchema } from "@/lib/validations/product";

export function AdminAddProduct() {
  const { state } = useSidebar();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      tags: [],
      gender: "",
      quantity: "",
      color: [],
      size: [],
      price: "",
      discount: "",
      additionalInfo: "",
    },
  });

  const { mutate: createProductMutation, isPending } = useMutation({
    mutationFn: createProducts,
    onSuccess: () => {
      toast.success("Product created successfully");
      form.reset();
      // router.push("/admin/products");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create product");
    },
  });

  const { mutate: createAIProductMutation, isPending: isAIProductPending } =
    useMutation({
      mutationFn: createProductFromUrl,
      onSuccess: () => {
        toast.success("Product created successfully");
        form.reset();
        // router.push("/admin/products");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to create product");
      },
    });

  const onSubmit = (data: ProductFormValues) => {
    const formData = new FormData();

    const jsonData = {
      product_name: data.name,
      product_category: data.category,
      sub_category: data.subCategory,
      product_gender: data.gender,
      description: data.description,
      color: data.color,
      size: data.size,
      tags: data.tags,
      quantity: data.quantity,
      price: data.price,
      discount: data.discount || 0,
      additionalInfo: data.additionalInfo,
    };

    formData.append("jsonData", JSON.stringify(jsonData));

    if (data.images && data.images.length > 0) {
      data.images.forEach((image: File) => {
        formData.append("files", image);
      });
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    createProductMutation(formData);
  };

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen bg-accent/90 transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="Create Product" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <ProductDescription />
              <ProductCategories />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* <ProductPublish /> */}
              <ProductGeneralInfo />
              <ProductGallery />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-24"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-24 bg-primary text-white"
                  disabled={isPending}
                  onClick={() =>
                    createAIProductMutation(
                      "https://www.jumia.com.ng/men-clothing/"
                    )
                  }
                >
                  {isPending ? "Submitting..." : "Create AI Product"}
                </Button>
                <Button
                  type="submit"
                  className="w-24 bg-primary text-white"
                  disabled={isPending}
                >
                  {isPending ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
