"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

interface CustomerHeaderProps {
  customer: any;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  const name = `${customer.firstname} ${customer.lastname}`;
  const status = customer.visible ? "Active" : "Inactive";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 overflow-hidden relative">
          {customer.profileImg ? (
            <Image
              src={customer.profileImg}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <Badge
              variant={customer.visible ? "default" : "secondary"}
              className={
                customer.visible
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }
            >
              {status}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Mail size={14} />
              {customer.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone size={14} />
              {customer.phone || "No phone provided"}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex gap-3">
        <Button variant="outline">Edit Profile</Button>
        <Button variant="destructive">Deactivate</Button>
      </div> */}
    </div>
  );
}
