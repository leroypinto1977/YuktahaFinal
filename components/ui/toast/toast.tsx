// /components/ui/toast/toast.tsx
"use client";

import { ToastAction } from "@/components/ui/toast/toast-action";
import React from "react";

export interface ToastProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

export const Toast: React.FC<
  ToastProps & { id: string; onDismiss: (id: string) => void }
> = ({ id, title, description, action, variant = "default", onDismiss }) => {
  return (
    <div
      className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${
        variant === "destructive"
          ? "border-red-200 bg-red-50 text-red-900"
          : variant === "success"
          ? "border-green-200 bg-green-50 text-green-900"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      <div className="flex flex-col gap-1">
        {title && <h3 className="font-medium">{title}</h3>}
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      {action && (
        <div className="flex shrink-0 items-center gap-2">{action}</div>
      )}

      <button
        onClick={() => onDismiss(id)}
        className="absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity hover:text-gray-900 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};
