'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ShoppingCart, ImageOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  $id: string;
  name: string;
  description: string;
  actualPrice: number;
  offerPrice: number;
  category: string;
  stock: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.$id,
      name: product.name,
      price: parseFloat(product.offerPrice.toString()),
      image: product.image,
      quantity: 1,
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card/90 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
      <div className="aspect-square relative overflow-hidden rounded-t-xl">
        {imageError || !product.image ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <ImageOff className="h-12 w-12 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}
      </div>

      <div className="relative space-y-4 p-6">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.category}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground line-through text-sm">
              ₹{parseFloat(product.actualPrice.toString()).toLocaleString()}
            </p>
            <p className="text-lg font-bold text-primary">
              ₹{parseFloat(product.offerPrice.toString()).toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-primary/80">
            Save ₹
            {(
              parseFloat(product.actualPrice.toString()) - parseFloat(product.offerPrice.toString())
            ).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link href={`/product/${product.$id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-primary hover:text-primary-foreground hover:bg-primary"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="relative overflow-hidden rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}