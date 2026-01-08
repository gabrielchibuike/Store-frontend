"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn, Controller } from "react-hook-form";
import { CheckoutFormData } from "@/app/(users)/checkout/page";

interface BillingFormProps {
  form: UseFormReturn<CheckoutFormData>;
}

export function BillingForm({ form }: BillingFormProps) {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = form;

  const useSameAddress = watch("useSameAddress");

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-lg">Billing Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name *</label>
          <Input
            placeholder="Ex. John"
            {...register("billingDetails.firstName")}
          />
          {errors.billingDetails?.firstName && (
            <p className="text-xs text-destructive">
              {errors.billingDetails.firstName.message as string}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name *</label>
          <Input
            placeholder="Ex. Doe"
            {...register("billingDetails.lastName")}
          />
          {errors.billingDetails?.lastName && (
            <p className="text-xs text-destructive">
              {errors.billingDetails.lastName.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email *</label>
        <Input
          placeholder="Enter Email Address"
          {...register("billingDetails.email")}
        />
        {errors.billingDetails?.email && (
          <p className="text-xs text-destructive">
            {errors.billingDetails.email.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Phone *</label>
        <Input
          placeholder="Enter Phone Number"
          {...register("billingDetails.phone")}
        />
        {errors.billingDetails?.phone && (
          <p className="text-xs text-destructive">
            {errors.billingDetails.phone.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Street Address *</label>
        <Input
          placeholder="Enter Street Address"
          {...register("billingDetails.streetAddress")}
        />
        {errors.billingDetails?.streetAddress && (
          <p className="text-xs text-destructive">
            {errors.billingDetails.streetAddress.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">City *</label>
          <Input
            placeholder="Enter City"
            {...register("billingDetails.city")}
          />
          {errors.billingDetails?.city && (
            <p className="text-xs text-destructive">
              {errors.billingDetails.city.message as string}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">State *</label>
          <Input
            placeholder="Enter State"
            {...register("billingDetails.state")}
          />
          {errors.billingDetails?.state && (
            <p className="text-xs text-destructive">
              {errors.billingDetails.state.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Zip Code *</label>
          <Input
            placeholder="Enter Zip Code"
            {...register("billingDetails.zipCode")}
          />
          {errors.billingDetails?.zipCode && (
            <p className="text-xs text-destructive">
              {errors.billingDetails.zipCode.message as string}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Country *</label>
          <Controller
            name="billingDetails.country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="ng">Nigeria</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.billingDetails?.country && (
            <p className="text-xs text-destructive">
              {errors.billingDetails.country.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <h2 className="font-bold text-lg">Shipping Address</h2>
        <div className="flex items-center space-x-2 p-1">
          <Controller
            name="useSameAddress"
            control={control}
            render={({ field }) => (
              // <Checkbox
              //   id="same-address"
              //   checked={field.value}
              //   onCheckedChange={field.onChange}
              // />
              <Checkbox
                id="same-address"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          <label
            htmlFor="same-address"
            className="text-sm font-medium cursor-pointer"
          >
            Same as billing address
          </label>
        </div>

        {!useSameAddress && (
          <div className="space-y-6 pt-4 animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Recipient First Name *
                </label>
                <Input
                  placeholder="Ex. Jane"
                  {...register("shippingAddress.firstName")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Recipient Last Name *
                </label>
                <Input
                  placeholder="Ex. Doe"
                  {...register("shippingAddress.lastName")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Shipping Street Address *
              </label>
              <Input
                placeholder="Enter Shipping Street Address"
                {...register("shippingAddress.streetAddress")}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">City *</label>
                <Input
                  placeholder="Enter City"
                  {...register("shippingAddress.city")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State *</label>
                <Input
                  placeholder="Enter State"
                  {...register("shippingAddress.state")}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
