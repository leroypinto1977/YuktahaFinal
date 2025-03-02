// /components/ui/toast/toast-context.tsx
"use client";

import { ToastProps } from "@/components/ui/toast/toast";
import { ToastContainer } from "@/components/ui/toast/toast-container";
import React, { createContext, useContext, useState } from "react";

type ToastContextType = {
  showToast: (props: ToastProps) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const showToast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { ...props, id }]);

    // Auto dismiss after duration (default 5000ms)
    const duration = props.duration || 5000;
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  };

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
