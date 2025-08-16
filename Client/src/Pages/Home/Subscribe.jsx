// src/Pages/Home/Subscribe.jsx
import React, { useState } from "react";
import swal from "sweetalert";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      swal("Oops!", "Please enter your email!", "warning");
      return;
    }
    // You can integrate API here later
    swal("Subscribed!", "Thank you for subscribing!", "success");
    setEmail("");
  };

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold  mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className=" mb-8">
          Stay updated with our latest food donations and charity events.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full sm:w-auto flex-1 h-12"
            required
          />
          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter   rounded-lg group cursor-pointer"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-full group-hover:h-56 "></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative">Subscribe</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
