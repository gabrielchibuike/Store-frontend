"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, ShoppingBag, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface CustomerOverviewProps {
  customer: any;
}

export function CustomerOverview({ customer }: CustomerOverviewProps) {
  const primaryAddress = customer.address?.[0];
  const addressString = primaryAddress
    ? `${primaryAddress.street}, ${primaryAddress.city}, ${primaryAddress.state}, ${primaryAddress.postalCode}, ${primaryAddress.country}`
    : "No address provided";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Address</div>
              <div className="text-sm text-gray-500">{addressString}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              <Calendar size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Join Date</div>
              <div className="text-sm text-gray-500">
                {customer.dateCreated
                  ? format(new Date(customer.dateCreated), "MMM dd, yyyy")
                  : "N/A"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <ShoppingBag size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Total Orders
              </div>
              <div className="text-sm text-gray-500">
                {customer.totalOrders}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <DollarSign size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Total Spent
              </div>
              <div className="text-sm text-gray-500">
                ${(customer.totalSpent || 0).toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
