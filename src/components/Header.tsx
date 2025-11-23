"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ReplicloneAI</span>
          </Link>
          <div className="flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={isActive ? "text-primary" : ""}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              );
            })}
            <Button size="sm" asChild>
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

