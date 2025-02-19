import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import './Home.css';

import poza1 from '../../Assets/caine1.jpeg';
import poza2 from '../../Assets/caine2.jpg';
import poza3 from '../../Assets/caine3.jpg';
import poza4 from '../../Assets/caine4.jpg';


const Home = () => {
  const images = [poza1, poza2, poza3, poza4];

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
            speed={4000}
            loop={true}
            allowTouchMove={false}
            navigation={false}
            pagination={{ clickable: false}}
          >
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Câine ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="content-info">
        <img src={poza1} />
        <div>
          <h2>Salvare</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis debitis aliquid qui alias ipsam facere, eum tenetur iusto nisi quaerat totam dolor sint laudantium, distinctio et esse odio voluptas harum.</p>
          <a href="#">Află mai multe →</a>
        </div>
        <img src={poza2} />
        <div>
          <h2>Îngrijire</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos soluta inventore maxime, vero enim cum accusantium rem aliquam. Nulla, repudiandae. Amet magnam error reprehenderit, rerum qui repudiandae fugiat? Optio, velit.</p>
          <a href="#">Află mai multe →</a>
        </div>
        <div>
          <h2>Adopție</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio accusamus vel laboriosam, nam sapiente pariatur? Totam, autem dolor doloribus, maiores velit consectetur ea ipsam minima debitis ab tempore sint iure.</p>
          <a href="#">Află mai multe →</a>
        </div>
        <img src={poza3} />
        <div>
          <h2>Educare</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed reprehenderit mollitia aliquam ullam delectus voluptate ad repellendus veritatis perferendis impedit, culpa reiciendis voluptatum voluptates nostrum minima expedita aspernatur! Labore, quo.</p>
          <a href="#">Află mai multe →</a>
        </div>
        <img src={poza4} />
      </div>

    </div>
  );
};

export default Home;
