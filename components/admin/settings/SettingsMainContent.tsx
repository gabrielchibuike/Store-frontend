"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useSidebar } from "@/components/ui/sidebar";
import { ProfileSettings } from "./ProfileSettings";
import { EditProfileForm } from "./EditProfileForm";
import { LoginHistory } from "./LoginHistory";
import { ChangePassword } from "./ChangePassword";

export function SettingsMainContent() {
  const { state } = useSidebar();

  return (
    <main
      className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "ml-20" : "ml-72"
      }`}
    >
      <AdminHeader title="Settings" />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ProfileSettings />
          <LoginHistory />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <EditProfileForm />
          <ChangePassword />
        </div>
      </div>
    </main>
  );
}
