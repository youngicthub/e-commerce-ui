"use client";

import RequireAuth from "@/component/RequireAuth";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";

const mockOrders = [
  {
    id: "12932",
    status: "Pending",
    date: "2 days ago",
    total: "$149.99",
    items: 3,
    image: "📦",
  },
  {
    id: "12901",
    status: "Delivered",
    date: "1 week ago",
    total: "$89.50",
    items: 2,
    image: "📦",
  },
  {
    id: "12856",
    status: "In Transit",
    date: "3 days ago",
    total: "$234.00",
    items: 5,
    image: "📦",
  },
  {
    id: "12790",
    status: "Cancelled",
    date: "2 weeks ago",
    total: "$45.99",
    items: 1,
    image: "📦",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Delivered":
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        icon: CheckCircle2,
      };
    case "In Transit":
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: Truck,
      };
    case "Pending":
      return {
        bg: "bg-amber-100",
        text: "text-amber-700",
        icon: Clock,
      };
    case "Cancelled":
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
      };
    default:
      return {
        bg: "bg-slate-100",
        text: "text-slate-700",
        icon: Package,
      };
  }
};

export default function OrdersPage() {
  return (
    <RequireAuth>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
        <div className='max-w-6xl mx-auto p-6 lg:p-8 space-y-8'>
          {/* HEADER */}
          <div className='relative'>
            <div className='absolute -top-20 -left-20 w-64 h-64 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse'></div>
            <div className='relative flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
              <div>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent'>
                  My Orders
                </h1>
                <p className='text-slate-600 mt-2'>
                  Track and manage all your orders in one place
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <button className='inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors'>
                  <Filter className='w-4 h-4' />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
            <input
              type='text'
              placeholder='Search orders by ID, status, or date...'
              className='w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all'
            />
          </div>

          {/* STATS OVERVIEW */}
          <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
            <div className='bg-white p-5 rounded-2xl border border-slate-200/60 hover:shadow-md transition-shadow'>
              <p className='text-slate-600 text-sm mb-1'>Total Orders</p>
              <p className='text-3xl font-bold text-slate-900'>
                {mockOrders.length}
              </p>
            </div>
            <div className='bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200/50'>
              <p className='text-emerald-700 text-sm mb-1'>Delivered</p>
              <p className='text-3xl font-bold text-emerald-900'>
                {mockOrders.filter((o) => o.status === "Delivered").length}
              </p>
            </div>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-2xl border border-blue-200/50'>
              <p className='text-blue-700 text-sm mb-1'>In Transit</p>
              <p className='text-3xl font-bold text-blue-900'>
                {mockOrders.filter((o) => o.status === "In Transit").length}
              </p>
            </div>
            <div className='bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 rounded-2xl border border-amber-200/50'>
              <p className='text-amber-700 text-sm mb-1'>Pending</p>
              <p className='text-3xl font-bold text-amber-900'>
                {mockOrders.filter((o) => o.status === "Pending").length}
              </p>
            </div>
          </div>

          {/* ORDERS LIST */}
          <div className='space-y-4'>
            {mockOrders.map((order) => {
              const statusConfig = getStatusStyles(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className='group block bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-lg hover:border-slate-300 transition-all duration-300'
                >
                  <div className='flex items-center gap-6'>
                    {/* Order Icon */}
                    <div className='flex-shrink-0 w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform'>
                      {order.image}
                    </div>

                    {/* Order Info */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-4 mb-2'>
                        <div>
                          <h3 className='text-lg font-semibold text-slate-900 mb-1'>
                            Order #{order.id}
                          </h3>
                          <p className='text-sm text-slate-600'>
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='text-2xl font-bold text-slate-900'>
                            {order.total}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-3'>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${statusConfig.bg} ${statusConfig.text} rounded-full text-xs font-medium`}
                          >
                            <StatusIcon className='w-3.5 h-3.5' />
                            {order.status}
                          </span>
                          <span className='text-sm text-slate-500 flex items-center gap-1.5'>
                            <Clock className='w-4 h-4' />
                            {order.date}
                          </span>
                        </div>

                        <div className='inline-flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all'>
                          View Details
                          <ArrowRight className='w-4 h-4' />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* EMPTY STATE (Hidden when orders exist) */}
          {mockOrders.length === 0 && (
            <div className='text-center py-16 bg-white rounded-2xl border border-slate-200/60'>
              <div className='inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4'>
                <Package className='w-10 h-10 text-slate-400' />
              </div>
              <h3 className='text-xl font-semibold text-slate-900 mb-2'>
                No orders yet
              </h3>
              <p className='text-slate-600 mb-6'>
                Start shopping to see your orders here
              </p>
              <Link
                href='/'
                className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300'
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}
