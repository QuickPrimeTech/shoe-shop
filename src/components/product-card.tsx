"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
      },
    });

    toast(`${product.name} Added to cart!`);
  };

  return (
    <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-lg">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <Badge
              variant={
                product.badge.includes("OFF") ? "destructive" : "default"
              }
              className={`
                ${product.badge === "NEW" ? "bg-green-600" : ""}
                ${product.badge === "Best Seller" ? "bg-blue-600" : ""}
                ${product.badge === "Premium" ? "bg-purple-600" : ""}
                ${product.badge.includes("OFF") ? "bg-red-600" : ""}
              `}
            >
              {product.badge}
            </Badge>
          )}
          {discount > 0 && !product.badge?.includes("OFF") && (
            <Badge variant="destructive">-{discount}%</Badge>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-500 font-medium">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-slate-500">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-semibold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-slate-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
