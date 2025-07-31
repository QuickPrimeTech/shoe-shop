"use client";

import { useSearch } from "@/contexts/search-context";
import { Search } from "lucide-react";
import Image from "next/image";

interface SearchSuggestionsProps {
  onSelectSuggestion: () => void;
}

export default function SearchSuggestions({
  onSelectSuggestion,
}: SearchSuggestionsProps) {
  const { suggestions, setSearchQuery } = useSearch();

  const handleSuggestionClick = (productName: string) => {
    setSearchQuery(productName);
    onSelectSuggestion();
  };

  if (suggestions.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg mt-1 p-4 z-50">
        <div className="flex items-center gap-3 text-slate-500">
          <Search className="w-4 h-4" />
          <span className="text-sm">No products found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg mt-1 py-2 z-50 max-h-80 overflow-y-auto">
      {suggestions.map((product) => (
        <button
          key={product.id}
          onClick={() => handleSuggestionClick(product.name)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-900 truncate">
              {product.name}
            </p>
            <p className="text-sm text-slate-600">{product.brand}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-semibold text-slate-900">${product.price}</p>
            {product.originalPrice && (
              <p className="text-xs text-slate-500 line-through">
                ${product.originalPrice}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
