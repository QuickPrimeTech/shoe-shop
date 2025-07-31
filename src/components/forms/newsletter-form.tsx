"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  newsletterSchema,
  type NewsletterFormData,
} from "@/lib/validation-schemas";

export default function NewsletterForm() {
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully subscribed!");

      form.reset();
    } catch {
      toast.error("Subscription failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}
