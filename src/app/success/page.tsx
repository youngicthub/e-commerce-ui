"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const txId =
    params.get("transaction_id") ||
    params.get("transactionId") ||
    params.get("tx_ref");
  const { items, totalPrice, clearCart } = useCartStore();
  const [status, setStatus] = useState("verifying");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!txId) {
      setStatus("no_tx");
      return;
    }

    // send to backend for verification
    (async () => {
      try {
        const res = await fetch("http://localhost:4000/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transaction_id: txId,
            items,
            total: totalPrice,
            customerEmail: "customer@example.com", // if you have user email pass real one
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setOrder(data.order);
          clearCart();
        } else {
          setStatus("failed");
          console.error(data);
        }
      } catch (err) {
        setStatus("error");
        console.error(err);
      }
    })();
  }, [txId]);

  if (status === "verifying")
    return <div className='p-6'>Verifying payment...</div>;
  if (status === "no_tx")
    return <div className='p-6'>No transaction id provided.</div>;
  if (status === "failed")
    return <div className='p-6'>Payment verification failed.</div>;
  if (status === "error")
    return <div className='p-6'>Error verifying payment.</div>;

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Payment Successful</h1>
      <p className='mb-4'>
        Thank you! Your payment was verified and order has been created.
      </p>

      {order && (
        <div className='bg-white p-4 rounded shadow'>
          <p>Order ID: {order._id}</p>
          <p>Total: £{order.total.toFixed(2)}</p>
        </div>
      )}

      <button
        onClick={() => router.push("/")}
        className='mt-6 px-4 py-2 bg-gray-800 text-white rounded'
      >
        Continue shopping
      </button>
    </div>
  );
}
