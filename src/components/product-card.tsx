"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/types/common";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    });

    toast(`${product.title} Added to cart!`);
  };

  return (
    <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-lg">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
            {product.title}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-slate-500">({product.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-slate-900">
            Ksh {product.price.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
