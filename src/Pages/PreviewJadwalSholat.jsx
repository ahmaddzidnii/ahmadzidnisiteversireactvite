import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// BOOTSTRAP 5
import { InputGroup, Form } from "react-bootstrap";

// Components
import FooterComponent from "../Components/FooterComponent";

const PreviewJadwalSholat = () => {
  const { idkota } = useParams();

  const formatDate = (date) => {
    return date < 10 ? `0${date}` : date;
  };

  // State
  const [jadwalharian, setJadwalHarian] = useState([]);
  const [searchjadwal, setSearchJadwal] = useState([]);
  const [searchjadwalhidden, setSearchJadwalHidden] = useState([]);
  const [loadingsearchjadwal, setLoadingSearchJadwal] = useState(true);
  const [lokasi, setLokasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [showCard, setShowCard] = useState(false); // Tambah state untuk menampilkan card
  const [handlenotfound, setHandleNotFound] = useState({});

  // console.log(selectedDate)

  const handleChange = (event) => {
    // Dapatkan value dari input tanggal
    const inputDateValue = event.target.value;

    // Memisahkan tahun, bulan, dan tanggal
    const [year, month, day] = inputDateValue.split("-");

    // Menggabungkan kembali dengan format "dd/mm/yyyy"
    const formattedDate = `${year}/${month}/${day}`;

    // Simpan ke dalam state
    setSelectedDate(formattedDate);
    setLoadingSearchJadwal(true);
    setShowCard(false);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = formatDate(date.getMonth() + 1);
    const day = formatDate(date.getDate());
    return `${year}/${month}/${day}`;
  };

  const tanggal = getCurrentDate();

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
      setLoading(true);
    }
  };

  const getSearchJadwal = async () => {
    try {
      const response = await axios.get(`${URL}/jadwal/${idkota}/${selectedDate}`);
      // console.log(response.data.data.jadwal.filter((f) => f.tanggal.includes("01")));
      // console.log(response.data);
      setHandleNotFound(response.data);
      setSearchJadwal(response.data.data.jadwal);
      setSearchJadwalHidden(response.data);
      setLoadingSearchJadwal(false);
      // Tampilkan card setelah delay selama 1 detik
      setTimeout(() => {
        setShowCard(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = `${lokasi.lokasi}`;
  }, [lokasi]);

  useEffect(() => {
    getSearchJadwal();
    setLoadingSearchJadwal(false);
  }, [selectedDate]);

  useEffect(() => {
    getJadwal();
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
        <div className="bg-sky-50">
          <div className="container space-navbar">
            <div className="row">
              <div className="col-md-12"></div>
            </div>
            <div className="row">
              {
                <div className="card p-4 rounded-5 bg-sky-100">
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
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{jadwalharian.imsak}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Subuh</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{jadwalharian.subuh}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Terbit</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{jadwalharian.terbit}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Dhuha</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{jadwalharian.dhuha}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Dzuhur</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{jadwalharian.dzuhur}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Ashar</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{jadwalharian.ashar}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Maghrib</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{jadwalharian.maghrib}</span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Isya'</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{jadwalharian.isya}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="row text-center mt-5">
              <div className="col-md-12 mt-5">
                <h1>Cari Jadwal Sesuai Tanggal</h1>
              </div>
            </div>
            <div className="row my-3">
              <InputGroup className="form-control p-0">
                <Form.Control type="date" id="form" className="search mb-0 p-3 border-1 border-black" placeholder="🔎  cari tanggal...  (contoh 01/04/2023)" onChange={handleChange} />
                <InputGroup.Text className="d-none d-lg-flex border-black bg-sky-100" id="basic-addon2">
                  CTRL + M
                </InputGroup.Text>
              </InputGroup>
            </div>
            <div className="min-vh-100">
              <section className={loadingsearchjadwal === true ? "d-flex align-items-center justify-content-center" : "d-none"}>
                <div className="lds-facebook ">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </section>

              {/* Alert Not Found */}

              <section className={handlenotfound.status !== false ? 'd-none': ""}>
                <div className="alert alert-info alert-dismissible fade show text-center" role="alert">
                  <strong>Mohon maaf,</strong> data tidak ditemukan atau tidak terdapat di data base. pastikan kamu sudah memilih tanggal atau kamu bisa cari tanggal lain ❤
                </div>
              </section>

              {showCard && (
                <div className={searchjadwalhidden.status === true ? "row" : "d-none"}>
                  {
                    <div className="card p-4 rounded-5 my-5 bg-sky-100">
                      <div className="card-body">
                        <h2 className="text-center">
                          <i className="bi bi-geo-alt-fill"></i> {lokasi.lokasi},{lokasi.daerah}
                        </h2>
                        <h4 className="text-center mb-5">{searchjadwal.tanggal}</h4>
                        <div className="container p-0">
                          <div className="row text-center">
                            <div className="col-md-3 border mb-2 rounded-4">
                              <h3 className="mt-2">Imsak</h3>
                              <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{searchjadwal.imsak}</span>
                            </div>
                            <div className="col-md-3 border mb-2 rounded-4">
                              <h3 className="mt-2">Subuh</h3>
                              <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{searchjadwal.subuh}</span>
                            </div>
                            <div className="col-md-3 border mb-2 rounded-4">
                              <h3 className="mt-2">Terbit</h3>
                              <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{searchjadwal.terbit}</span>
                            </div>
                            <div className="col-md-3 border mb-2 rounded-4">
                              <h3 className="mt-2">Dhuha</h3>
                              <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{searchjadwal.dhuha}</span>
                            </div>
                            <div className="col-md-3 border mb-2 rounded-4">
                              <h3 className="mt-2">Dzuhur</h3>
                              <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{searchjadwal.dzuhur}</span>
                            </div>
                            <div className="col-md-3 border mb-2 rounded-4">
                              <h3 className="mt-2">Ashar</h3>
                              <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{searchjadwal.ashar}</span>
                            </div>
                            <div className="col-md-3 border mb-2 rounded-4">
                              <h3 className="mt-2">Maghrib</h3>
                              <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{searchjadwal.maghrib}</span>
                            </div>
                            <div className="col-md-3 border mb-2 rounded-4">
                              <h3 className="mt-2">Isya'</h3>
                              <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">{searchjadwal.isya}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <FooterComponent />
        </div>
      </>
    );
  }
};

export default PreviewJadwalSholat;
