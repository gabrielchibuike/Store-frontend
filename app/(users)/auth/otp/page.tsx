"use client";

import { AiOutlineBehance } from "react-icons/ai";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function Otp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [toastData, setToastData] = useState({
    description: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const otpSchema = z.object({
    pin: z.string().length(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  type FormValues = z.infer<typeof otpSchema>;
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(otpSchema),
  });

  async function onSubmit(data: z.infer<typeof otpSchema>) {
    if (!email) {
      setToastData({ description: "Email is missing. Please start over." });
      setIsOpen(true);
      return;
    }
    router.push(`/auth/resetPassword?email=${email}&otp=${data.pin}`);
  }
  return (
    <>
      <div className="w-full h-screen flex  p-5">
        <div className="w-full flex  items-center ">
          <div className="w-full space-y-10 px-28 max-lg:px-1">
            <div className="flex items-center gap-1">
              <div className=" w-12 h-12 bg-primary flex justify-center items-center  rounded-full">
                <AiOutlineBehance className="text-3xl text-secondary" />
              </div>
              <h2 className="font-bold text-2xl">Clothing.</h2>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold space-y-2">Verify Code</h1>
              <p className="text- text-zinc-500">
                please enter the code we just sent to your email
              </p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="pin"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.pin && (
                <p className="text-red-500 text-sm">{errors.pin.message}</p>
              )}

              <Button
                disabled={isSubmitting}
                className=" !w-[400px] max-lg:!w-full !bg-primary !py-4 !text-primary-foreground"
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>
            </form>

            <div className="flex items-center justify-center gap-1  ">
              <p className="text-sm">Didn&apos;t recieve code?</p>
              <p className="text-sm underline text-primary cursor-pointer">
                Resend code
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-lg:hidden">
          <Image
            src={"/login2.avif"}
            width={500}
            height={500}
            alt=""
            className="  w-full h-full"
          />
        </div>
      </div>
    </>
  );
}

export default Otp;
