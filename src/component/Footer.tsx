import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className='mt-16 flex flex-col md:flex-row md:justify-between p-8 gap-8 md:gap-0 rounded-lg bg-gray-800'>
      <div className='flex flex-col items-center gap-4 md:items-start'>
        <Link href='/' className='flex items-center gap-4 '>
          <Image src='/logo.png' alt='Logo' width={36} height={36} />
          <p className='text-md font-medium tracking-wider hidden md:block text-white'>
            V-Shops
          </p>
        </Link>

        <p className='text-white text-sm'>&copy; 2025 V-Shops</p>
        <p className='text-white text-sm'>All Rights Reserved</p>
      </div>

      <div className='flex flex-col gap-2 text-sm text-gray-400 items-center md:items-start'>
        <p className='text-sm text-amber-50'>Links</p>
        <Link href='/' className='hover:text-white'>
          HomePage
        </Link>
        <Link href='/' className='hover:text-white'>
          Contact
        </Link>
        <Link href='/' className='hover:text-white'>
          Terms of Service
        </Link>
        <Link href='/' className='hover:text-white'>
          Privacy Policies
        </Link>
      </div>
      <div className='flex flex-col gap-2 text-sm text-gray-400 items-center md:items-start'>
        <p className='text-sm text-amber-50'>Links</p>
        <Link href='/' className='hover:text-white'>
          All Products
        </Link>
        <Link href='/' className='hover:text-white'>
          New Arrivals
        </Link>
        <Link href='/' className='hover:text-white'>
          Best Sellers
        </Link>
        <Link href='/' className='hover:text-white'>
          Sales
        </Link>
      </div>
      <div className='flex flex-col gap-2 text-sm text-gray-400 items-center md:items-start'>
        <p className='text-sm text-amber-50'>Links</p>
        <Link href='/' className='hover:text-white'>
          About
        </Link>
        <Link href='/' className='hover:text-white'>
          Contact
        </Link>
        <Link href='/' className='hover:text-white'>
          Blog
        </Link>
        <Link href='/' className='hover:text-white'>
          Affiliate Programs
        </Link>
      </div>
    </div>
  );
};

export default Footer;
