import { Carousel } from "react-responsive-carousel"; 
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const slides = [
    { id: 1, img: "/1.jpg", title: "Share Food, Spread Smiles", desc: "Turn your surplus into someone’s hope today." },
    { id: 2, img: "/2.jpg", title: "Together Against Hunger", desc: "Every meal counts. Every hand helps." },
    { id: 3, img: "/3.jpg", title: "Empowering Communities", desc: "Join our mission of sustainable giving." },
    { id: 4, img: "/4.jpg", title: "Hope Through Generosity", desc: "Your donation today feeds tomorrow’s future." },
  ];

  return (
    <div className="rounded-2xl shadow-xl overflow-hidden w-full lg:max-w-7xl md:max-w-5xl mx-auto mt-20">
      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={4000}
        stopOnHover
        swipeable
        emulateTouch
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="h-[200px] sm:h-[300px] md:h-[450px] lg:h-[600px] w-full object-cover opacity-60 dark:opacity-80"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 dark:bg-gray-900/50 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white dark:text-gray-100 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="mt-2 sm:mt-4 text-xs sm:text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-2xl">
                {slide.desc}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
