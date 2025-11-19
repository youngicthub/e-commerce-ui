"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Bell, HomeIcon, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

const NavBar = () => {
  const qty = useCartStore((s) => s.totalQuantity);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const setUser = useAuthStore((s) => s.setUser);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <nav className='w-full flex items-center justify-between border-b border-gray-300 py-3 px-4 md:px-8'>
      {/* Logo */}
      <Link href='/' className='flex items-center gap-2'>
        <Image src='/logo.png' alt='logo' width={36} height={36} />
        <p className='hidden md:block text-md font-medium'>V-Shops</p>
      </Link>

      {/* Center Section */}
      <div className='flex items-center gap-6'>
        <SearchBar />

        <Link href='/'>
          <HomeIcon className='w-4 h-4 text-gray-600 cursor-pointer' />
        </Link>

        <Bell className='w-4 h-4 text-gray-600 cursor-pointer' />

        <Link href='/cart' className='relative'>
          <ShoppingCart className='w-4 h-4 text-gray-600 cursor-pointer' />
          {qty > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center'>
              {qty}
            </span>
          )}
        </Link>
      </div>

      {/* Right: Login or Profile */}
      {!user ? (
        <Link
          href='/login'
          className='flex items-center gap-1 text-gray-700 font-medium hover:text-black transition'
        >
          <User className='w-4 h-4' />
          <span>Login</span>
        </Link>
      ) : (
        <div ref={menuRef} className='relative'>
          <button
            onClick={() => setOpen((s) => !s)}
            className='flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100'
          >
            <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium'>
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className='hidden md:block font-medium'>{user.name}</span>
          </button>

          {open && (
            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20'>
              <Link
                href='/dashboard'
                className='block px-4 py-2 hover:bg-gray-50'
              >
                Dashboard
              </Link>
              <Link href='/orders' className='block px-4 py-2 hover:bg-gray-50'>
                My Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  setUser(null);
                }}
                className='w-full text-left px-4 py-2 hover:bg-gray-50'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
