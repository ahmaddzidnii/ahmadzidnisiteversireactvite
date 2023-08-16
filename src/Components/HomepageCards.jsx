// BS 5
import { Card } from "react-bootstrap";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";

import AlquranImage from "../assets/img/alquran.jpg"
import SholatImage from "../assets/img/sholat.jpg"
import DoaImage from "../assets/img/doa.jpg"
import AsmaulHusnaImage from "../assets/img/asmaul-husna.jpg"



const HomepageCards = () => {
  return (
    <div>
          <Swiper
              slidesPerView={1}
              spaceBetween={10}
              autoplay={{
                delay: 10000,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                576: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper d-lg-none"
            >
              <SwiperSlide className="p-4">
              <Card className="mb-3 card-shadow">
              <Card.Img variant="top" src={AlquranImage}/>
                <Card.Body className="text-center">
                  <Card.Title>Al Quran Online</Card.Title>
                  <Card.Text>Baca dimana dan kapan saja</Card.Text>
                  <Link className="btn btn-info d-block" to="/Alquran/ayat">
                  Pilih Menu
                </Link>
                </Card.Body>
              </Card>
              </SwiperSlide>
              <SwiperSlide className="p-4">
              <Card className="mb-3 card-shadow">
              <Card.Img variant="top" src={SholatImage}/>
                <Card.Body className="text-center">
                  <Card.Title>Jadwal Sholat</Card.Title>
                  <Card.Text>Cari jadwal sholat di kota anda</Card.Text>
                  <Link className="btn btn-info d-block" to="/Jadwalsholat/listkota">
                  Pilih Menu
                </Link>
                </Card.Body>
              </Card>
              </SwiperSlide>
              <SwiperSlide className="p-4">
              <Card className="mb-3 card-shadow">
              <Card.Img variant="top" src={DoaImage}/>
                <Card.Body className="text-center">
                  <Card.Title>Doa Sehari Hari</Card.Title>
                  <Card.Text>Baca dimana dan kapan saja</Card.Text>
                  <Link className="btn btn-info d-block" to="/Alquran">
                  Pilih Menu
                </Link>
                </Card.Body>
              </Card>
              </SwiperSlide>
              <SwiperSlide className="p-4">
              <Card className="mb-3 card-shadow">
              <Card.Img variant="top" src={AsmaulHusnaImage}/>
                <Card.Body className="text-center">
                  <Card.Title>Asmaul Husna</Card.Title>
                  <Card.Text>Cari jadwal sholat di kota anda</Card.Text>
                  <Link className="btn btn-info d-block" to="/Asmaulhusna">
                  Pilih Menu
                </Link>
                </Card.Body>
              </Card>
              </SwiperSlide>
            </Swiper>
    </div>
  )
}

export default HomepageCards