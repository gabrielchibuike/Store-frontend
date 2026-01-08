"use client";

import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Contact Us</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name *</label>
                    <Input placeholder="Ex. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input type="email" placeholder="example@gmail.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject *</label>
                  <Input placeholder="Enter Subject" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Message *</label>
                  <Textarea
                    placeholder="Enter here..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button className="bg-[#4A2B0F] hover:bg-[#3A220B] px-8">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-8 rounded-lg space-y-8">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Address</h3>
                <p className="text-muted-foreground flex gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0" />
                  4517 Washington Ave. Manchester, Kentucky 39495
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Contact</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    Phone : +0123-456-789
                  </p>
                  <p className="flex gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    Email : example@gmail.com
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Open Time</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex gap-3">
                    <Clock className="h-5 w-5 flex-shrink-0" />
                    Monday - Friday : 10:00 - 20:00
                  </p>
                  <p className="pl-8">Saturday - Sunday : 11:00 - 15:00</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Stay Connected</h3>
                <div className="flex gap-4">
                  {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="h-10 w-10 bg-[#F5B041] rounded-full flex items-center justify-center hover:bg-[#D49838] transition-colors"
                    >
                      <Icon className="h-5 w-5 text-black" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-[400px] bg-gray-200 w-full relative">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Map Placeholder
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
