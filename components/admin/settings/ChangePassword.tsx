"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ChangePassword() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-6">Change Password</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            Current Password
          </Label>
          <Input
            type="password"
            placeholder="........"
            className="bg-gray-50 border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            New Password
          </Label>
          <Input
            type="password"
            placeholder="Enter New Password"
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            Repeat New Password
          </Label>
          <Input
            type="password"
            placeholder="Repeat New Password"
            className="bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Change Password
        </Button>
      </div>
    </div>
  );
}
