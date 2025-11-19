"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return setError("All fields are required.");
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setError(data.message || "Invalid login credentials");
      }

      localStorage.setItem("token", data.token);
      setUser(data.user); // Save user in Zustand

      router.push("/"); // redirect to home or dashboard
    } catch (err) {
      setError("Network error. Try again later.");
      setLoading(false);
    }
  }

  return (
    <div className='max-w-md mx-auto p-6 pt-12'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Welcome Back</h1>

      {error && (
        <p className='bg-red-100 text-red-700 px-4 py-3 mb-4 rounded'>
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className='space-y-5'>
        {/* Email */}
        <div>
          <label className='block mb-1 text-gray-700 font-medium'>
            Email Address
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-full p-3 border rounded focus:ring-2 focus:ring-black outline-none'
          />
        </div>

        {/* Password */}
        <div>
          <label className='block mb-1 text-gray-700 font-medium'>
            Password
          </label>
          <div className='relative'>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='w-full p-3 border rounded focus:ring-2 focus:ring-black outline-none'
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className='absolute right-3 top-3 cursor-pointer text-gray-700'
            >
              {showPass ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        {/* Login Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-black text-white py-3 rounded text-lg font-medium hover:bg-gray-900 transition'
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Signup Link */}
      <p className='text-center mt-4 text-gray-600'>
        Don’t have an account?{" "}
        <a href='/signup' className='text-black font-medium underline'>
          Create one
        </a>
      </p>
    </div>
  );
}
