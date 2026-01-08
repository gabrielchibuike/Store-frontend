"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { useQuery } from "@tanstack/react-query";
import { getNavigationMenu } from "@/lib/services/storeConfig";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const staticLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
];

const endLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const { data: navigationMenu } = useQuery({
    queryKey: ["navigation-menu"],
    queryFn: () => getNavigationMenu(),
    select: (data) => data.data,
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
              <SheetHeader className="p-6 border-b text-left">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full overflow-y-auto pb-10">
                <nav className="flex flex-col p-6 gap-2">
                  {/* Static Main Links */}
                  <div className="flex flex-col gap-4 mb-4">
                    {staticLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-border my-2" />

                  {/* Dynamic Store Navigation */}
                  <div className="space-y-4 py-2">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-1">
                      Shop by Category
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      {navigationMenu?.map((menu: any) => (
                        <AccordionItem
                          key={menu.gender}
                          value={menu.gender}
                          className="border-none"
                        >
                          <AccordionTrigger className="hover:no-underline py-2 text-base font-medium">
                            {menu.gender}
                          </AccordionTrigger>
                          <AccordionContent className="pb-2">
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full pl-4"
                            >
                              {menu.sections.map((section: any) => (
                                <AccordionItem
                                  key={section.title}
                                  value={section.title}
                                  className="border-none"
                                >
                                  <AccordionTrigger className="hover:no-underline py-2 text-sm font-medium text-muted-foreground">
                                    {section.title}
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-1 pl-4">
                                    <ul className="space-y-3 pt-1 border-l-2 ml-1">
                                      {section.items.map((item: any) => (
                                        <li key={item.name}>
                                          <Link
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-sm text-muted-foreground hover:text-primary transition-colors pl-4"
                                          >
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  <div className="h-px bg-border my-2" />

                  {/* End Links */}
                  <div className="flex flex-col gap-4 mt-2 mb-8">
                    {endLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded-full">
              <span className="font-bold text-lg px-2">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Clothing.</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {staticLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-4"
            >
              {link.name}
            </Link>
          ))}

          {navigationMenu?.map((menu: any) => (
            <div key={menu.gender} className="group static">
              <Link
                href={`/shop?category=${menu.gender}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 py-4"
              >
                {menu.gender}
              </Link>
              {/* Mega Menu - visible on group hover */}
              <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 right-0 top-[64px] w-full">
                <MegaMenu data={menu} />
              </div>
            </div>
          ))}

          {endLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-4"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="absolute inset-x-0 top-0 h-16 bg-background flex items-center px-4 z-50 md:relative md:inset-auto md:h-auto md:bg-transparent md:p-0 md:w-64">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full md:w-64"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/wishlist">
              <span className="sr-only">Wishlist</span>
              {/* Heart Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon">
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
