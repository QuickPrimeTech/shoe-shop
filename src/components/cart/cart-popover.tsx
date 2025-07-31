"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";
import CheckoutSheet from "./checkout-sheet";

export default function CartPopover() {
  const { state } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleContinueShopping = () => {
    setPopoverOpen(false);
  };

  const handleCheckout = () => {
    setPopoverOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {state.itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                {state.itemCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="font-semibold">Shopping Cart</h3>
            </div>

            {state.items.length === 0 ? (
              <div className="text-center py-6">
                <ShoppingCart className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                <p className="text-slate-600">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {state.items.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-slate-200 rounded-md flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          {item.quantity}x ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                  {state.items.length > 3 && (
                    <p className="text-sm text-slate-600 text-center">
                      +{state.items.length - 3} more items
                    </p>
                  )}
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={handleContinueShopping}
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <CheckoutSheet open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
}
