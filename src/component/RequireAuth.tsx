"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (!stored) router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    // simple placeholder while redirect happens
    return <div className='p-6 text-center'>Redirecting to login…</div>;
  }

  return <>{children}</>;
}
