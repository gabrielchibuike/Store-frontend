"use client";

import { Camera } from "lucide-react";

export function ProfileSettings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-6">My Profile</h3>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-xl border-2 border-white shadow-sm">
            DK
          </div>
          <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full border-2 border-white shadow-sm hover:bg-orange-600 transition-colors">
            <Camera size={12} />
          </button>
        </div>
        <div>
          <div className="font-bold text-gray-900">Dusan K.</div>
          <div className="text-xs text-gray-500 uppercase">ADMIN</div>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-gray-500 uppercase text-xs font-bold">
            Full Name :
          </span>
          <span className="font-medium text-gray-900">Dusan K.</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-gray-500 uppercase text-xs font-bold">
            Mobile :
          </span>
          <span className="font-medium text-gray-900">+123464999123</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-gray-500 uppercase text-xs font-bold">
            E-mail :
          </span>
          <span className="font-medium text-gray-900">dusank@email.com</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b last:border-0">
          <span className="text-gray-500 uppercase text-xs font-bold">
            Location :
          </span>
          <span className="font-medium text-gray-900">
            California, United States
          </span>
        </div>
      </div>
    </div>
  );
}
