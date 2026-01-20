"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-secondary/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="relative flex flex-col lg:flex-row justify-between items-center gap-8 mb-20 bg-primary p-8 md:p-14 rounded-[2.5rem] shadow-2xl shadow-primary/20 overflow-hidden group">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 text-center lg:text-left space-y-3">
            <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">
              Join Our Newsletter <br className="hidden md:block" /> & Get{" "}
              <span className="italic text-secondary">20% Off</span>
            </h3>
            <p className="text-primary-foreground/80 max-w-md mx-auto lg:mx-0 text-sm md:text-base">
              Stay ahead of the fashion curve. Get early access to sales,
              exclusive collection launches, and style tips.
            </p>
          </div>
          <form
            className="relative z-10 flex flex-col sm:flex-row w-full max-w-xl gap-3 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full border border-white/20"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-transparent border-none text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 md:h-14 px-6 md:text-lg w-full flex-1"
              required
            />
            <Button
              className="bg-white text-primary hover:bg-white/90 rounded-xl sm:rounded-full h-12 md:h-14 px-8 md:px-10 font-bold text-base md:text-lg shadow-xl shadow-black/5 shrink-0"
              type="submit"
            >
              Subscribe
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold flex items-center gap-2"
            >
              Clothing
            </Link>
            <p className="text-muted-foreground text-sm">
              Your ultimate fashion destination. We bring you the latest trends
              and styles to keep you looking your best.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link href="/careers" className="hover:text-primary">
                  Careers
                </Link>
              </li> */}
              <li>
                <Link href="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              {/* <li>
                <Link href="/press" className="hover:text-primary">
                  Press
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link href="/shipping" className="hover:text-primary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary">
                  Returns & Exchanges
                </Link>
              </li> */}
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@clothing.com</span>
              </li>
              <li>123 Fashion Street, New York, NY 10001</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Clothing Store. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
