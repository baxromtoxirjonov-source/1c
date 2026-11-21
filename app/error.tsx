"use client";

import * as React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import messages from "@/messages/uz.json";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-error/10 text-error flex items-center justify-center mx-auto mb-6 shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold mb-2">
          {messages.common.errorTitle}
        </h1>
        <p className="font-body-base text-sm text-on-surface-variant mb-8 leading-relaxed">
          {messages.common.errorDesc}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-md shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{messages.common.retry}</span>
        </button>
      </div>
    </div>
  );
}
