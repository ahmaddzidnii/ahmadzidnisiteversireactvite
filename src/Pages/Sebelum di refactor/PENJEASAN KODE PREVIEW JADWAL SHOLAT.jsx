import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { InputGroup, Form } from "react-bootstrap";
import FooterComponent from "../Components/FooterComponent";
import NotfoundComponent from "../Components/NotFoundComponents";

const PreviewJadwalSholat = () => {
  // Mengambil ID kota dari URL menggunakan react-router-dom
  const { idkota } = useParams();
  // Mendapatkan URL dari environment variables
  const URL = import.meta.env.VITE_JADWAL_SHOLAT_URL;

  // Fungsi untuk memformat angka bulan atau tanggal menjadi 2 digit (misal: 05)
  const formatDate = (date) => (date < 10 ? `0${date}` : date);

  // State untuk menyimpan jadwal harian
  const [jadwalharian, setJadwalHarian] = useState([]);
  // State untuk menyimpan hasil pencarian jadwal
  const [searchjadwal, setSearchJadwal] = useState([]);
  // State untuk menampilkan atau menyembunyikan hasil pencarian jadwal
  const [searchjadwalhidden, setSearchJadwalHidden] = useState([]);
  // State untuk menampilkan atau menyembunyikan loading saat pencarian jadwal
  const [loadingsearchjadwal, setLoadingSearchJadwal] = useState(true);
  // State untuk menyimpan data lokasi
  const [lokasi, setLokasi] = useState([]);
  // State untuk menampilkan atau menyembunyikan loading saat pengambilan data
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan tanggal yang dipilih oleh pengguna
  const [selectedDate, setSelectedDate] = useState("");
  // State untuk menampilkan atau menyembunyikan komponen hasil pencarian jadwal
  const [showCard, setShowCard] = useState(false);
  // State untuk mengatur pesan ketika data tidak ditemukan
  const [handlenotfound, setHandleNotFound] = useState({});
  // State untuk mengatur status gagal saat melakukan fetch data
  const [handlegagalfetch, setHandleGagalFetch] = useState(false);

  // Fungsi yang dijalankan saat tanggal di input diganti
  const handleChange = (event) => {
    // Mendapatkan nilai tanggal yang diinput oleh pengguna
    const inputDateValue = event.target.value;
    const [year, month, day] = inputDateValue.split("-");
    // Format tanggal sesuai dengan yang dibutuhkan
    const formattedDate = `${year}/${month}/${day}`;
    setSelectedDate(formattedDate);
    setLoadingSearchJadwal(true);
    setShowCard(false);
  };

  // Fungsi untuk mendapatkan tanggal hari ini dalam format yang dibutuhkan
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = formatDate(date.getMonth() + 1);
    const day = formatDate(date.getDate());
    return `${year}/${month}/${day}`;
  };

  // Mendapatkan tanggal hari ini
  const tanggal = getCurrentDate();

  // Fungsi untuk mengambil jadwal sholat hari ini
  const getJadwal = async () => {
    try {
      // Melakukan fetch data dari API menggunakan axios
      const response = await axios.get(`${URL}/jadwal/${idkota}/${tanggal}`);
      // Menyimpan data lokasi dan jadwal harian ke dalam state
      setLokasi(response.data.data);
      setJadwalHarian(response.data.data.jadwal);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(true);
    }
  };

  // Fungsi untuk melakukan pencarian jadwal berdasarkan tanggal yang dipilih
  const getSearchJadwal = async () => {
    try {
      // Melakukan fetch data dari API berdasarkan tanggal yang dipilih
      const response = await axios.get(`${URL}/jadwal/${idkota}/${selectedDate}`);
      // Menyimpan hasil pencarian ke dalam state
      setHandleNotFound(response.data);
      setSearchJadwal(response.data.data.jadwal);
      setSearchJadwalHidden(response.data);
      setLoadingSearchJadwal(false);
      setHandleGagalFetch(false);

      // Menampilkan hasil pencarian setelah 500ms
      setTimeout(() => {
        setShowCard(true);
      }, 500);
    } catch (error) {
      console.log(error);
      setHandleGagalFetch(true);
    }
  };

  // Mengatur judul dokumen sesuai dengan lokasi
  document.title = `${lokasi.lokasi}`;

  // Mengambil jadwal saat komponen dimount dengan ID kota sebagai dependensi
  useEffect(() => {
    getJadwal();
  }, [idkota]);

  // Mengambil hasil pencarian jadwal saat tanggal yang dipilih berubah
  useEffect(() => {
    setLoadingSearchJadwal(false);
    if (selectedDate) {
      getSearchJadwal();
    }
  }, [selectedDate]);

  // Kondisi ketika masih loading, menampilkan loading spinner
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
    // Kondisi setelah loading selesai, menampilkan tampilan jadwal
    return (
      <>
        {/* Tampilan untuk jadwal sholat hari ini */}
        <div className="bg-sky-50">
          <div className="container space-navbar">
            <div className="row">{/* ... (sisa kode tampilan jadwal sholat hari ini) ... */}</div>

            {/* Tampilan untuk pencarian jadwal berdasarkan tanggal */}
            <div className="row text-center mt-5">
              <div className="col-md-12 mt-5">
                <h1>Cari Jadwal Sesuai Tanggal</h1>
              </div>
            </div>
            <div className="row my-3">{/* ... (input form untuk memilih tanggal) ... */}</div>

            {/* Tampilan loading saat pencarian jadwal */}
            <div className="min-vh-100">
              <section className={loadingsearchjadwal === true ? "d-flex align-items-center justify-content-center" : "d-none"}>
                <div className="lds-facebook ">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </section>
              {/* Tampilan ketika data tidak ditemukan */}
              <section className={handlegagalfetch && handlenotfound.message === "Tidak ketemu" ? "" : "d-none"}>
                <NotfoundComponent />
              </section>

              {/* Tampilan pesan ketika data tidak ditemukan */}
              <section className={!handlenotfound.status && handlenotfound.message === "Data tidak ketemu" && selectedDate ? "" : "d-none"}>
                <div className="alert alert-info alert-dismissible fade show text-center" role="alert">
                  <strong>Mohon maaf,</strong> data tidak ditemukan atau tidak terdapat di database. Pastikan kamu sudah memilih tanggal atau kamu bisa cari tanggal lain ❤
                </div>
              </section>

              {/* Tampilan hasil pencarian jadwal */}
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
                          <div className="row text-center">{/* ... (menampilkan jadwal sholat hasil pencarian) ... */}</div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Menampilkan komponen Footer */}
        <div>
          <FooterComponent />
        </div>
      </>
    );
  }
};

export default PreviewJadwalSholat;
