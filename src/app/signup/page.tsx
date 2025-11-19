"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // password strength states
  const getPasswordStrength = () => {
    if (password.length < 4) return "weak";
    if (password.length < 8) return "medium";
    return "strong";
  };

  async function onSubmit(e: any) {
    e.preventDefault();

    // reset error state
    setErrorMsg("");

    // validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // save token and redirect
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (error) {
      setErrorMsg("Network error, try again.");
      setLoading(false);
    }
  }

  const strength = getPasswordStrength();

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-2xl p-8'>
        <h1 className='text-3xl font-semibold text-center mb-2'>
          Create Account
        </h1>
        <p className='text-gray-600 text-center mb-6'>
          Join <span className='font-semibold'>V-Shops</span> to start shopping
        </p>

        {/* Error message */}
        {errorMsg && (
          <div className='mb-4 p-3 bg-red-100 text-red-700 text-sm rounded'>
            {errorMsg}
          </div>
        )}

        <form onSubmit={onSubmit} className='space-y-5'>
          {/* Full Name */}
          <div>
            <label className='text-sm text-gray-700 font-medium'>
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your full name'
              className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition'
            />
          </div>

          {/* Email */}
          <div>
            <label className='text-sm text-gray-700 font-medium'>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              type='email'
              className='mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition'
            />
          </div>

          {/* Password with visibility toggle */}
          <div>
            <label className='text-sm text-gray-700 font-medium'>
              Password
            </label>
            <div className='relative'>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder='Create a password'
                className='mt-1 w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition'
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-4 text-gray-500 hover:text-black'
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className='mt-2 flex items-center gap-2 text-sm'>
                <span
                  className={`h-2 w-2 rounded-full ${
                    strength === "weak"
                      ? "bg-red-500"
                      : strength === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                ></span>
                <span
                  className={
                    strength === "weak"
                      ? "text-red-600"
                      : strength === "medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                >
                  {strength === "weak" && "Weak password"}
                  {strength === "medium" && "Medium strength"}
                  {strength === "strong" && "Strong password"}
                </span>
              </div>
            )}
          </div>

          {/* Signup button */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium text-md text-white transition
              ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-black hover:bg-gray-900"
              }
            `}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        {/* Login link */}
        <p className='text-center mt-5 text-sm text-gray-600'>
          Already have an account?
          <a
            href='/login'
            className='text-black font-medium underline ml-1 hover:text-gray-800'
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
