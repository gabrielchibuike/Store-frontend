/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AiOutlineBehance } from "react-icons/ai";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/utils/validationSchema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/lib/services/authEndPoint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormValues = z.infer<typeof signupSchema>;

function SignUp() {
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
    resolver: zodResolver(signupSchema),
  });

  const { mutateAsync: createAccMutation } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      setToastData({ description: data.message });
      setIsOpen(true);
      reset();
    },
    onError: (error: any) => {
      setToastData({ description: error?.message });
      setIsOpen(true);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createAccMutation({
      formInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <div className="w-full min-h-screen flex p-5">
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
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <p className="text-zinc-500">
              Please fill in your details to access your account.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <div className="w-full space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="w-full space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <p className="text-right text-sm underline text-primary cursor-pointer">
              Forget Password?
            </p>

            <Button
              disabled={isSubmitting}
              className="w-[400px] max-lg:w-full bg-primary py-4"
            >
              {isSubmitting ? "Verifying..." : "Sign Up"}
            </Button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-3 py-3">
            <p className="text-sm">Already have an account?</p>
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
          src="/login-image2.avif"
          width={500}
          height={500}
          alt="Signup Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignUp;
