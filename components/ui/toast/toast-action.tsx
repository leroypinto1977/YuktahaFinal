// /components/ui/toast/toast-action.tsx
"use client";

import React from "react";

interface ToastActionProps {
  altText: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const ToastAction: React.FC<ToastActionProps> = ({
  altText,
  children,
  onClick,
}) => {
  return (
    <button
      className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      onClick={onClick}
      aria-label={altText}
    >
      {children}
    </button>
  );
};
