import { Col, Container, Row, Card} from "react-bootstrap";
import imgHallo from "../assets/img/hallo.png";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import HomepageCards from "../Components/HomepageCards";
import HomepageAccordions from "../Components/HomepageAccordions";
import AlquranImage from "../assets/img/alquran.jpg"
import SholatImage from "../assets/img/sholat.jpg"
import DoaImage from "../assets/img/doa.jpg"
import AsmaulHusnaImage from "../assets/img/asmaul-husna.jpg"
import { useEffect } from "react";
import FooterComponent from "../Components/FooterComponent";

const Homepage = () => {

  useEffect(() => {
    document.title = 'Beranda - ahmadzidni.site'
  },[])
  
  return (
    <>
      <div className="homepage d-flex align-items-center">
        <header className="w-100 min-vh-100">
          <Container>
            <Row className="d-flex align-items-center">
              <Col md={6} className="responsive-text-center">
                <h1>
                  <b>Hello World!!</b>
                  <br /> selamat datang di situs
                  <br />
                  <span>ahmadzidni.site</span>
                </h1>
                <p>Menjelajahi Dunia Digital</p>
                <a className="btn btn-info ms-1" href="https://www.youtube.com/@madzchannel3399">
                <i className="bi bi-youtube"></i> Youtube
                </a>
                <Link className="btn btn-info ms-1" to="/galery-project">
                  Gallery
                </Link>
              </Col>
              <Col md={6}>
                <img src={imgHallo} alt="IMG_HALLO" />
              </Col>
            </Row>
          </Container>
        </header>
      </div>
      <div className="w-100 daftarisi-section bg-sky-50">
        <Container>
          <Row className="text-center pt-5 pb-0 pb-lg-4">
            <h1 className="responsive-text fw-bold">Apa yang ada di ahmadzidni.site?</h1>
          </Row>
          <Row>
            <HomepageCards/>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col md="4">
              <Card className="mb-5 transisi">
              <Card.Img variant="top" src={AlquranImage}/>
                <Card.Body className="text-center">
                  <Card.Title>Al Quran Online</Card.Title>
                  <Card.Text>Baca dimana dan kapan saja</Card.Text>
                  <Link className="btn btn-info d-block" to="/Alquran/ayat">
                  Pilih Menu
                </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-3 transisi">
              <Card.Img variant="top" src={SholatImage}/>
                <Card.Body className="text-center">
                  <Card.Title>Jadwal Sholat</Card.Title>
                  <Card.Text>Cari jadwal sholat di kota anda</Card.Text>
                  <Link className="btn btn-info d-block" to="/Jadwalsholat/listkota">
                  Pilih Menu
                </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-5 transisi">
              <Card.Img variant="top" src={DoaImage}/>
                <Card.Body className="text-center">
                  <Card.Title>Doa Sehari Hari</Card.Title>
                  <Card.Text>Baca dimana dan kapan saja</Card.Text>
                  <Link className="btn btn-info d-block" to="/al-quran">
                  Pilih Menu
                </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4" className="offset-4">
              <Card className="mb-5 transisi">
              <Card.Img variant="top" src={AsmaulHusnaImage}/>
                <Card.Body className="text-center">
                  <Card.Title>Asmaul Husna</Card.Title>
                  <Card.Text>Cari jadwal sholat di kota anda</Card.Text>
                  <Link className="btn btn-info d-block" to="/al-quran">
                  Pilih Menu
                </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="accordion-section min-vh-100 w-100 bg-sky-100">
        <Container>
          <Row className="p-5 text-center">
            <h1 className="responsive-text fw-bold">Pertanyaan seputar ahmadzidni.site</h1>
          </Row>
          <Row>
            <HomepageAccordions/>
          </Row>
        </Container>
      </div>

      <div>
      <FooterComponent/>
      </div>
    </>
  );
};

export default Homepage;
