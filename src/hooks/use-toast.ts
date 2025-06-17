import { toast as sonnerToast } from 'sonner';

// Define a type for toast variants if you want to enforce them strictly
type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  icon?: React.ReactNode; // Allow custom icons
  action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  // Add other sonner props as needed: duration, position, etc.
  duration?: number;
}

// Define the toast function with specific variants
const toast = (props: ToastProps) => {
  const { title, description, variant, icon, action, ...rest } = props;

  let toastFunction: (message: React.ReactNode, data?: any) => void = sonnerToast;

  // Sonner uses different functions for types, or you can style via `classNames`
  // For simplicity, we'll use sonnerToast.success, .error etc. if variant matches
  if (variant === "success") {
    return sonnerToast.success(title || 'Success', { description, icon, action, ...rest });
  } else if (variant === "destructive") {
    return sonnerToast.error(title || 'Error', { description, icon, action, ...rest });
  } else if (variant === "warning") {
    // sonner doesn't have a direct 'warning' type, use default or custom styling
    return sonnerToast.warning(title || 'Warning', { description, icon, action, ...rest });
  } else if (variant === "info") {
     return sonnerToast.info(title || 'Info', { description, icon, action, ...rest });
  }
  
  // Default toast
  return sonnerToast(title, { description, icon, action, ...rest });
};

// The hook itself
export const useToast = () => {
  return { toast };
};

// You might also want to export the Toaster component for use in App.tsx
// import { Toaster as SonnerToaster } from 'sonner';
// export const Toaster = SonnerToaster;
// This should be placed in your App.tsx or main layout component: <Toaster richColors position="top-right" />