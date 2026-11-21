"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, Send, Menu, X, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import messages from "@/messages/uz.json";

interface HeaderProps {
  onOpenSearch?: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: messages.nav.home },
    { href: "/tizimlar", label: messages.nav.systemTypes },
    { href: "/platformalar", label: messages.nav.platforms },
    { href: "/ozbekiston", label: messages.nav.local },
    { href: "/taqqoslash", label: messages.nav.compare },
  ];

  const telegramLink =
    process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/tizimlugat";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">
        {/* Brand Logo */}
        <div className="flex items-center gap-space-lg">
          <Link
            href="/"
            className="flex items-center gap-space-sm group focus-visible:rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-on-surface font-extrabold leading-tight tracking-tight">
                {messages.site.title}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline-block">
                {messages.site.subtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 font-label-lg text-label-lg transition-all rounded-lg",
                    isActive
                      ? "bg-surface-container-high text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-space-sm">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden lg:flex items-center bg-surface-container-low px-space-md py-2 rounded-xl gap-space-sm w-64 justify-between cursor-pointer hover:bg-surface-container border border-outline-variant/30 transition-colors text-left"
            aria-label="Qidirish oynasini ochish"
          >
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Search className="w-4 h-4 text-primary" />
              <span className="font-body-sm text-body-sm">
                {messages.site.searchPlaceholder.slice(0, 16)}...
              </span>
            </div>
            <kbd className="bg-surface-container-lowest text-on-surface-variant font-code-badge text-code-badge px-2 py-0.5 rounded shadow-sm border border-outline-variant/20">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={
                theme === "dark"
                  ? messages.site.lightMode
                  : messages.site.darkMode
              }
              className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors border border-outline-variant/20"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-secondary" />
              )}
            </button>
          )}

          {/* Consultation CTA Button */}
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center h-11 px-space-md bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl shadow-md shadow-primary/20 hover:bg-primary transition-all active:scale-95 gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{messages.site.consultationBtn}</span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mobil menyu"
            className="xl:hidden w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-margin-mobile py-space-md animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch?.();
              }}
              className="flex items-center gap-3 px-4 py-3 bg-surface-container-low text-on-surface rounded-xl font-label-lg text-left"
            >
              <Search className="w-4 h-4 text-primary" />
              <span>{messages.nav.search}</span>
            </button>
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl font-label-lg text-label-lg transition-colors",
                    isActive
                      ? "bg-surface-container-high text-primary font-bold"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 h-11 px-4 bg-primary-container text-on-primary font-label-lg rounded-xl shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{messages.site.consultationBtn}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
