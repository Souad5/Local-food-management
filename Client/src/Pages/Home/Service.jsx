// src/components/Services.jsx
import { FaCode, FaMobileAlt, FaDatabase } from "react-icons/fa";

export default function Service() {
  const services = [
    { id: 1, icon: <FaCode size={40} />, title: "Web Development", desc: "Build modern and responsive websites." },
    { id: 2, icon: <FaMobileAlt size={40} />, title: "Mobile Apps", desc: "Cross-platform mobile applications." },
    { id: 3, icon: <FaDatabase size={40} />, title: "Database Management", desc: "Secure and scalable data solutions." },
  ];

  return (
    <section className="py-16  ">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 ">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8 ">
          {services.map((service) => (
            <div key={service.id} className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition border">
              <div className="flex justify-center text-indigo-600 dark:text-indigo-400 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 ">{service.title}</h3>
              <p className="text-gray-600 ">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
