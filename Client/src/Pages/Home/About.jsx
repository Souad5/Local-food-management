import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold ">
          About Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl">
          Our mission is to connect people with opportunities to donate, volunteer, and make a difference in their community. We believe every small contribution can create a lasting impact.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className=" rounded-2xl shadow-lg p-8 border">
          <h2 className="text-2xl font-semibold  mb-2">Our Mission</h2>
          <p className="">
            To eliminate hunger and reduce food waste by connecting surplus food with people in need.
          </p>
        </div>
        <div className=" rounded-2xl shadow-lg p-8 border">
          <h2 className="text-2xl font-semibold  mb-2">Our Vision</h2>
          <p className="">
            A world where no one goes hungry and communities thrive on generosity and sharing.
          </p>
        </div>
        <div className=" rounded-2xl shadow-lg p-8 border">
          <h2 className="text-2xl font-semibold  mb-2">Our Values</h2>
          <p className="">
            Transparency, compassion, sustainability, and community empowerment are at the heart of everything we do.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
