"use client";

import React from "react";
import RequireAuth from "@/component/RequireAuth";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import {
  ShoppingBag,
  User,
  LogOut,
  CreditCard,
  Package,
  Clock,
  ArrowRight,
  CheckCircle2,
  Truck,
} from "lucide-react";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <RequireAuth>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
        <div className='max-w-6xl mx-auto p-6 lg:p-8 space-y-10'>
          {/* HEADER */}
          <div className='relative'>
            <div className='absolute -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse'></div>
            <div className='absolute -bottom-20 -right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700'></div>

            <div className='relative'>
              <h1 className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent'>
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className='text-slate-600 mt-2 text-lg'>
                Manage your account, track orders, and update preferences.
              </p>
            </div>
          </div>

          {/* STATS OVERVIEW */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-2xl border border-blue-200/50 backdrop-blur-sm'>
              <p className='text-blue-700 text-sm font-medium mb-1'>
                Total Orders
              </p>
              <p className='text-3xl font-bold text-blue-900'>12</p>
            </div>
            <div className='bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200/50 backdrop-blur-sm'>
              <p className='text-emerald-700 text-sm font-medium mb-1'>
                Completed
              </p>
              <p className='text-3xl font-bold text-emerald-900'>8</p>
            </div>
            <div className='bg-gradient-to-br from-purple-50 to-purple-100/50 p-5 rounded-2xl border border-purple-200/50 backdrop-blur-sm'>
              <p className='text-purple-700 text-sm font-medium mb-1'>
                In Transit
              </p>
              <p className='text-3xl font-bold text-purple-900'>4</p>
            </div>
          </div>

          {/* GRID SECTIONS */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* ACCOUNT CARD */}
            <div className='group bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>

              <div className='relative'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow'>
                    <User className='w-6 h-6 text-white' />
                  </div>
                  <h2 className='text-xl font-semibold text-slate-900'>
                    Account Details
                  </h2>
                </div>

                <div className='space-y-2 mb-5'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs font-medium text-slate-500 uppercase tracking-wide'>
                      Name
                    </span>
                    <span className='text-sm font-medium text-slate-700'>
                      {user?.name}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs font-medium text-slate-500 uppercase tracking-wide'>
                      Email
                    </span>
                    <span className='text-sm font-medium text-slate-700 truncate'>
                      {user?.email}
                    </span>
                  </div>
                </div>

                <Link
                  href='/profile'
                  className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:gap-3 transition-all'
                >
                  Edit Profile
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
            </div>

            {/* ORDERS CARD */}
            <div className='group bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>

              <div className='relative'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow'>
                    <ShoppingBag className='w-6 h-6 text-white' />
                  </div>
                  <h2 className='text-xl font-semibold text-slate-900'>
                    My Orders
                  </h2>
                </div>

                <p className='text-sm text-slate-600 mb-5 leading-relaxed'>
                  Track your orders and view receipts with real-time updates.
                </p>

                <Link
                  href='/orders'
                  className='inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm group-hover:gap-3 transition-all'
                >
                  View Orders
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
            </div>

            {/* PAYMENT CARD */}
            <div className='group bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500'></div>

              <div className='relative'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow'>
                    <CreditCard className='w-6 h-6 text-white' />
                  </div>
                  <h2 className='text-xl font-semibold text-slate-900'>
                    Payment Methods
                  </h2>
                </div>

                <p className='text-sm text-slate-600 mb-5 leading-relaxed'>
                  Manage saved cards and billing details securely.
                </p>

                <Link
                  href='/payments'
                  className='inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:gap-3 transition-all'
                >
                  Manage Payments
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS SECTION */}
          <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60'>
            <div className='flex items-center justify-between mb-7'>
              <div className='flex items-center gap-3'>
                <div className='p-2.5 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl'>
                  <Package className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h2 className='text-2xl font-semibold text-slate-900'>
                    Recent Orders
                  </h2>
                  <p className='text-sm text-slate-500 mt-0.5'>
                    Your latest transactions
                  </p>
                </div>
              </div>
              <Link
                href='/orders'
                className='text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors'
              >
                View All
              </Link>
            </div>

            {/* Replace this with real dynamic data once backend is ready */}
            <div className='space-y-4'>
              <div className='group flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-slate-100 hover:to-slate-50 p-5 rounded-xl border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300'>
                <div className='flex items-start gap-4'>
                  <div className='p-2.5 bg-amber-100 rounded-lg group-hover:scale-110 transition-transform'>
                    <Clock className='w-5 h-5 text-amber-600' />
                  </div>
                  <div>
                    <p className='font-semibold text-slate-900 mb-1'>
                      Order #12932
                    </p>
                    <div className='flex items-center gap-2 text-sm text-slate-600'>
                      <span className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium'>
                        <Clock className='w-3 h-3' /> Pending
                      </span>
                      <span className='text-slate-400'>•</span>
                      <span>Placed 2 days ago</span>
                    </div>
                  </div>
                </div>
                <Link
                  href='/orders/12932'
                  className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm group-hover:gap-3 transition-all'
                >
                  View Details
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </div>

              <div className='group flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-slate-100 hover:to-slate-50 p-5 rounded-xl border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300'>
                <div className='flex items-start gap-4'>
                  <div className='p-2.5 bg-emerald-100 rounded-lg group-hover:scale-110 transition-transform'>
                    <CheckCircle2 className='w-5 h-5 text-emerald-600' />
                  </div>
                  <div>
                    <p className='font-semibold text-slate-900 mb-1'>
                      Order #12901
                    </p>
                    <div className='flex items-center gap-2 text-sm text-slate-600'>
                      <span className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium'>
                        <CheckCircle2 className='w-3 h-3' /> Delivered
                      </span>
                      <span className='text-slate-400'>•</span>
                      <span>1 week ago</span>
                    </div>
                  </div>
                </div>
                <Link
                  href='/orders/12901'
                  className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm group-hover:gap-3 transition-all'
                >
                  View Details
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
