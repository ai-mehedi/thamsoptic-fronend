"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Wifi } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PayBillModal } from "@/components/pay-bill-modal";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "#abouteus", label: "About Us" },
    { href: "#why-choose-us", label: "Why Choose Us" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="royal-blue text-white sticky top-0 z-50 shadow-elevation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={"/logo/logo.svg"} alt="Logo" width={180} height={80} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-gold transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          {session ? (
            <div className="hidden md:flex items-center space-x-4">
              <PayBillModal />
              <Button
                asChild
                variant="outline"
                className="bg-yellow-500 text-royal-blue"
              >
                <Link href="/dashboard">My Account</Link>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <PayBillModal />
              <Button
                asChild
                variant="outline"
                className="bg-yellow-500 text-royal-blue"
              >
                <Link href="/login">login</Link>
              </Button>
            </div>
          )}
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="royal-blue text-white border-none"
            >
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg hover:text-gold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-4">
                  <PayBillModal />
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-royal-blue w-full bg-transparent"
                  >
                    <Link href="/dashboard">My Account</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
