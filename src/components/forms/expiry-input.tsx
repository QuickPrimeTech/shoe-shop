"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface ExpiryInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  value: string;
}

const ExpiryInput = forwardRef<HTMLInputElement, ExpiryInputProps>(
  ({ onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Remove all non-digits
      const digits = e.target.value.replace(/\D/g, "");

      // Limit to 4 digits
      const limitedDigits = digits.slice(0, 4);

      // Add slash after 2 digits
      let formatted = limitedDigits;
      if (limitedDigits.length >= 2) {
        formatted = `${limitedDigits.slice(0, 2)}/${limitedDigits.slice(2)}`;
      }

      onChange(formatted);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder="MM/YY"
        maxLength={5}
      />
    );
  }
);

ExpiryInput.displayName = "ExpiryInput";

export default ExpiryInput;
