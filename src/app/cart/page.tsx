"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCartStore();

  const handleIncreaseQty = (
    productId: number,
    size: string,
    color: string,
    currentQty: number
  ) => {
    updateQuantity(productId, size, color, currentQty + 1);
  };

  const handleDecreaseQty = (
    productId: number,
    size: string,
    color: string,
    currentQty: number
  ) => {
    if (currentQty > 1) {
      updateQuantity(productId, size, color, currentQty - 1);
    } else {
      removeFromCart(productId, size, color);
    }
  };

  const handleRemove = (productId: number, size: string, color: string) => {
    removeFromCart(productId, size, color);
  };

  return (
    <div className='max-w-5xl mx-auto p-4 md:p-8'>
      <h1 className='text-2xl md:text-3xl font-bold mb-6'>Your Cart</h1>

      {items.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg mb-4'>Your cart is empty.</p>
          <Link
            href='/'
            className='inline-block bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors'
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className='space-y-6'>
          {/* Cart Items */}
          <div className='space-y-4'>
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-md p-4 rounded-lg gap-4'
              >
                {/* Product Info */}
                <div className='flex items-center gap-4 flex-1'>
                  <div className='relative w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden flex-shrink-0'>
                    <Image
                      src={item.product.images[item.color]}
                      alt={item.product.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <h2 className='font-semibold text-lg'>
                      {item.product.name}
                    </h2>
                    <p className='text-sm text-gray-600'>
                      Size: {item.size.toUpperCase()} | Color: {item.color}
                    </p>
                    <p className='text-md font-medium text-gray-800 mt-1'>
                      £{item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-2 border border-gray-300 rounded-md'>
                    <button
                      onClick={() =>
                        handleDecreaseQty(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity
                        )
                      }
                      className='px-3 py-2 hover:bg-gray-100 transition-colors'
                      aria-label='Decrease quantity'
                    >
                      <Minus className='w-4 h-4' />
                    </button>
                    <span className='px-4 font-medium'>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncreaseQty(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity
                        )
                      }
                      className='px-3 py-2 hover:bg-gray-100 transition-colors'
                      aria-label='Increase quantity'
                    >
                      <Plus className='w-4 h-4' />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      handleRemove(item.product.id, item.size, item.color)
                    }
                    className='text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors'
                    aria-label='Remove item'
                  >
                    <Trash2 className='w-5 h-5' />
                  </button>
                </div>

                {/* Item Subtotal */}
                <div className='md:text-right md:min-w-[100px]'>
                  <p className='font-semibold text-lg'>
                    £{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className='bg-gray-50 p-6 rounded-lg mt-8'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-gray-600'>Subtotal:</span>
              <span className='font-medium'>£{totalPrice.toFixed(2)}</span>
            </div>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-gray-600'>Shipping:</span>
              <span className='font-medium'>Free</span>
            </div>
            <div className='border-t border-gray-300 pt-4 flex justify-between items-center'>
              <span className='text-xl font-bold'>Total:</span>
              <span className='text-2xl font-bold text-green-600'>
                £{totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Checkout  */}
            <Link
              href='/checkout'
              className='w-full mt-6 block text-center bg-gray-600 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition'
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
