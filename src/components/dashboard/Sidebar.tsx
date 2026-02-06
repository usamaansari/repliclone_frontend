"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  LogOut,
  User,
  History,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeAuthToken } from "@/utils/auth";
import axios from "axios";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onLogout?: () => void;
}

const SIDEBAR_STATE_KEY = "sidebar-collapsed";

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, String(newState));
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/clones",
      label: "Clones",
      icon: Users,
    },
    /*
    {
      href: "/dashboard/conversations",
      label: "Conversations",
      icon: MessageSquare,
    },
    {
      href: "/dashboard/history",
      label: "History",
      icon: History,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
    */
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axios.post("/api/auth/logout");
      removeAuthToken();
      if (onLogout) {
        onLogout();
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      removeAuthToken();
      if (onLogout) {
        onLogout();
      } else {
        router.push("/");
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Mobile menu overlay
  const MobileOverlay = () => (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {/* Logo/Brand */}
      <div className={cn(
        "border-b border-border flex items-center justify-between",
        isCollapsed && !isMobile ? "p-4" : "p-6"
      )}>
        <Link 
          href="/dashboard" 
          className={cn(
            "flex items-center gap-2 transition-all",
            isCollapsed && !isMobile && "justify-center"
          )}
        >
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
          </div>
          {(!isCollapsed || isMobile) && (
            <span className="text-lg font-bold whitespace-nowrap">ReplicloneAI</span>
          )}
        </Link>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full gap-3 transition-all",
                  isCollapsed && !isMobile ? "justify-center px-2" : "justify-start",
                  isActive && "bg-secondary"
                )}
                title={isCollapsed && !isMobile ? item.label : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {(!isCollapsed || isMobile) && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all",
            isCollapsed && !isMobile ? "justify-center px-2" : "justify-start"
          )}
          onClick={handleLogout}
          disabled={isLoggingOut}
          title={isCollapsed && !isMobile ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {(!isCollapsed || isMobile) && (
            <span className="whitespace-nowrap">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          )}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden h-10 w-10 bg-background border border-border shadow-md"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <MobileOverlay />

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex h-screen bg-background border-r border-border flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-screen bg-background border-r border-border flex flex-col z-50 transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full"
        )}
      >
        <SidebarContent isMobile />
      </div>
    </>
  );
}

