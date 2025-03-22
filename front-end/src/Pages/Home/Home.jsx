import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import './Home.css';

import caine1 from '../../Assets/caine1.jpeg';
import caine2 from '../../Assets/caine2.jpg';
import caine3 from '../../Assets/caine3.jpg';
import caine4 from '../../Assets/caine4.jpg';
import hamster from '../../Assets/hamster.jpg';
import iepure from '../../Assets/iepure.jpg';
import papagal from '../../Assets/papagal.jpg';
import pisica1 from '../../Assets/pisica1.jpg';
import pisica2 from '../../Assets/pisica2.jpg';


const Home = () => {
  const images = [caine1, pisica1, caine3, papagal];
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "admin") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  return (
    <div className="home">
      <h1 id="home-title">Bine ați venit! 🐶🐱</h1>

      <div className="content-inceput">

        <div className="info">
          <p>
          În fiecare an, mii de animale ajung în adăposturi din cauza unor concepții greșite sau a abandonului. Animalele de rasă comună sunt adesea mai rezistente, mai sănătoase și mult mai ușor adaptabile decât cele de rasă pură. Acestea se adaptează rapid la medii noi, demonstrând loialitate și afecțiune față de noii lor stăpâni. Multe persoane tind să creadă că animalele de rasă pură sunt superioare, însă animalele comune aduc adesea numeroase avantaje, cum ar fi o imunitate mai puternică, un temperament echilibrat și o capacitate impresionantă de adaptare la diferite medii și situații de viață.
          </p><br />
          <p>
          Adăpostul nostru este dedicat salvării și îngrijirii animalelor abandonate, rănite sau abuzate, indiferent de specie. Considerăm că fiecare animal merită o șansă la o viață mai bună și facem tot posibilul pentru a le oferi dragostea, îngrijirea și atenția necesare. În prezent, găzduim sute de animale din diferite specii, inclusiv câini, pisici, iepuri, păsări și alte animale domestice, și lucrăm constant pentru a le asigura condiții excelente, tratamente medicale specializate și oportunități reale de adopție responsabilă. Echipa noastră dedicată este formată din profesioniști și voluntari pasionați care depun toate eforturile pentru ca animalele să fie recuperate fizic și emoțional.
          </p><br />
          <p>
          Misiunea noastră se extinde dincolo de simpla îngrijire a animalelor. Organizăm periodic evenimente educaționale pentru comunitate, promovând responsabilitatea față de animale și importanța adopției responsabile. Aceste evenimente includ ateliere interactive, sesiuni informative și activități pentru copii și adulți, menite să educe și să sensibilizeze publicul în privința nevoilor animalelor și a beneficiilor unei relații responsabile între oameni și animale. De asemenea, oferim programe ample de voluntariat care permit iubitorilor de animale să se implice activ în îngrijirea, socializarea și recuperarea animalelor noastre, oferindu-le șansa de a contribui direct la îmbunătățirea vieții acestora. Voluntarii noștri sunt parte integrantă a succesului nostru și sunt întotdeauna bineveniți să se alăture eforturilor noastre.
          </p><br />
        </div>

        <div className="swiper-container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            slidesPerGroup={1}
            loopAdditionalSlides={1}
            autoplay={{ delay: 4000 }}
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
        <img src={hamster} />
        <div>
          <h2>Salvare</h2>
          <p>Ne dedicăm salvării animalelor care se află în suferință. Prin eforturi constante, intervenim pentru a le oferi îngrijire medicală, adăpost și, mai ales, o nouă șansă la o viață sigură și fericită.</p>
          <a href="#">Află mai multe →</a>
        </div>
        <img src={pisica2} />
        <div>
          <h2>Îngrijire</h2>
          <p>Punem la dispoziție un refugiu sigur și plin de căldură pentru animalele aflate în nevoie, asigurându-le îngrijire medicală adecvată, hrană nutritivă și multă atenție din partea echipei noastre dedicate. Fiecare animăluț primește afecțiunea și grija de care are nevoie pentru a se recupera fizic și emoțional, astfel încât să fie pregătit să își găsească o familie iubitoare care să îi ofere un cămin permanent.</p>
          <a href="#">Află mai multe →</a>
        </div>
        <div>
          <h2>Adopție</h2>
          <p>Ne dedicăm cu pasiune și perseverență misiunii de a găsi un cămin sigur și iubitor pentru fiecare animal salvat. Credem că fiecare merită o a doua șansă, așa că depunem toate eforturile pentru a-i ajuta să își găsească familii care să le ofere afecțiune, stabilitate și grijă pe tot parcursul vieții.</p>
          <a href="#">Află mai multe →</a>
        </div>
        <img src={caine2} />
        <div>
          <h2>Educare</h2>
          <p>Ne dedicăm activ educării și responsabilizării comunității în ceea ce privește protecția și bunăstarea animalelor. Prin campanii de conștientizare, evenimente educative și colaborări cu instituții și organizații locale, încercăm să schimbăm mentalități și să promovăm respectul, compasiunea și responsabilitatea față de toate ființele necuvântătoare.</p>
          <a href="#">Află mai multe →</a>
        </div>
        <img src={iepure} />
      </div>

    </div>
  );
};

export default Home;
