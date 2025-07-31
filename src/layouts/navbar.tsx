"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import CartPopover from "@/components/cart/cart-popover";
import SearchSuggestions from "@/components/search-suggestions";
import { useSearch } from "@/contexts/search-context";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setShowSuggestions(true);
    setIsSearchExpanded(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 gap-4">
          {/* Logo - Always shows brand name, only shows logo when search is expanded on mobile */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span
              className={`text-xl font-bold text-slate-900 transition-opacity duration-200 ${
                isSearchExpanded ? "lg:block hidden" : "block"
              }`}
            >
              SoleStyle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-shrink-0">
            <Link
              href="/men"
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors whitespace-nowrap"
            >
              Men
            </Link>
            <Link
              href="/women"
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors whitespace-nowrap"
            >
              Women
            </Link>
            <Link
              href="/kids"
              className="text-slate-700 hover:text-orange-600 font-medium transition-colors whitespace-nowrap"
            >
              Kids
            </Link>
            <Link
              href="/sale"
              className="text-red-600 hover:text-red-700 font-medium transition-colors whitespace-nowrap"
            >
              Sale
            </Link>
          </nav>

          {/* Search Bar - Takes remaining space */}
          <div className="flex-1 relative min-w-0" ref={searchRef}>
            {!isSearchExpanded ? (
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for shoes..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={handleSearchFocus}
                    className="pl-12 bg-slate-100 border-0 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-0"
                  />
                </div>
                {showSuggestions && (
                  <SearchSuggestions
                    onSelectSuggestion={() => setShowSuggestions(false)}
                  />
                )}
              </div>
            ) : (
              <div className="lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search shoes..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={handleSearchFocus}
                    className="pl-10 pr-10 bg-slate-100 border-0 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-0"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setShowSuggestions(false);
                    }}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {showSuggestions && (
                  <SearchSuggestions
                    onSelectSuggestion={() => {
                      setShowSuggestions(false);
                      setIsSearchExpanded(false);
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Mobile Search Icon */}
          {!isSearchExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchExpanded(true)}
              className="lg:hidden p-2 flex-shrink-0"
            >
              <Search className="w-5 h-5" />
            </Button>
          )}

          {/* Actions - Fixed width */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className={isSearchExpanded ? "hidden" : "block"}>
              <CartPopover />
            </div>

            {/* Mobile Menu Sheet */}
            <div
              className={`lg:hidden ${isSearchExpanded ? "hidden" : "block"}`}
            >
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader className="mb-8">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                      </div>
                      SoleStyle
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        Categories
                      </h3>
                      <div className="space-y-3">
                        <Link
                          href="/men"
                          className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Men's Shoes
                        </Link>
                        <Link
                          href="/women"
                          className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Women's Shoes
                        </Link>
                        <Link
                          href="/kids"
                          className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Kids' Shoes
                        </Link>
                        <Link
                          href="/sale"
                          className="block text-lg font-medium text-red-600 hover:text-red-700 transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sale
                        </Link>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                          Account
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/account"
                            className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            My Account
                          </Link>
                          <Link
                            href="/orders"
                            className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Order History
                          </Link>
                          <Link
                            href="/wishlist"
                            className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Wishlist
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                          Support
                        </h3>
                        <div className="space-y-3">
                          <Link
                            href="/help"
                            className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Help Center
                          </Link>
                          <Link
                            href="/contact"
                            className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Contact Us
                          </Link>
                          <Link
                            href="/size-guide"
                            className="block text-lg font-medium text-slate-900 hover:text-orange-600 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Size Guide
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In / Register
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
