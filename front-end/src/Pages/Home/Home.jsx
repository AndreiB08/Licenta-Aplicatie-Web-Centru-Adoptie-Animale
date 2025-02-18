import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Home.css';

import poza1 from '../../Assets/caine1.jpeg';
import poza2 from '../../Assets/caine2.jpg';
import poza3 from '../../Assets/caine3.jpg';
import poza4 from '../../Assets/caine4.jpg';


const Home = () => {
  const images = [poza1, poza2, poza3, poza4, poza1, poza2, poza3, poza4, poza1, poza2, poza3, poza4, poza1, poza2, poza3, poza4, poza1, poza2, poza3, poza4];

  return (
    <div className="home">
      <h1 id="home-title">Bine ați venit! 🐶🐱</h1>

      <div className="content-inceput">

        <div className="info">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta odio ipsam velit, officiis nam, architecto autem quia magnam odit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, tenetur iure laborum enim aliquid quis qui iusto maiores, tempore quidem facilis consequatur voluptates eveniet molestiae incidunt, illo velit provident saepe. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam reiciendis nisi, magnam esse explicabo aliquam fugiat commodi, officiis, incidunt tempora sequi deserunt ratione odio. Rem debitis tenetur explicabo dolorum aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci a, cum labore facilis eaque maiores praesentium molestias maxime id ipsa nemo facere perferendis asperiores eveniet consequatur quia sequi officiis!
          </p><br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta odio ipsam velit, officiis nam, architecto autem quia magnam odit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, tenetur iure laborum enim aliquid quis qui iusto maiores, tempore quidem facilis consequatur voluptates eveniet molestiae incidunt, illo velit provident saepe. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam reiciendis nisi, magnam esse explicabo aliquam fugiat commodi, officiis, incidunt tempora sequi deserunt ratione odio. Rem debitis tenetur explicabo dolorum aut? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci a, cum labore facilis eaque maiores praesentium molestias maxime id ipsa nemo facere perferendis asperiores eveniet consequatur quia sequi officiis!
          </p><br />
        </div>

        <div className="swiper-container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            slidesPerGroup={1}
            loopAdditionalSlides={1}
            autoplay={{ delay: 6000 }}
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

      <div className="content-info">
        <img src={poza1} />
        <p><h2>Salvare</h2><br />Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto illo officiis ex iste voluptatum, modi ducimus accusamus cumque molestias esse, consectetur eius explicabo saepe quisquam quos atque recusandae impedit. Beatae. <a href="#">Află mai multe →</a></p>
        <img src={poza2} />
        <p><h2>Îngrijire</h2><br />Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos tempora nulla dolorem molestiae aspernatur, quibusdam expedita error consequatur unde quia sequi, distinctio excepturi et atque adipisci, fugiat harum cum minima? <a href="#">Află mai multe →</a></p>
        <p><h2>Adopție</h2><br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic pariatur vero porro ex dolore eius recusandae blanditiis, veniam, culpa obcaecati repudiandae maxime dolorem mollitia aut, sunt nesciunt aliquid fugit. Nobis. <a href="#">Află mai multe →</a></p>
        <img src={poza3} />
        <p><h2>Educare</h2><br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam veritatis, nihil fugiat asperiores, mollitia deleniti ea aliquid ipsa ducimus quia, alias quod repellendus quasi maxime in eveniet incidunt laudantium eaque! <a href="#">Află mai multe →</a></p>
        <img src={poza4} />
      </div>

    </div>
  );
};

export default Home;
