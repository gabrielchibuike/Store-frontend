/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AiOutlineBehance } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function SignIn() {
  return (
    <>
      <div className="w-full min-h-screen flex  p-5">
        <div className="w-full flex  items-center ">
          <div className="w-full space-y-10 px-28  max-lg:px-1">
            <div className="flex items-center gap-1">
              <div className=" w-12 h-12 bg-primary flex justify-center items-center  rounded-full">
                <AiOutlineBehance className="text-3xl text-secondary" />
              </div>
              <h2 className="font-bold text-2xl">Clothing.</h2>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold space-y-2">Sign In</h1>
              <p className="text- text-zinc-500">
                please fill your detail to access your account.
              </p>
            </div>

            <form className="space-y-5">
              <Label>Email</Label>
              <Input placeholder="Enter email address" />

              <Label>Password</Label>
              <Input placeholder="Enter password" />
              <div>
                <Link
                  href={"/auth/forgetPassword"}
                  className="flex justify-end text-sm underline text-primary"
                >
                  Forget Password?
                </Link>
              </div>

              <Button>SignIn</Button>
            </form>
            <div className="flex items-center justify-center gap-3  ">
              <p className="text-sm">Don&apos;t have an account?</p>
              <Link
                href={"/auth/signUp"}
                className="text-sm underline text-primary cursor-pointer"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[80%] max-lg:hidden">
          <Image
            src={"/loginImg.png"}
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

export default SignIn;
