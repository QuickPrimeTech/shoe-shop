import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import NewsletterForm from "@/components/forms/newsletter-form";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SoleStyle</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your trusted partner for premium footwear. Step into style with
              our carefully curated collection of shoes.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/size-guide"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Size Guide
              </Link>
              <Link
                href="/shipping"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Returns
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link
                href="/men"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Men's Shoes
              </Link>
              <Link
                href="/women"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Women's Shoes
              </Link>
              <Link
                href="/kids"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Kids' Shoes
              </Link>
              <Link
                href="/athletic"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Athletic
              </Link>
              <Link
                href="/formal"
                className="block text-slate-400 hover:text-white transition-colors"
              >
                Formal
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-slate-400">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} SoleStyle. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
