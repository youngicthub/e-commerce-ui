"use client";

import RequireAuth from "@/component/RequireAuth";
import {
  CreditCard,
  Plus,
  Lock,
  Trash2,
  Check,
  Calendar,
  Building2,
  Shield,
} from "lucide-react";
import { useState } from "react";

export default function PaymentsPage() {
  const [cards] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
      cardHolder: "John Doe",
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "09/26",
      isDefault: false,
      cardHolder: "John Doe",
    },
  ]);

  const getCardGradient = (type: string) => {
    switch (type) {
      case "Visa":
        return "from-blue-500 to-blue-700";
      case "Mastercard":
        return "from-orange-500 to-red-600";
      case "Amex":
        return "from-teal-500 to-cyan-600";
      default:
        return "from-slate-700 to-slate-900";
    }
  };

  return (
    <RequireAuth>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
        <div className='max-w-5xl mx-auto p-6 lg:p-8 space-y-8'>
          {/* HEADER */}
          <div className='relative'>
            <div className='absolute -top-20 -left-20 w-64 h-64 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse'></div>
            <div className='relative'>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent'>
                Payment Methods
              </h1>
              <p className='text-slate-600 mt-2'>
                Manage your cards and payment preferences securely
              </p>
            </div>
          </div>

          {/* SECURITY BADGE */}
          <div className='bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-2xl p-5'>
            <div className='flex items-start gap-4'>
              <div className='p-3 bg-emerald-100 rounded-xl'>
                <Shield className='w-6 h-6 text-emerald-600' />
              </div>
              <div>
                <h3 className='font-semibold text-emerald-900 mb-1'>
                  Your payments are secure
                </h3>
                <p className='text-sm text-emerald-700'>
                  All payment information is encrypted and stored securely. We
                  never share your card details.
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* SAVED CARDS */}
            <div className='lg:col-span-2 space-y-6'>
              <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl'>
                      <CreditCard className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <h2 className='text-xl font-semibold text-slate-900'>
                        Saved Cards
                      </h2>
                      <p className='text-sm text-slate-500'>
                        Manage your payment methods
                      </p>
                    </div>
                  </div>
                  <button className='inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300'>
                    <Plus className='w-4 h-4' />
                    Add Card
                  </button>
                </div>

                {cards.length > 0 ? (
                  <div className='space-y-4'>
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className='group relative overflow-hidden rounded-2xl'
                      >
                        {/* Card Display */}
                        <div
                          className={`bg-gradient-to-br ${getCardGradient(
                            card.type
                          )} p-6 text-white relative overflow-hidden`}
                        >
                          {/* Background Pattern */}
                          <div className='absolute inset-0 opacity-10'>
                            <div className='absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32'></div>
                            <div className='absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24'></div>
                          </div>

                          {/* Card Content */}
                          <div className='relative'>
                            <div className='flex items-start justify-between mb-8'>
                              <div className='flex items-center gap-2'>
                                <CreditCard className='w-8 h-8' />
                                <span className='text-lg font-semibold'>
                                  {card.type}
                                </span>
                              </div>
                              {card.isDefault && (
                                <span className='flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium'>
                                  <Check className='w-3 h-3' /> Default
                                </span>
                              )}
                            </div>

                            <div className='space-y-4'>
                              <div>
                                <p className='text-white/70 text-xs mb-1'>
                                  Card Number
                                </p>
                                <p className='text-xl font-mono tracking-wider'>
                                  •••• •••• •••• {card.last4}
                                </p>
                              </div>

                              <div className='flex items-end justify-between'>
                                <div>
                                  <p className='text-white/70 text-xs mb-1'>
                                    Card Holder
                                  </p>
                                  <p className='font-medium'>
                                    {card.cardHolder}
                                  </p>
                                </div>
                                <div className='text-right'>
                                  <p className='text-white/70 text-xs mb-1'>
                                    Expires
                                  </p>
                                  <p className='font-medium'>{card.expiry}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className='bg-slate-50 border-t border-slate-200/60 p-4 flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            {!card.isDefault && (
                              <button className='text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'>
                                Set as Default
                              </button>
                            )}
                          </div>
                          <button className='flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors'>
                            <Trash2 className='w-4 h-4' />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-12'>
                    <div className='inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4'>
                      <CreditCard className='w-10 h-10 text-slate-400' />
                    </div>
                    <h3 className='text-lg font-semibold text-slate-900 mb-2'>
                      No saved cards yet
                    </h3>
                    <p className='text-sm text-slate-600 mb-6'>
                      Add a payment method to make checkout faster and easier
                    </p>
                    <button className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300'>
                      <Plus className='w-5 h-5' />
                      Add Your First Card
                    </button>
                  </div>
                )}
              </div>

              {/* BILLING HISTORY */}
              <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl'>
                    <Calendar className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h2 className='text-xl font-semibold text-slate-900'>
                      Billing History
                    </h2>
                    <p className='text-sm text-slate-500'>
                      View your past transactions
                    </p>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/50 hover:border-slate-300 transition-colors'>
                    <div>
                      <p className='font-medium text-slate-900'>Order #12932</p>
                      <p className='text-sm text-slate-600'>
                        Nov 15, 2024 • Visa ••42
                      </p>
                    </div>
                    <span className='font-semibold text-slate-900'>
                      $149.99
                    </span>
                  </div>

                  <div className='flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/50 hover:border-slate-300 transition-colors'>
                    <div>
                      <p className='font-medium text-slate-900'>Order #12901</p>
                      <p className='text-sm text-slate-600'>
                        Nov 8, 2024 • Mastercard ••88
                      </p>
                    </div>
                    <span className='font-semibold text-slate-900'>$89.50</span>
                  </div>

                  <button className='w-full mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'>
                    View All Transactions →
                  </button>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className='space-y-6'>
              {/* PAYMENT SETTINGS */}
              <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60'>
                <h3 className='font-semibold text-slate-900 mb-4'>
                  Payment Settings
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-4 bg-slate-50 rounded-xl'>
                    <div className='flex items-center gap-3'>
                      <Lock className='w-5 h-5 text-slate-600' />
                      <div>
                        <p className='text-sm font-medium text-slate-900'>
                          Auto-pay
                        </p>
                        <p className='text-xs text-slate-500'>
                          Enable automatic payments
                        </p>
                      </div>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input type='checkbox' className='sr-only peer' />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className='flex items-center justify-between p-4 bg-slate-50 rounded-xl'>
                    <div className='flex items-center gap-3'>
                      <Shield className='w-5 h-5 text-slate-600' />
                      <div>
                        <p className='text-sm font-medium text-slate-900'>
                          3D Secure
                        </p>
                        <p className='text-xs text-slate-500'>
                          Extra security layer
                        </p>
                      </div>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        className='sr-only peer'
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* BILLING ADDRESS */}
              <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60'>
                <div className='flex items-center gap-3 mb-4'>
                  <Building2 className='w-5 h-5 text-slate-600' />
                  <h3 className='font-semibold text-slate-900'>
                    Billing Address
                  </h3>
                </div>
                <div className='text-sm text-slate-600 space-y-1 mb-4'>
                  <p>123 Main Street</p>
                  <p>Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
                <button className='text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'>
                  Update Address
                </button>
              </div>

              {/* HELP */}
              <div className='bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/50'>
                <h3 className='font-semibold text-slate-900 mb-2'>
                  Need Help?
                </h3>
                <p className='text-sm text-slate-600 mb-4'>
                  Having issues with payments? Our support team is here to help.
                </p>
                <button className='w-full px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 rounded-lg text-sm font-medium transition-colors border border-slate-200'>
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
