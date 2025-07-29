// src/Pages/Dashboard/Charity/CheckoutForm.jsx
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

export const CheckoutForm = ({ clientSecret, handleRequest, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setProcessing(true);

    // First, create PaymentIntent
    const paymentReady = await handleRequest();
    if (!paymentReady) {
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        await onPaymentSuccess(result.paymentIntent);
        setProcessing(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-3 rounded mb-4" />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : "Pay $25"}
      </button>
    </form>
  );
};
