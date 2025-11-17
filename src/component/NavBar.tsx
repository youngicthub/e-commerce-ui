"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import SearchBar from "./SearchBar";
import { Bell, HomeIcon, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const NavBar = () => {
  const qty = useCartStore((s) => s.totalQuantity);

  return (
    <nav className='w-full flex items-center justify-between border-b border-gray-300'>
      <Link href='/' className='flex items-center gap-2'>
        <Image
          src='/logo.png'
          alt='logo'
          width={36}
          height={36}
          className='w-6 h-6 md:w-9 md:h-9'
        />
        <p className='hidden md:block  text-md font-medium tracking-wider'>
          V-Shops
        </p>
      </Link>

      <div className='flex items-center gap-6'>
        <SearchBar />

        <Link href='/'>
          <HomeIcon className='w-4 h-4 text-gray-600' />
        </Link>
        <Bell className='w-4 h-4 text-gray-600' />
        <Link href='/cart' className='relative'>
          <ShoppingCart className='w-4 h-4 text-gray-600' />
          {qty > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
              {qty}
            </span>
          )}
        </Link>
      </div>

      <Link href='/'>Sign-In</Link>
    </nav>
  );
};

export default NavBar;
