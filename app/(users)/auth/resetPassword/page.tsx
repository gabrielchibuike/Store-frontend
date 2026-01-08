/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AiOutlineBehance } from "react-icons/ai";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/lib/services/authEndPoint";
import { newPasswordSchema } from "@/utils/validationSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type FormValues = z.infer<typeof newPasswordSchema>;

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const [toastData, setToastData] = useState({
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(newPasswordSchema),
  });

  const { mutateAsync: resetPasswordMutation, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      setToastData({ description: data.message });
      setIsOpen(true);
      reset();
      router.push("/auth/signIn");
    },
    onError: (error: any) => {
      setToastData({ description: error?.message });
      setIsOpen(true);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!email || !otp) {
      setToastData({
        description: "Missing email or OTP. Please restart the process.",
      });
      setIsOpen(true);
      return;
    }

    await resetPasswordMutation({
      formInfo: {
        email,
        otp,
        password: data.password,
      },
    });
  };

  return (
    <div className="w-full h-screen flex p-5">
      <div className="w-full flex items-center">
        <div className="w-full space-y-10 px-28 max-lg:px-1">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <div className="w-12 h-12 bg-primary flex justify-center items-center rounded-full">
              <AiOutlineBehance className="text-3xl text-secondary" />
            </div>
            <h2 className="font-bold text-2xl">Clothing.</h2>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Set New Password</h1>
            <p className="text-zinc-500">
              Password must be at least 8 characters
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
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
          alt="Reset password image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ResetPassword;
