"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const navItems = [
  { name: "Personal Information", href: "/account/profile" },
  { name: "My Orders", href: "/account/orders" },
  { name: "Manage Address", href: "/account/address" },
  // { name: "Payment Method", href: "/account/payment" },
  { name: "Password Manager", href: "/account/password" },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-6 py-4 text-sm font-medium transition-colors border rounded-md text-center",
            pathname === item.href
              ? "bg-[#F5B041] text-black border-[#F5B041]"
              : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50"
          )}
        >
          {item.name}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="px-6 py-4 text-sm font-medium transition-colors border rounded-md bg-white text-destructive border-gray-100 hover:bg-red-50 text-center"
      >
        Logout
      </button>
    </nav>
  );
}
