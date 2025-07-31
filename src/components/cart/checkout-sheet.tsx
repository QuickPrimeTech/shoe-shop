"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  Plus,
  Trash2,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  User,
  Check,
} from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import CardInput from "@/components/forms/card-input";
import ExpiryInput from "@/components/forms/expiry-input";
import CVVInput from "@/components/forms/cvv-input";
import { mockApi } from "@/lib/mock-api";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/lib/validation-schemas";

interface CheckoutSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CheckoutStep = "cart" | "contact" | "payment" | "confirmation";

export default function CheckoutSheet({
  open,
  onOpenChange,
}: CheckoutSheetProps) {
  const { state, dispatch } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    toast.success("Item removed successfully");
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast("Cart cleared. All items have been removed from your cart.");
  };

  const nextStep = async () => {
    if (currentStep === "cart") {
      if (state.items.length === 0) {
        toast.info("Your cart is empty");
        return;
      }
      setCurrentStep("contact");
    } else if (currentStep === "contact") {
      // Validate contact fields using Zod
      const contactFields = [
        "email",
        "firstName",
        "lastName",
        "address",
        "city",
        "state",
        "zipCode",
      ] as const;
      const isValid = await form.trigger(contactFields);

      if (isValid) {
        setCurrentStep("payment");
      } else {
        toast.error("Please complete all required fields");
      }
    }
  };

  const prevStep = () => {
    if (currentStep === "payment") {
      setCurrentStep("contact");
    } else if (currentStep === "contact") {
      setCurrentStep("cart");
    }
  };

  const onSubmit = async (values: CheckoutFormData) => {
    // Validate payment fields using Zod
    const paymentFields = ["cardNumber", "expiryDate", "cvv"] as const;
    const isPaymentValid = await form.trigger(paymentFields);

    if (!isPaymentValid) {
      toast.error("Please complete payment information");
      return;
    }

    setIsProcessing(true);

    try {
      const orderResult = await mockApi.placeOrder({
        items: state.items,
        total: finalTotal,
        customerInfo: values,
      });

      if (orderResult.success) {
        setCurrentStep("confirmation");

        setTimeout(() => {
          toast.success("Order placed successfully!");
          dispatch({ type: "CLEAR_CART" });
          onOpenChange(false);
          setCurrentStep("cart");
          form.reset();
        }, 3000);
      }
    } catch (error) {
      toast("There was an error processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setCurrentStep("cart");
  };

  const shipping = 9.99;
  const tax = state.total * 0.08;
  const finalTotal = state.total + shipping + tax;

  const steps = [
    { key: "cart", label: "Cart", icon: ShoppingCart },
    { key: "contact", label: "Contact", icon: User },
    { key: "payment", label: "Payment", icon: CreditCard },
  ];

  const getCurrentStepIndex = () =>
    steps.findIndex((step) => step.key === currentStep);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="mb-6">
              <SheetTitle className="flex items-center gap-2">
                {currentStep === "confirmation" ? (
                  <>
                    <Check className="w-6 h-6 text-green-600" />
                    Order Confirmed!
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Checkout ({state.itemCount} items)
                  </>
                )}
              </SheetTitle>

              {/* Progress Steps */}
              {currentStep !== "confirmation" && (
                <div className="flex items-center justify-between mt-4">
                  {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = step.key === currentStep;
                    const isCompleted = getCurrentStepIndex() > index;

                    return (
                      <div key={step.key} className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            isActive
                              ? "border-orange-600 bg-orange-600 text-white"
                              : isCompleted
                              ? "border-green-600 bg-green-600 text-white"
                              : "border-slate-300 text-slate-400"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span
                          className={`ml-2 text-sm font-medium ${
                            isActive
                              ? "text-orange-600"
                              : isCompleted
                              ? "text-green-600"
                              : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </span>
                        {index < steps.length - 1 && (
                          <div className="w-8 h-px bg-slate-300 mx-4" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </SheetHeader>

            {state.items.length === 0 && currentStep !== "confirmation" ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Step 1: Cart Items */}
                {currentStep === "cart" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Review Your Order</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="text-red-600 hover:text-red-700"
                      >
                        Clear All
                      </Button>
                    </div>

                    {state.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-slate-50 rounded-lg"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-2">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-slate-600">
                              {item.brand}
                            </p>
                            <p className="text-sm font-semibold">
                              ${item.price}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Order Summary */}
                    <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${state.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={nextStep}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6"
                    >
                      Continue to Contact Information
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === "contact" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">
                      Contact & Shipping Information
                    </h3>

                    <Form {...form}>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your@email.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                  <Input placeholder="New York" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State *</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="ny">New York</SelectItem>
                                    <SelectItem value="ca">
                                      California
                                    </SelectItem>
                                    <SelectItem value="tx">Texas</SelectItem>
                                    <SelectItem value="fl">Florida</SelectItem>
                                    <SelectItem value="il">Illinois</SelectItem>
                                    <SelectItem value="pa">
                                      Pennsylvania
                                    </SelectItem>
                                    <SelectItem value="oh">Ohio</SelectItem>
                                    <SelectItem value="ga">Georgia</SelectItem>
                                    <SelectItem value="nc">
                                      North Carolina
                                    </SelectItem>
                                    <SelectItem value="mi">Michigan</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code *</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Form>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        className="flex-1 bg-transparent"
                      >
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back to Cart
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        Continue to Payment
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === "payment" && (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <h3 className="font-semibold">Payment Information</h3>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number *</FormLabel>
                              <FormControl>
                                <CardInput
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date *</FormLabel>
                                <FormControl>
                                  <ExpiryInput
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV *</FormLabel>
                                <FormControl>
                                  <CVVInput
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Final Order Summary */}
                      <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${state.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="flex-1 bg-transparent"
                        >
                          <ArrowLeft className="mr-2 w-4 h-4" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isProcessing}
                          className="flex-1 bg-orange-600 hover:bg-orange-700 text-lg py-6"
                        >
                          {isProcessing
                            ? "Processing..."
                            : `Complete Order - $${finalTotal.toFixed(2)}`}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === "confirmation" && (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        Order Confirmed!
                      </h3>
                      <p className="text-slate-600">
                        Thank you for your purchase. Your order is being
                        processed.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        Order Total:{" "}
                        <span className="font-bold">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-sm text-green-800">
                        You will receive a confirmation email shortly.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
