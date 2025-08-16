import React, { useState } from "react";
import swal from "sweetalert";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Success!",
      text: "Your message has been sent!",
      icon: "success",
      button: "OK",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold  text-center mb-8">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold ">
              Address
            </h2>
            <p className="">
              Bashundhara, Dhaka, Bangladesh
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold ">
              Email
            </h2>
            <p className="">
              souadalkabir@gmail.com
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold ">
              Phone
            </h2>
            <p className="">+8801830807523</p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className=" rounded-2xl shadow-lg p-8 flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
            rows={5}
            required
          />
          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter   rounded-lg group cursor-pointer"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-full group-hover:h-56 "></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative">View Details</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
