import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Home.css';

import poza1 from '../../Assets/caine1.jpg';
import poza2 from '../../Assets/caine2.jpg';
import poza3 from '../../Assets/caine3.jpg';


const Home = () => {
  const images = [poza1, poza2, poza3, poza1, poza2, poza3];

  return (
    <div className="home">
      <h1 id="home-title">Bine ați venit! 🐶🐱</h1>

      <div className="content">
        <div className="info">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta odio ipsam velit, officiis nam, architecto autem quia magnam odit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, tenetur iure laborum enim aliquid quis qui iusto maiores, tempore quidem facilis consequatur voluptates eveniet molestiae incidunt, illo velit provident saepe. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam reiciendis nisi, magnam esse explicabo aliquam fugiat commodi, officiis, incidunt tempora sequi deserunt ratione odio. Rem debitis tenetur explicabo dolorum aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci a, cum labore facilis eaque maiores praesentium molestias maxime id ipsa nemo facere perferendis asperiores eveniet consequatur quia sequi officiis!
          </p>
        </div>

        <div className="swiper-container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
            speed={2000}
            loop={true}
          >
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Câine ${index}`}
                  // className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
