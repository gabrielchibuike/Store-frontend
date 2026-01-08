/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AiOutlineBehance } from "react-icons/ai";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { forgetPassword } from "@/lib/services/authEndPoint";
import { forgetPasswordSchema } from "@/utils/validationSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof forgetPasswordSchema>;

function ForgetPassword() {
  const [toastData, setToastData] = useState({
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const { mutateAsync: forgetPasswordMutation, isPending } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data, variables) => {
      setToastData({ description: data.message });
      setIsOpen(true);
      reset();
      router.push(`/auth/otp?email=${variables.formInfo.email}`);
    },
    onError: (error: any) => {
      setToastData({ description: error?.message });
      setIsOpen(true);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await forgetPasswordMutation({
      formInfo: {
        email: data.email,
      },
    });
  };

  return (
    <div className="w-full h-screen flex p-5">
      <div className="w-full flex items-center">
        <div className="w-full space-y-8 px-28 max-lg:px-1">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <div className="w-12 h-12 bg-primary flex justify-center items-center rounded-full">
              <AiOutlineBehance className="text-3xl text-secondary" />
            </div>
            <h2 className="font-bold text-2xl">Clothing.</h2>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Forget Password?</h1>
            <p className="text-zinc-500">
              Don&apos;t worry, we&apos;ll send you reset instructions.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <Button
              disabled={isPending}
              className="w-full bg-primary py-4 text-primary-foreground"
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-1">
            <p className="text-sm">Remember your password?</p>
            <Link
              href="/auth/signIn"
              className="text-sm underline text-primary"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="w-[80%] max-lg:hidden">
        <Image
          src="/loginImg.png"
          width={500}
          height={500}
          alt="Forget password image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ForgetPassword;
