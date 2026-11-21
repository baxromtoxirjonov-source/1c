"use client";

import * as React from "react";
import Link from "next/link";
import { Layers, Send, Globe } from "lucide-react";
import messages from "@/messages/uz.json";

export function Footer() {
  const telegramLink =
    process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/tizimlugat";

  return (
    <footer className="w-full bg-surface-container-lowest mt-space-xl border-t border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter-desktop">
          {/* Main Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <Link href="/" className="flex items-center gap-space-sm group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-sm">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-title-md text-title-md text-on-surface font-extrabold tracking-tight">
                {messages.site.title}
              </span>
            </Link>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm leading-relaxed">
              {messages.footer.about}
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-space-md py-2 rounded-xl bg-surface-container-low text-primary font-label-sm text-label-sm hover:bg-surface-container transition-colors border border-outline-variant/20"
              >
                <Send className="w-4 h-4" />
                <span>@tizimlugat {messages.footer.community}</span>
              </a>
            </div>
          </div>

          {/* Section 1: Navigation */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              {messages.footer.sections}
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Link href="/" className="hover:text-primary transition-colors">
                {messages.nav.home}
              </Link>
              <Link href="/tizimlar" className="hover:text-primary transition-colors">
                {messages.nav.systemTypes}
              </Link>
              <Link href="/platformalar" className="hover:text-primary transition-colors">
                {messages.nav.platforms}
              </Link>
              <Link href="/ozbekiston" className="hover:text-primary transition-colors">
                {messages.nav.local}
              </Link>
              <Link href="/taqqoslash" className="hover:text-primary transition-colors">
                {messages.nav.compare}
              </Link>
            </div>
          </div>

          {/* Section 2: Popular Platforms */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              {messages.footer.popular}
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Link href="/platformalar/sap" className="hover:text-primary transition-colors">
                SAP S/4HANA
              </Link>
              <Link href="/platformalar/1c" className="hover:text-primary transition-colors">
                1C:Предприятие
              </Link>
              <Link href="/platformalar/odoo" className="hover:text-primary transition-colors">
                Odoo ERP
              </Link>
              <Link href="/platformalar/bitrix24" className="hover:text-primary transition-colors">
                Bitrix24
              </Link>
              <Link href="/platformalar/amocrm" className="hover:text-primary transition-colors">
                AmoCRM
              </Link>
            </div>
          </div>

          {/* Section 3: Local Solutions */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              {messages.footer.localSolutions}
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <Link href="/ozbekiston" className="hover:text-primary transition-colors">
                BILLZ (POS & Ombor)
              </Link>
              <Link href="/ozbekiston" className="hover:text-primary transition-colors">
                Modme (CRM & LMS)
              </Link>
              <Link href="/ozbekiston" className="hover:text-primary transition-colors">
                Didox (DMS Elektron hisob)
              </Link>
              <Link href="/ozbekiston" className="hover:text-primary transition-colors">
                Soliq.uz & MySoliq
              </Link>
            </div>
          </div>

          {/* Section 4: Contact & Language */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">
              {messages.footer.contact}
            </span>
            <div className="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <span>{messages.footer.address}</span>
              <span className="text-on-surface font-medium">info@tizimlugat.uz</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 pt-3">
              <Globe className="w-4 h-4 text-on-surface-variant mr-1" />
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg font-code-badge text-code-badge bg-primary text-on-primary font-bold shadow-sm"
              >
                UZ
              </button>
              <div className="relative group">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg font-code-badge text-code-badge bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  RU
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  {messages.footer.comingSoon}
                </span>
              </div>
              <div className="relative group">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg font-code-badge text-code-badge bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  EN
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  {messages.footer.comingSoon}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="mt-space-xl pt-space-lg border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-sm text-label-sm">
          <p>© 2026 TizimLug'at. {messages.footer.rights}</p>
          <div className="flex items-center gap-space-md">
            <span className="hover:text-on-surface cursor-pointer">
              {messages.footer.privacy}
            </span>
            <span className="hover:text-on-surface cursor-pointer">
              {messages.footer.terms}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
