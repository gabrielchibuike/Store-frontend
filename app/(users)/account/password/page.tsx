"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/lib/services/accountService";
import { toast } from "sonner";

export default function PasswordPage() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const changeMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
      reset();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update password");
    },
  });

  const onSubmit = (data: any) => {
    changeMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  const newPassword = watch("newPassword");

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Password Manager</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">Old Password *</label>
          <div className="relative">
            <Input
              type={showOld ? "text" : "password"}
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              placeholder="Enter Old Password"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
            >
              {showOld ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-xs text-destructive">
              {errors.oldPassword.message as string}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            variant="link"
            type="button"
            className="text-[#4A2B0F] font-bold p-0 h-auto"
          >
            Forgot Password?
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">New Password *</label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter New Password"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
            >
              {showNew ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-destructive">
              {errors.newPassword.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm New Password *</label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              placeholder="Confirm New Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
            >
              {showConfirm ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="bg-[#4A2B0F] hover:bg-[#3A220B] px-8"
          disabled={changeMutation.isPending}
        >
          {changeMutation.isPending && (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          )}
          Update Password
        </Button>
      </form>
    </div>
  );
}
