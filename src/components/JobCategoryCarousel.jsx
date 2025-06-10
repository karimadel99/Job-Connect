import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay, Pagination } from 'swiper/modules';
import { 
  FaCode, 
  FaMobileAlt, 
  FaLaptopCode, 
  FaDatabase, 
  FaServer, 
  FaPaintBrush, 
  FaRobot, 
  FaShieldAlt, 
  FaGitAlt, 
  FaCogs, 
  FaProjectDiagram,
  FaLayerGroup,
  FaPlug,
  FaChartLine
} from "react-icons/fa";
import { getAllTags } from "../api/authApi";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "tailwindcss/tailwind.css";

// Icon mapping for different categories
const getIconForCategory = (category) => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('algorithm')) return <FaProjectDiagram className="text-5xl" />;
  if (categoryLower.includes('api')) return <FaPlug className="text-5xl" />;
  if (categoryLower.includes('back end') || categoryLower.includes('backend')) return <FaServer className="text-5xl" />;
  if (categoryLower.includes('data structure')) return <FaLayerGroup className="text-5xl" />;
  if (categoryLower.includes('database')) return <FaDatabase className="text-5xl" />;
  if (categoryLower.includes('design pattern')) return <FaCogs className="text-5xl" />;
  if (categoryLower.includes('devops')) return <FaServer className="text-5xl" />;
  if (categoryLower.includes('front end') || categoryLower.includes('frontend')) return <FaLaptopCode className="text-5xl" />;
  if (categoryLower.includes('machine learning')) return <FaRobot className="text-5xl" />;
  if (categoryLower.includes('mobile')) return <FaMobileAlt className="text-5xl" />;
  if (categoryLower.includes('software engineering')) return <FaCode className="text-5xl" />;
  if (categoryLower.includes('system design')) return <FaProjectDiagram className="text-5xl" />;
  if (categoryLower.includes('ui/ux') || categoryLower.includes('design')) return <FaPaintBrush className="text-5xl" />;
  if (categoryLower.includes('git') || categoryLower.includes('version control')) return <FaGitAlt className="text-5xl" />;
  if (categoryLower.includes('security')) return <FaShieldAlt className="text-5xl" />;
  
  // Default icon for unknown categories
  return <FaCode className="text-5xl" />;
};

const JobCategoryCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await getAllTags();
        
        if (result.success) {
          // Filter out invalid entries like "string" and map to objects with icons
          const validCategories = result.data
            .filter(tag => tag && tag !== "string" && typeof tag === "string")
            .map(tag => ({
              name: tag,
              icon: getIconForCategory(tag)
            }));
          setCategories(validCategories);
        } else {
          setError(result.error || 'Failed to fetch categories');
        }
      } catch (err) {
        setError('An error occurred while fetching categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div id="categories" className="bg-gradient-to-br from-light-background-primary via-light-primary-50 to-light-background-primary dark:from-dark-background-primary dark:via-dark-primary-50 dark:to-dark-background-primary py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary text-center">
            Our Featured <span className="text-light-primary-400 dark:text-dark-primary-500">Categories</span>
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary text-center mb-16 max-w-2xl mx-auto">
            Explore diverse career opportunities across cutting-edge technologies and industries
          </p>
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-light-primary-200 dark:border-dark-primary-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-light-primary-400 dark:border-dark-primary-400 border-t-transparent absolute top-0 left-0"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="categories" className="bg-gradient-to-br from-light-background-primary via-light-primary-50 to-light-background-primary dark:from-dark-background-primary dark:via-dark-primary-50 dark:to-dark-background-primary py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary text-center">
            Our Featured <span className="text-light-primary-400 dark:text-dark-primary-500">Categories</span>
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-lg">
                Failed to load categories. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="categories" className="bg-gradient-to-br from-light-background-primary via-light-primary-50 to-light-background-primary dark:from-dark-background-primary dark:via-dark-primary-50 dark:to-dark-background-primary py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-light-primary-200 dark:bg-dark-primary-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-light-primary-300 dark:bg-dark-primary-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
            Our Featured <span className="text-light-primary-400 dark:text-dark-primary-500">Categories</span>
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Explore diverse career opportunities across cutting-edge technologies and industries
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={30}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 300,
              modifier: 1.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev"
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 1500, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: false,
            }}
            loop={true}
            loopAdditionalSlides={4}
            watchSlidesProgress={true}
            modules={[EffectCoverflow, Navigation, Autoplay, Pagination]}
            className="category-swiper pb-12"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide
                key={index}
                className="!w-80 !h-auto"
              >
                <div className="group relative bg-white dark:bg-dark-primary-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-light-primary-100 dark:border-dark-primary-300 overflow-hidden">
                  {/* Decorative circle */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-light-primary-100 dark:bg-dark-primary-200 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Icon container */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-light-primary-400 to-light-primary-500 dark:from-dark-primary-400 dark:to-dark-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      {category.icon}
                    </div>
                    
                    {/* Category name */}
                    <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-3 group-hover:text-light-primary-500 dark:group-hover:text-dark-primary-400 transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary opacity-80">
                      Explore opportunities
                    </p>
                    
                    {/* Hover effect arrow */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 mx-auto text-light-primary-400 dark:text-dark-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="custom-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-dark-primary-100 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-light-primary-50 dark:hover:bg-dark-primary-200 transition-all duration-200 group border border-light-primary-200 dark:border-dark-primary-300">
            <svg className="w-6 h-6 text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary-500 dark:group-hover:text-dark-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          
          <div className="custom-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-dark-primary-100 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-light-primary-50 dark:hover:bg-dark-primary-200 transition-all duration-200 group border border-light-primary-200 dark:border-dark-primary-300">
            <svg className="w-6 h-6 text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary-500 dark:group-hover:text-dark-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .category-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        
        .category-swiper .swiper-pagination-bullet {
          background: rgb(var(--light-primary-400)) !important;
          opacity: 0.3 !important;
          width: 12px !important;
          height: 12px !important;
        }
        
        .category-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
        
        .dark .category-swiper .swiper-pagination-bullet {
          background: rgb(var(--dark-primary-400)) !important;
        }
        

      `}</style>
    </div>
  );
};

export default JobCategoryCarousel;
