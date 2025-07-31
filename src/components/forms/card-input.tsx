"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { forwardRef } from "react";

interface CardInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  value: string;
}

const CardInput = forwardRef<HTMLInputElement, CardInputProps>(
  ({ onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Remove all non-digits
      const digits = e.target.value.replace(/\D/g, "");

      // Limit to 16 digits
      const limitedDigits = digits.slice(0, 16);

      // Add spaces every 4 digits
      const formatted = limitedDigits.replace(/(\d{4})(?=\d)/g, "$1 ");

      onChange(formatted);
    };

    const getCardType = (cardNumber: string): string => {
      const digits = cardNumber.replace(/\D/g, "");

      if (digits.startsWith("4")) return "Visa";
      if (digits.startsWith("5") || digits.startsWith("2")) return "Mastercard";
      if (digits.startsWith("3")) return "American Express";
      if (digits.startsWith("6")) return "Discover";

      return "";
    };

    const cardType = getCardType(value);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          maxLength={19} // 16 digits + 3 spaces
          className="pr-20"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-slate-400" />
          {cardType && (
            <span className="text-xs text-slate-500 font-medium">
              {cardType}
            </span>
          )}
        </div>
      </div>
    );
  }
);

CardInput.displayName = "CardInput";

export default CardInput;
