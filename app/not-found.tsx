import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import messages from "@/messages/uz.json";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold mb-2">
          {messages.common.pageNotFoundTitle}
        </h1>
        <p className="font-body-base text-sm text-on-surface-variant mb-8 leading-relaxed">
          {messages.common.pageNotFoundDesc}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-md shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
}
