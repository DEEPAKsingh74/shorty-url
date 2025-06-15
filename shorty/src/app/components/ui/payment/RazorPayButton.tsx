"use client";

import { useState } from "react";
import api from "@/network/api_config";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface RazorpayButtonProps {
  amount: number;
  description: string;
  urlCount?: number;
  className?: string;
  onSuccess?: () => void;
  onError?: (err: any) => void;
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  amount,
  description,
  className,
  onSuccess,
  onError,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const existing = document.querySelector("#razorpay-script");
      if (existing) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    setIsProcessing(true);
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      setIsProcessing(false);
      return;
    }

    try {
      const { data } = await api.post("/payment/create-order", {
        amount: amount * 100, // Razorpay expects paise
        currency: "INR",
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        name: "URL Analytics",
        amount: data.data.amount,
        currency: data.data.currency,
        description: description,
        order_id: data.data.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              payment_id: data.data.paymentId,
            });

            if (verifyRes.data.success) {

              await queryClient.invalidateQueries({ queryKey: ['urls count'] });
              await queryClient.refetchQueries({ queryKey: ['urls count'] });

              if (onSuccess) onSuccess();
              else router.push("/");
            } else {
              alert("Payment verification failed.");
              if (onError) onError("Verification failed");
            }
          } catch (err) {
            console.error("Verification failed", err);
            alert("Error verifying payment. Please contact support.");
            if (onError) onError(err);
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment creation failed", err);
      alert("Something went wrong. Please try again.");
      if (onError) onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className={`w-full flex items-center justify-center px-8 py-4 ${isProcessing ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-medium rounded-lg text-lg transition duration-200 ${className || ""}`}
    >
      {isProcessing ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default RazorpayButton;
