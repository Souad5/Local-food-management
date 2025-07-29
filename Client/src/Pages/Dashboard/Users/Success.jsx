// src/Pages/Success.jsx
import React from "react";
import { Link } from "react-router";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your payment. Your request has been submitted.
      </p>
      <Link to="/" className="btn btn-success">Go Back to Home</Link>
    </div>
  );
};

export default Success;
