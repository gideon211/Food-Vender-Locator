import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import jollof from '../assets/friedrice.jpg';
import waakye from '../assets/chicken.jpg';
import banku from '../assets/kfc.jpg';

const dishes = [
  { 
    url: jollof, 
    name: 'ENJOY YOUR FAVOURITES', 
    story: 'From street food stalls to five-star kitchens, our fried rice brings comfort to your plate.',
    vendor: 'Mama’s Kitchen • Accra',
    rating: 4.8
  },
  { 
    url: waakye, 
    name: 'GO LOCAL!', 
    story: 'A taste of Ghana’s beloved waakye, made fresh daily with love and tradition.',
    vendor: 'Kojo’s Eatery • Kumasi',
    rating: 4.9
  },
  { 
    url: banku, 
    name: 'WHOLE MEALS', 
    story: 'Crispy chicken with bold seasoning — perfect for sharing (or keeping to yourself).',
    vendor: 'Grill House • Takoradi',
    rating: 4.7
  },
];

export default function FoodStoryCarousel() {
  return (
    <div className="w-full flex justify-center mt-[-2rem]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="overflow-hidden w-full"
      >
        {dishes.map((dish, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[20rem] sm:h-[25rem] md:h-[30rem] rounded-b-2xl overflow-hidden">
              {/* Background Image */}
              <img
                src={dish.url}
                alt={dish.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-[4000ms] scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Story Content */}
              <div className="absolute bottom-6 left-6 text-white max-w-[70%]">
                <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg">
                  {dish.name}
                </h2>
                <p className="mt-2 text-sm md:text-base opacity-90">
                  {dish.story}
                </p>
                <p className="mt-1 text-xs md:text-sm font-medium text-yellow-300">
                  {dish.vendor} • ⭐ {dish.rating}
                </p>
                <button className="mt-3 px-4 py-2 bg-orange-400 hover:bg-yellow-400 text-white font-semibold rounded-lg shadow-lg transition">
                  Taste It
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
