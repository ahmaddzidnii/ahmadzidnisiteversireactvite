import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { InputGroup, Form } from "react-bootstrap";

import FooterComponent from "../Components/FooterComponent";
import NotfoundComponent from "../Components/NotFoundComponents";
import { Loader } from "../Components/loader";

const PreviewJadwalSholat = () => {
  const { idkota } = useParams();
  const URL = import.meta.env.VITE_JADWAL_SHOLAT_URL;

  const formatDate = (date) => (date < 10 ? `0${date}` : date);

  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (event) => {
    const inputDateValue = event.target.value;
    const [year, month, day] = inputDateValue.split("-");
    const formattedDate = `${year}/${month}/${day}`;
    setSelectedDate(formattedDate);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = formatDate(date.getMonth() + 1);
    const day = formatDate(date.getDate());
    return `${year}/${month}/${day}`;
  };

  // FUNGSI TAMPIL JADWAL HARI INI
  const tanggal = getCurrentDate();

  const {
    data: jadwalToday,
    isLoading: isLoadingJadwalToday,
    isError: isErrorJadwalToday,
  } = useQuery({
    queryKey: ["jadwalsholat", idkota],
    queryFn: async () => {
      const response = await axios.get(`${URL}/jadwal/${idkota}/${tanggal}`);
      return response.data.data;
    },
  });

  // FUNGSI CARI JADWAL

  const {
    data: searchJadwal,
    isLoading: isLoadingSearchJadwal,
    isError: isErrorSearchJadwal,
    error,
  } = useQuery({
    queryKey: ["searchjadwal", idkota, selectedDate],
    queryFn: async () => {
      const response = await axios.get(
        `${URL}/jadwal/${idkota}/${selectedDate}`
      );
      return response.data;
    },
    enabled: !!selectedDate,
  });

  const errorCode = error?.response.status;

  console.log({ searchJadwal, errorCode });

  const jadwalharian = jadwalToday?.jadwal;
  const lokasi = jadwalToday;

  const searchjadwal = searchJadwal?.data.jadwal;
  if (isLoadingJadwalToday) {
    return <Loader />;
  }

  if (isErrorJadwalToday) {
    return <NotfoundComponent />;
  }

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
                    <i className="bi bi-geo-alt-fill"></i> {lokasi.lokasi},
                    {lokasi.daerah}
                  </h2>
                  <h4 className="text-center mb-5">{jadwalharian.tanggal}</h4>
                  <div className="container p-0">
                    <div className="row text-center">
                      <div className="col-md-3 border mb-2 rounded-4">
                        <h3 className="mt-2">Imsak</h3>
                        <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                          {jadwalharian.imsak}
                        </span>
                      </div>
                      <div className="col-md-3 border mb-2 rounded-4">
                        <h3 className="mt-2">Subuh</h3>
                        <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                          {jadwalharian.subuh}
                        </span>
                      </div>
                      <div className="col-md-3 border mb-2 rounded-4">
                        <h3 className="mt-2">Terbit</h3>
                        <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                          {jadwalharian.terbit}
                        </span>
                      </div>
                      <div className="col-md-3 border mb-2 rounded-4">
                        <h3 className="mt-2">Dhuha</h3>
                        <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                          {jadwalharian.dhuha}
                        </span>
                      </div>
                      <div className="col-md-3 border mb-2 rounded-4">
                        <h3 className="mt-2">Dzuhur</h3>
                        <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                          {jadwalharian.dzuhur}
                        </span>
                      </div>
                      <div className="col-md-3 border mb-2 rounded-4">
                        <h3 className="mt-2">Ashar</h3>
                        <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                          {jadwalharian.ashar}
                        </span>
                      </div>
                      <div className="col-md-3 border mb-2 rounded-4">
                        <h3 className="mt-2">Maghrib</h3>
                        <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                          {jadwalharian.maghrib}
                        </span>
                      </div>
                      <div className="col-md-3 border mb-2 rounded-4">
                        <h3 className="mt-2">Isya'</h3>
                        <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                          {jadwalharian.isya}
                        </span>
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
              <Form.Control
                type="date"
                id="form"
                className="search mb-0 p-3 border-1 border-black"
                placeholder="🔎  cari tanggal...  (contoh 01/04/2023)"
                onChange={handleChange}
              />
              <InputGroup.Text
                className="d-none d-lg-flex border-black bg-sky-100"
                id="basic-addon2"
              >
                <span>
                  <kbd className="kbd-keys">CTRL</kbd> +
                  <kbd className="kbd-keys">M</kbd>
                </span>
              </InputGroup.Text>
            </InputGroup>
          </div>
          <div className="min-vh-100">
            {isLoadingSearchJadwal && (
              <div className="h-50  d-flex align-items-center justify-content-center">
                <div className="lds-facebook">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}

            {isErrorSearchJadwal && (
              <>
                {errorCode !== 400 && <NotfoundComponent />}

                {errorCode === 400 && (
                  <div
                    className="alert alert-info alert-dismissible fade show text-center"
                    role="alert"
                  >
                    <strong>Mohon maaf,</strong> data tidak ditemukan atau tidak
                    terdapat di data base. pastikan kamu sudah memilih tanggal
                    atau kamu bisa cari tanggal lain ❤
                  </div>
                )}
              </>
            )}

            {searchjadwal && (
              <div>
                <div className="card p-4 rounded-5 my-5 bg-sky-100">
                  <div className="card-body">
                    <h2 className="text-center">
                      <i className="bi bi-geo-alt-fill"></i> {lokasi.lokasi},
                      {lokasi.daerah}
                    </h2>
                    <h4 className="text-center mb-5">{searchjadwal.tanggal}</h4>
                    <div className="container p-0">
                      <div className="row text-center">
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Imsak</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                            {searchjadwal.imsak}
                          </span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Subuh</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                            {searchjadwal.subuh}
                          </span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Terbit</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                            {searchjadwal.terbit}
                          </span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Dhuha</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                            {searchjadwal.dhuha}
                          </span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Dzuhur</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                            {searchjadwal.dzuhur}
                          </span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Ashar</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                            {searchjadwal.ashar}
                          </span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Maghrib</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                            {searchjadwal.maghrib}
                          </span>
                        </div>
                        <div className="col-md-3 border mb-2 rounded-4">
                          <h3 className="mt-2">Isya'</h3>
                          <span className="badge bg-sky-600 mb-4 fs-5 rounded-pill">
                            {searchjadwal.isya}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
};

export default PreviewJadwalSholat;
