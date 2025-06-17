import React from 'react';
import { Badge, BadgeProps } from "@/components/ui/badge"; // Use shadcn Badge as a base
import { X } from 'lucide-react'; // For dismissible icon

interface InteractiveTagProps extends BadgeProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const InteractiveTag: React.FC<InteractiveTagProps> = ({
  text,
  isActive,
  onClick,
  onDismiss,
  variant = "secondary",
  className = "",
  ...props
}) => {
  console.log("Rendering InteractiveTag:", text, "Active:", isActive);

  const baseClasses = "cursor-pointer transition-all duration-200 ease-in-out flex items-center gap-1";
  const activeClasses = isActive ? "ring-2 ring-blue-500 ring-offset-1" : "hover:bg-opacity-80";
  
  const combinedClassName = `${baseClasses} ${activeClasses} ${className}`;

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onClick) {
      onClick();
    }
    // Prevent onDismiss if tag is clicked and both are provided
    if (onDismiss && e.target === e.currentTarget.querySelector('.dismiss-icon')) {
       // Let dismiss handle it
    } else if (onClick) {
      // onClick();
    }
  };
  
  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent onClick if onDismiss is present
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <Badge
      variant={variant}
      className={combinedClassName}
      onClick={onClick ? handleClick : undefined} // Only attach onClick if provided
      tabIndex={onClick ? 0 : -1} // Make it focusable if clickable
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
      {...props}
    >
      {text}
      {onDismiss && (
        <button
          type="button"
          onClick={handleDismiss}
          className="ml-1.5 -mr-0.5 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current dismiss-icon"
          aria-label={`Remove ${text} filter`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  );
};

export default InteractiveTag;