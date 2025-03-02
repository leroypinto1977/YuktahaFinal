// /components/ui/toast/toast-container.tsx
"use client";

import { Toast, ToastProps } from "./toast";
import React from "react";

interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>;
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="transition-all duration-300 ease-in-out transform translate-y-0 opacity-100"
        >
          <Toast {...toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};
