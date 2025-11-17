"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

const CheckoutPage = () => {
  const { totalPrice, items } = useCartStore();

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Checkout</h1>

      {items.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg mb-4'>Your cart is empty.</p>
          <Link
            href='/cart'
            className='inline-block bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition'
          >
            Return to Cart
          </Link>
        </div>
      ) : (
        <>
          {/* Order Summary */}
          <div className='bg-white shadow-md rounded-lg p-5 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className='flex justify-between border-b py-2'
              >
                <div>
                  <p className='font-medium'>{item.product.name}</p>
                  <p className='text-sm text-gray-500'>
                    {item.size.toUpperCase()} • {item.color}
                  </p>
                </div>
                <p className='font-semibold'>
                  £{(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className='flex justify-between pt-4 text-lg font-bold'>
              <span>Total:</span>
              <span>£{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Section */}
          <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-3'>Complete Payment</h2>
            <p className='text-gray-600 mb-4'>
              Click the button below to make payment securely.
            </p>

            {/* Flutterwave Dynamic Amount Button */}
            <div className='mt-4'>
              <a
                href={`https://flutterwave.com/donate/e9vgrsi11bb2?amount=${totalPrice}`}
                target='_blank'
                className='block text-center bg-gray-600 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition'
              >
                Pay £{totalPrice.toFixed(2)} Securely
              </a>
            </div>

            <p className='text-xs text-gray-600 mt-3 text-center'>
              Payment is processed using Flutterwave secure gateway.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
