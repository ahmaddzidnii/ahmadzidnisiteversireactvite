import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// BOOTSTRAP 5
import {InputGroup, Form} from 'react-bootstrap'


// Components
import FooterComponent from "../Components/FooterComponent";


const PreviewJadwalSholat = () => {
  const { idkota } = useParams();

  const formatDate = (date) => {
    return date < 10 ? `0${date}` : date;
  };

  // State
  const [jadwalharian, setJadwalHarian] = useState([]);
  const [jadwalbulanan, setJadwalBulanan] = useState([]);
  const [lokasi, setLokasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");


  const handleChange = (event) => {
    // Dapatkan value dari input tanggal
    const inputDateValue = event.target.value;

    // Memisahkan tahun, bulan, dan tanggal
    const [year, month, day] = inputDateValue.split("-");

    // Menggabungkan kembali dengan format "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;

    // Simpan ke dalam state
    setSelectedDate(formattedDate);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = formatDate(date.getMonth() + 1);
    const day = formatDate(date.getDate());
    return `${year}/${month}/${day}`;
  };
  const getCurrentDateBulanan = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = formatDate(date.getMonth() + 1);
    return `${year}/${month}`;
  };

  const tanggal = getCurrentDate();
  const tanggalBulanan = getCurrentDateBulanan();

  const URL = import.meta.env.VITE_JADWAL_SHOLAT_URL;

  const getJadwal = async () => {
    try {
      const response = await axios.get(`${URL}/jadwal/${idkota}/${tanggal}`);
      //console.log(response.data.data);
      setLokasi(response.data.data);
      setJadwalHarian(response.data.data.jadwal);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(true)
    }
  };
  

  const getJadwalBulanan = async () => {
    try {
      const UrlBulanan = import.meta.env.VITE_JADWAL_SHOLAT_BULANAN_URL
      const response = await axios.get(`${UrlBulanan}/${idkota}/${tanggalBulanan}`);
      // console.log(response.data.data.jadwal.filter((f) => f.tanggal.includes("01")));
      // console.log(response.data.data.jadwal);
      setJadwalBulanan(response.data.data.jadwal);
    } catch (error) {
      console.log(error.message)
      setLoading(true)
    }
  };

  useEffect(() => {
    document.title = `${lokasi.lokasi}`
  },[lokasi])
  useEffect(() => {
    getJadwal();
    getJadwalBulanan();
  }, [idkota]);
  if (loading) {
    return (
      <section className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="lds-facebook ">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <div className="bg-sky-200">
          <div className="container space-navbar">
            <div className="row">
              <div className="col-md-12"></div>
            </div>
            <div className="row">
              {
                <div className="card p-4 rounded-5">
                  <div className="card-body">
                  <h1 className="text-center fw-bold">TODAY</h1>
                    <h2 className="text-center">
                    <i className="bi bi-geo-alt-fill"></i> {lokasi.lokasi},{lokasi.daerah}
                    </h2>
                    <h4 className="text-center mb-5">{jadwalharian.tanggal}</h4>
                    <div className="container p-0">
                      <div className="row text-center">
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Imsak</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{jadwalharian.imsak}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Subuh</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{jadwalharian.subuh}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Terbit</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{jadwalharian.terbit}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Dhuha</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{jadwalharian.dhuha}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Dzuhur</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{jadwalharian.dzuhur}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Ashar</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{jadwalharian.ashar}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Maghrib</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{jadwalharian.maghrib}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Isya'</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{jadwalharian.isya}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="row text-center mt-5">            
              <div className="col-md-12"></div>
            </div>
            <div className="row my-3">
            <InputGroup  className="form-control p-0">
                  <Form.Control type="date" id="form" className="search mb-0 p-3 border-1 border-black" placeholder="🔎  cari tanggal...  (contoh 01/04/2023)" onChange={handleChange} />
                  <InputGroup.Text className="d-none d-lg-flex border-black" id="basic-addon2">
                    CTRL + M
                  </InputGroup.Text>
                </InputGroup>
            </div>
            <div className="row">
              {jadwalbulanan.filter(f => {
                return (
                  f.tanggal.toLowerCase().includes(selectedDate)
                )
              }).map((j, index) => {
                return (
                  <div className="card p-4 rounded-3 mb-3" key={index}>
                    <div className="card-body">
                      <h3 className="text-center mb-5">{j.tanggal}</h3>
                      <div className="container p-0">
                      <div className="row text-center">
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Imsak</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{j.imsak}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Subuh</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{j.subuh}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Terbit</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{j.terbit}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Dhuha</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{j.dhuha}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Dzuhur</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{j.dzuhur}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Ashar</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{j.ashar}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Maghrib</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{j.maghrib}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Isya'</h3>
                          <span className="badge bg-primary mb-4 fs-5 rounded-pill">{j.isya}</span>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                );
              })};
            </div>
          </div>
        </div>
        <div >
          <FooterComponent />
        </div>
      </>
    );
  }
  return (
    <div>
      <div>
        <div className="container">
          <h1 className="mb-4">{count} Komentar</h1>
          <div className="row">
            {data.map((d) => {
              const formatedDate = `${new Date(d.Tanggal).getDate()}-${new Date(d.Tanggal).getMonth()+1}-${new Date(d.Tanggal).getFullYear()} ${new Date(d.Tanggal).getHours()}:${new Date(d.Tanggal).getMinutes()}`;
              console.log(formatedDate)
              return (
                <div className="col-md-12 mb-3" key={d.id}>
                  <div className="card">
                    <div className="card-header">
                      <div>
                        <div className="d-flex align-items-center">
                          <div className="col-md-1">
                          <img className="img-fluid rounded-circle img-profile" src={avatar} alt="profil" />
                          </div>
                          <div className="col-md-11">
                            <strong>{d.nama}</strong>
                            <h6 className="mt-2">{d.email}</h6>
                            <h6 className="mt-2">{formatedDate}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">{d.pesan}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewJadwalSholat;
