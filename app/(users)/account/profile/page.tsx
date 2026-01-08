"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateProfile,
  UserProfile,
} from "@/lib/services/accountService";
import { Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

interface ProfileFormValues {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>();

  useEffect(() => {
    if (profile) {
      reset({
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        phone: profile.phone || "",
      });
    }
  }, [profile, reset]);

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    if (!isDirty) {
      toast.info("No changes made");
      return;
    }
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">
          Error loading profile. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Personal Information</h2>

      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden relative">
            {profile.profileImg ? (
              <img
                src={profile.profileImg}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Avatar
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 h-8 w-8 bg-[#4A2B0F] rounded-full flex items-center justify-center text-white hover:bg-[#3A220B]">
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name *</label>
            <Input
              {...register("firstname", { required: "First name is required" })}
              placeholder="First Name"
            />
            {errors.firstname && (
              <p className="text-xs text-destructive">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name *</label>
            <Input
              {...register("lastname", { required: "Last name is required" })}
              placeholder="Last Name"
            />
            {errors.lastname && (
              <p className="text-xs text-destructive">
                {errors.lastname.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email *</label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
            disabled // Email usually can't be changed easily
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone *</label>
          <Input
            type="tel"
            {...register("phone", { required: "Phone is required" })}
            placeholder="+1 234 567 890"
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="bg-[#4A2B0F] hover:bg-[#3A220B] px-8"
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Update Changes
        </Button>
      </form>
    </div>
  );
}
