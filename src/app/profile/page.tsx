"use client";

import { useAuthStore } from "@/store/authStore";
import RequireAuth from "@/component/RequireAuth";
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Edit3,
  Shield,
  Bell,
} from "lucide-react";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });

  // Update form data when user changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: "",
      });
    }
  }, [user]);

  const handleSave = () => {
    // Update the user in the store
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
    });
    setIsEditing(false);

    // TODO: Call your backend API here to persist changes
    // Example:
    // await fetch('/api/user/update', {
    //   method: 'PUT',
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <RequireAuth>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
        <div className='max-w-4xl mx-auto p-6 lg:p-8 space-y-8'>
          {/* HEADER */}
          <div className='relative'>
            <div className='absolute -top-20 -left-20 w-64 h-64 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse'></div>
            <div className='relative'>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent'>
                My Profile
              </h1>
              <p className='text-slate-600 mt-2'>
                Manage your personal information and preferences
              </p>
            </div>
          </div>

          {/* PROFILE CARD */}
          <div className='bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden'>
            {/* Cover Section */}
            <div className='h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative'>
              <div className='absolute inset-0 bg-black/10'></div>
            </div>

            {/* Avatar Section */}
            <div className='relative px-8 pb-8'>
              <div className='flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16'>
                <div className='relative group'>
                  <div className='w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white'>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <button className='absolute bottom-2 right-2 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-110 duration-300'>
                    <Camera className='w-4 h-4 text-slate-700' />
                  </button>
                </div>

                <div className='flex-1 mt-4 sm:mt-0'>
                  <h2 className='text-2xl font-bold text-slate-900'>
                    {user?.name || "User"}
                  </h2>
                  <p className='text-slate-600 mt-1'>
                    {user?.email || "email@example.com"}
                  </p>
                  <div className='flex items-center gap-2 mt-3'>
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium'>
                      <Shield className='w-3 h-3' /> Verified Account
                    </span>
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'>
                      <User className='w-3 h-3' /> Member since 2024
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className='inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300'
                >
                  <Edit3 className='w-4 h-4' />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>

          {/* FORM SECTIONS */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* MAIN INFO */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Personal Information */}
              <div className='bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl'>
                    <User className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-slate-900'>
                      Personal Information
                    </h3>
                    <p className='text-sm text-slate-500'>
                      Update your personal details
                    </p>
                  </div>
                </div>

                <div className='space-y-5'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Full Name
                    </label>
                    <div className='relative'>
                      <User className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                      <input
                        type='text'
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                          isEditing
                            ? "border-blue-300 focus:border-blue-500 bg-white"
                            : "border-slate-200 bg-slate-50"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        value={user?.name || ""}
                        readOnly={!isEditing}
                        placeholder='Enter your full name'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Email Address
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                      <input
                        type='email'
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                          isEditing
                            ? "border-blue-300 focus:border-blue-500 bg-white"
                            : "border-slate-200 bg-slate-50"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        value={user?.email || ""}
                        readOnly={!isEditing}
                        placeholder='Enter your email'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Phone Number
                    </label>
                    <div className='relative'>
                      <input
                        type='tel'
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                          isEditing
                            ? "border-blue-300 focus:border-blue-500 bg-white"
                            : "border-slate-200 bg-slate-50"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder='+1 (555) 000-0000'
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <button
                    onClick={handleSave}
                    className='mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-300'
                  >
                    <Save className='w-5 h-5' />
                    Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className='space-y-6'>
              {/* Quick Actions */}
              <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60'>
                <h3 className='font-semibold text-slate-900 mb-4'>
                  Quick Actions
                </h3>
                <div className='space-y-3'>
                  <button className='w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-700 hover:text-slate-900'>
                    <Bell className='w-5 h-5' />
                    <span className='text-sm font-medium'>Notifications</span>
                  </button>
                  <button className='w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-700 hover:text-slate-900'>
                    <Shield className='w-5 h-5' />
                    <span className='text-sm font-medium'>
                      Privacy Settings
                    </span>
                  </button>
                </div>
              </div>

              {/* Account Stats */}
              <div className='bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200/50'>
                <h3 className='font-semibold text-slate-900 mb-4'>
                  Account Stats
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-slate-600'>Total Orders</span>
                    <span className='font-bold text-slate-900'>12</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-slate-600'>Total Spent</span>
                    <span className='font-bold text-slate-900'>$2,459</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-slate-600'>
                      Wishlist Items
                    </span>
                    <span className='font-bold text-slate-900'>8</span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className='bg-red-50 p-6 rounded-2xl border border-red-200/50'>
                <h3 className='font-semibold text-red-900 mb-2'>Danger Zone</h3>
                <p className='text-sm text-red-600 mb-4'>
                  Permanently delete your account and all data
                </p>
                <button className='w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors'>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
