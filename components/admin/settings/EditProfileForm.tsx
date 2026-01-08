"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function EditProfileForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-6">Edit Profile</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            First Name
          </Label>
          <Input placeholder="Dusan" className="bg-gray-50 border-gray-200" />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            Last Name
          </Label>
          <Input placeholder="K" className="bg-gray-50 border-gray-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            Phone Number
          </Label>
          <Input
            placeholder="+123464999123"
            className="bg-gray-50 border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            Email Address
          </Label>
          <Input
            placeholder="dusank@email.com"
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            City
          </Label>
          <Select defaultValue="california">
            <SelectTrigger className="bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="california">California</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            Postal Code
          </Label>
          <Select>
            <SelectTrigger className="bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select Your Postal Code" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90001">90001</SelectItem>
              <SelectItem value="10001">10001</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            Country
          </Label>
          <Select defaultValue="usa">
            <SelectTrigger className="bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-500 uppercase">
            Website
          </Label>
          <Input
            placeholder="dusank.com"
            className="bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <Label className="text-xs font-bold text-gray-500 uppercase">
          About Me
        </Label>
        <Textarea
          placeholder="Text"
          className="bg-gray-50 border-gray-200 min-h-[100px]"
        />
      </div>

      <div className="flex justify-end">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Update Profile
        </Button>
      </div>
    </div>
  );
}
