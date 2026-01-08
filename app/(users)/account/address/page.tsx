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
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  Address,
} from "@/lib/services/accountService";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Loader2, Trash2, Edit2 } from "lucide-react";

interface AddressFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  additionalInfo: string;
  city: string;
  state: string;
}

export default function AddressPage() {
  const queryClient = useQueryClient();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const {
    data: addresses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: getAddresses,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormValues>();

  useEffect(() => {
    if (editingAddress) {
      reset({
        firstName: editingAddress.firstName,
        lastName: editingAddress.lastName,
        phone: editingAddress.phone,
        email: editingAddress.email,
        streetAddress: editingAddress.streetAddress,
        additionalInfo: editingAddress.additionalInfo,
        city: editingAddress.city,
        state: editingAddress.state,
      });
      setIsAddingNew(true);
    } else {
      reset({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        streetAddress: "",
        additionalInfo: "",
        city: "",
        state: "",
      });
    }
  }, [editingAddress, reset]);

  const addMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      setIsAddingNew(false);
      reset();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to add address");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: AddressFormValues) =>
      updateAddress(editingAddress!._id, data),
    onSuccess: () => {
      toast.success("Address updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      setIsAddingNew(false);
      setEditingAddress(null);
      reset();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update address");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete address");
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    if (editingAddress) {
      updateMutation.mutate(data);
    } else {
      addMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Manage Address</h2>
        {!isAddingNew && (
          <Button
            className="bg-[#F5B041] text-black hover:bg-[#D49838]"
            onClick={() => {
              setEditingAddress(null);
              setIsAddingNew(true);
            }}
          >
            Add New Address
          </Button>
        )}
      </div>

      {isAddingNew ? (
        <div className="space-y-6 max-w-2xl border p-6 rounded-lg bg-white shadow-sm">
          <h3 className="font-bold text-lg">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name *</label>
                <Input
                  {...register("firstName", { required: "Required" })}
                  placeholder="Ex. John"
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name *</label>
                <Input
                  {...register("lastName", { required: "Required" })}
                  placeholder="Ex. Doe"
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  {...register("email", { required: "Required" })}
                  placeholder="Enter Email Address"
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone *</label>
                <Input
                  {...register("phone", { required: "Required" })}
                  placeholder="Enter Phone Number"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Street Address *</label>
              <Input
                {...register("streetAddress", { required: "Required" })}
                placeholder="Enter Street Address"
              />
              {errors.streetAddress && (
                <p className="text-xs text-destructive">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Info</label>
              <Input
                {...register("additionalInfo")}
                placeholder="Apt, Suite, etc."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City *</label>
                <Input
                  {...register("city", { required: "Required" })}
                  placeholder="Enter City"
                />
                {errors.city && (
                  <p className="text-xs text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State *</label>
                <Input
                  {...register("state", { required: "Required" })}
                  placeholder="Enter State"
                />
                {errors.state && (
                  <p className="text-xs text-destructive">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="bg-[#4A2B0F] hover:bg-[#3A220B]"
                disabled={addMutation.isPending || updateMutation.isPending}
              >
                {(addMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                {editingAddress ? "Update Address" : "Add Address"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingAddress(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid gap-6">
          {addresses && addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address._id}
                className="border rounded-lg p-6 bg-white space-y-4 hover:border-[#F5B041] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">
                      {address.firstName} {address.lastName}
                    </h3>
                    <div className="text-muted-foreground space-y-1 text-sm mt-2">
                      <p>{address.streetAddress}</p>
                      {address.additionalInfo && (
                        <p>{address.additionalInfo}</p>
                      )}
                      <p>
                        {address.city}, {address.state}
                      </p>
                      <p>
                        {address.phone} | {address.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setEditingAddress(address)}
                      className="text-primary hover:text-primary-foreground flex items-center gap-1 text-sm font-medium"
                    >
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this address?"
                          )
                        ) {
                          deleteMutation.mutate(address._id);
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="text-destructive hover:underline flex items-center gap-1 text-sm font-medium"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white border rounded-lg">
              <p className="text-muted-foreground">
                No addresses found. Add one to get started!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
