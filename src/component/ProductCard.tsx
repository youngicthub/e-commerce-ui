"use client";

import { ProductType } from "@/type";
import { ShoppingBag, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

const ProductCard = ({ product }: { product: ProductType }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isAdded, setIsAdded] = useState(false);

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    if (type === "size") {
      setSelectedSize(value);
    } else {
      setSelectedColor(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);

    // Show success feedback
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className='shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-all duration-300'>
      <Link href={`/products/${product.id}`}>
        <div className='relative aspect-[2/3]'>
          <Image
            src={product.images[selectedColor]}
            alt={product.name}
            fill
            className='object-cover'
          />
        </div>
      </Link>

      <div className='flex flex-col gap-4 p-4'>
        <h1 className='font-medium'>{product.name}</h1>
        <p className='text-sm text-gray-500'>{product.shortDescription}</p>

        <div className='flex items-center gap-4 text-xs'>
          {/* Sizes */}
          <div className='flex flex-col'>
            <span className='text-gray-600'> Size </span>
            <select
              className='ring-1 ring-gray-300 rounded-md px-2 py-1'
              value={selectedSize}
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className='flex flex-col'>
            <span className='text-gray-500'>Colors</span>
            <div className='flex items-center gap-2'>
              {product.colors.map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                  title={color}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-md'>£{product.price.toFixed(2)}</p>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-2 ring-1 ring-offset-gray-300 px-4 py-2 rounded-md transition-all cursor-pointer ${
              isAdded
                ? "bg-green-500 text-white"
                : "bg-white text-black hover:bg-gray-800 hover:text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className='w-4 h-4' /> Added!
              </>
            ) : (
              <>
                <ShoppingBag className='w-4 h-4' /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
