"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated, removeAuthToken } from "@/utils/auth";
import axios from "axios";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, [pathname]);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axios.post("/api/auth/logout");
      removeAuthToken();
      setAuthenticated(false);
      setMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Still remove token and redirect even if API call fails
      removeAuthToken();
      setAuthenticated(false);
      setMobileMenuOpen(false);
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
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
            {authenticated ? (
              <>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Button
                    key={link.href}
                    variant="ghost"
                    size="sm"
                    asChild
                    className={`w-full justify-start ${isActive ? "text-primary bg-accent" : ""}`}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                );
              })}
              <div className="pt-2 border-t space-y-1">
                {authenticated ? (
                  <>
                    <Button size="sm" variant="outline" asChild className="w-full justify-start">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full justify-start gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="ghost" asChild className="w-full justify-start">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button size="sm" asChild className="w-full justify-start">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

