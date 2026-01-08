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
import { loginSchema } from "@/utils/validationSchema";
import { login, LoginDataType } from "@/lib/services/authEndPoint";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Store_Data, useAuth } from "@/context/AuthContext";
import { setStorageItem } from "@/utils/storage";

type FormValues = z.infer<typeof loginSchema>;

function SignIn() {
  const router = useRouter();
  const { setLoginData } = useAuth();

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
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setStorageItem(Store_Data, data.data!);
      setLoginData(data.data as LoginDataType);
      setToastData({ description: data.message });
      setIsOpen(true);
      reset();
      router.push("/");
    },
    onError: (error: any) => {
      setToastData({ description: error?.message });
      setIsOpen(true);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await loginMutation({
      formInfo: {
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
            <h1 className="text-2xl font-semibold">Sign In</h1>
            <p className="text-zinc-500">
              Please fill in your details to access your account.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

            <div className="flex justify-end">
              <Link
                href="/auth/forgetPassword"
                className="text-sm underline text-primary"
              >
                Forget Password?
              </Link>
            </div>

            <Button
              disabled={isPending}
              className="w-full bg-primary py-4 text-primary-foreground"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm">Don&apos;t have an account?</p>
            <Link
              href="/auth/signUp"
              className="text-sm underline text-primary"
            >
              Sign Up
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
          alt="Sign in image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignIn;
