// components/ui/Button.tsx
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = ({
  isLoading,
  fullWidth,
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${fullWidth ? "w-full" : ""}
        ${
          variant === "primary"
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
        }
        flex justify-center items-center px-4 py-3 rounded-lg
        text-sm font-medium shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className || ""}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
