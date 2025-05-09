import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { FaCode, FaMobileAlt, FaLaptopCode, FaPhoneAlt, FaChartBar, FaPaintBrush } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "tailwindcss/tailwind.css";

const categories = [
    { name: "Web Development", icon: <FaCode className="text-4xl" /> },
    { name: "Mobile App Development", icon: <FaMobileAlt className="text-4xl" /> },
    { name: ".NET Developer", icon: <FaLaptopCode className="text-4xl" /> },
    { name: "Customer Service", icon: <FaPhoneAlt className="text-4xl" /> },
    { name: "Data Analysis", icon: <FaChartBar className="text-4xl" /> },
    { name: "UI/UX Design", icon: <FaPaintBrush className="text-4xl" /> },
];

const JobCategoryCarousel = () => {
    return <>
      <div id="categories" className="bg-light-background-primary dark:bg-dark-background-primary py-12">
        <h2 className="text-3xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary pt-5 text-center">
            Our Featured Categories
        </h2>
        <div className="relative w-full flex items-center justify-center ">
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                spaceBetween={50}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 4,
                }}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }}
                autoplay={{
                    delay: 1500, 
                    disableOnInteraction: false,
                }}
                loop={true} // Infinite loop
                modules={[EffectCoverflow, Navigation, Autoplay]}
                className="w-[80%] max-w-4xl "
            >
                {categories.map((category, index) => (
                    <SwiperSlide
                        key={index}
                        className="flex flex-col items-center justify-center bg-light-primary-100 text-light-text-primary dark:bg-dark-primary-200 dark:text-dark-text-primary rounded-lg py-14 text-center transition-transform duration-500 hover:scale-120 hover:shadow-xl"
                    >
                        <div className="text-light-primary-400 dark:text-dark-primary-400 mb-4">{category.icon}</div>
                        <h3 className="text-md font-semibold text-light-text-primary dark:text-dark-text-primary">{category.name}</h3>
                    </SwiperSlide>
                ))}
                {/* Custom navigation buttons */}

            </Swiper>
            <div className="swiper-button-prev left-24 absolute transform -translate-y-1/2 text-light-text-primary dark:text-dark-text-primary text-3xl z-10 invisible md:visible">
            </div>
            <div className="swiper-button-next absolute right-24 transform -translate-y-1/2 text-light-text-primary dark:text-dark-text-primary text-3xl z-10 invisible md:visible">
            </div>
        </div>
      </div>
    </>;
};

export default JobCategoryCarousel;
