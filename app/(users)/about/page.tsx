"use client";

import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "25+", label: "Years" },
    { value: "150+", label: "Stores" },
    { value: "100k+", label: "Customers" },
    { value: "35+", label: "Awards" },
    { value: "98%", label: "Satisfied" },
  ];

  const team = [
    {
      name: "Arlene McCoy",
      role: "Fashion Designer",
      image: "/images/team/1.jpg",
    },
    {
      name: "Bessie Cooper",
      role: "Founder & CEO",
      image: "/images/team/2.jpg",
    },
    {
      name: "Jenny Wilson",
      role: "Fashion Designer",
      image: "/images/team/3.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">About Us</span>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Our Story
          </h2>
          <h3 className="text-3xl font-bold mb-6">
            Crafted with Care: Fine Materials, Thoughtful Design
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="font-script text-2xl text-[#4A2B0F]">
            Jenny Wilson
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Jenny Wilson - CEO
          </div>
        </div>

        {/* Image Grid */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 gap-4 h-[500px]">
            <div className="bg-gray-200 rounded-lg h-full relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Image 1
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4 h-full">
              <div className="bg-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Image 2
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Image 3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#F5B041] py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-gray-200 h-[500px] rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Image
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Our Product Quality
              </h2>
              <h3 className="text-3xl font-bold">
                We Make Things Comfy, Pretty, and Fancy
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <div className="h-10 w-10 bg-[#F5B041]/20 rounded-full flex items-center justify-center text-[#F5B041]">
                    {/* Icon */}
                    <span className="font-bold">100%</span>
                  </div>
                  <h4 className="font-bold">100% Cotton</h4>
                  <p className="text-sm text-muted-foreground">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-10 w-10 bg-[#F5B041]/20 rounded-full flex items-center justify-center text-[#F5B041]">
                    {/* Icon */}
                    <span className="font-bold">Air</span>
                  </div>
                  <h4 className="font-bold">Breathable Fabric</h4>
                  <p className="text-sm text-muted-foreground">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Our Team
              </h2>
              <h3 className="text-3xl font-bold">Meet Our Team</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden group"
                >
                  <div className="aspect-[3/4] bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      {member.name}
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-bold text-lg">{member.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
