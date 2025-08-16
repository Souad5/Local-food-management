import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const DashboardCountDemo = () => {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  // Intersection Observer to trigger counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const statItems = [
    { title: "Donations", value: 1200 },
    { title: "Users", value: 450 },
    { title: "Role Requests", value: 75 },
    { title: "Featured Donations", value: 60 },
    { title: "Favorites Selected", value: 320 },
    { title: "Reviews Given", value: 180 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 ">
        Dashboard Stats
      </h2>

      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {statItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-6  rounded-2xl shadow-lg border"
          >
            <h3 className="text-4xl font-bold ">
              {inView ? <CountUp end={item.value} duration={2} /> : 0}
            </h3>
            <p className=" mt-2">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCountDemo;
