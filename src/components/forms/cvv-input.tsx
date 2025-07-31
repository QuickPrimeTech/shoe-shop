"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface CVVInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  value: string;
}

const CVVInput = forwardRef<HTMLInputElement, CVVInputProps>(
  ({ onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Remove all non-digits and limit to 4 digits
      const formatted = e.target.value.replace(/\D/g, "").slice(0, 4);
      onChange(formatted);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder="123"
        maxLength={4}
      />
    );
  }
);

CVVInput.displayName = "CVVInput";

export default CVVInput;
