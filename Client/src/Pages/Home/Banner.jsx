import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"].map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`./${img}`}
              alt={`Slide ${index + 1}`}
              className="md:w-full h-[250px] md:h-[400px] lg:h-[480px] rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
