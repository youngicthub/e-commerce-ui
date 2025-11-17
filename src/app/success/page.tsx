"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className='max-w-xl mx-auto text-center p-8'>
      <CheckCircle className='mx-auto text-gray-600 w-20 h-20 mb-4' />
      <h1 className='text-3xl font-bold mb-3'>Payment Successful </h1>

      <p className='text-gray-600 mb-6'>
        Thank you! Your order has been received and is being processed.
      </p>

      <Link
        href='/'
        className='bg-gray-600 text-white px-6 py-3 rounded-md inline-block hover:bg-gray-700'
      >
        Continue Shopping
      </Link>
    </div>
  );
}
