// components/ui/Input.tsx
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500
                 focus:border-purple-500 focus:ring-purple-500 focus:outline-none
                 disabled:bg-gray-50 disabled:text-gray-500"
        {...props}
      />
    </div>
  );
};

export default Input;
