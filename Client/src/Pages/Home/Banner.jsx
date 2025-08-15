import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  const images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
  ];

  return (
    <div >
      <div className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          loop={true}
          className="mySwiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={`./${img}`}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[520px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
