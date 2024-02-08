import axios from "axios"; // Mengimpor axios untuk melakukan permintaan HTTP.
import React, { useEffect, useState } from "react"; // Mengimpor React, useEffect, dan useState dari pustaka "react".
import { InputGroup, Form } from "react-bootstrap"; // Mengimpor InputGroup dan Form dari pustaka "react-bootstrap".
import { Link } from "react-router-dom"; // Mengimpor Link dari pustaka "react-router-dom".
import FooterComponent from "../Components/FooterComponent"; // Mengimpor komponen FooterComponent dari direktori "../Components".

const JadwalSholat = () => {
  const [kotas, setKotas] = useState([]); // Membuat state "kotas" dan fungsi "setKotas" dengan menggunakan useState, diinisialisasi dengan array kosong.
  const [search, setSearch] = useState(""); // Membuat state "search" dan fungsi "setSearch" dengan menggunakan useState, diinisialisasi dengan string kosong.
  const [loading, setLoading] = useState(true); // Membuat state "loading" dan fungsi "setLoading" dengan menggunakan useState, diinisialisasi dengan nilai true.

  const getKotas = async () => {
    // Membuat fungsi async "getKotas" untuk mendapatkan data kota.
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_JADWAL_SHOLAT_URL}/kota/semua`
      ); // Melakukan permintaan HTTP GET menggunakan axios untuk mendapatkan data kota.
      setKotas(response.data); // Mengatur state "kotas" dengan data kota yang diterima.
      setLoading(false); // Mengatur state "loading" menjadi false setelah berhasil mendapatkan data.
    } catch (err) {
      // Menangkap kesalahan jika permintaan gagal.
      console.log(err); // Menampilkan pesan kesalahan di konsol.
      setLoading(true); // Mengatur state "loading" menjadi true jika terjadi kesalahan.
    }
  };

  useEffect(() => {
    // Menggunakan useEffect untuk melakukan efek samping saat komponen dipasang.
    document.title = "List Kota - ahmadzidni.site"; // Mengatur judul halaman menjadi "List Kota - ahmadzidni.site".
    getKotas(); // Memanggil fungsi "getKotas" untuk mendapatkan data kota saat komponen dipasang.
  }, []);

  if (loading) {
    // Jika "loading" bernilai true, tampilkan indikator loading.
    return (
      <section className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    );
  } else {
    // Jika "loading" bernilai false, tampilkan daftar kota.
    return (
      <div className="bg-sky-50">
        <div className="container space-navbar">
          <div className="row mb-2">
            <form className="subnav-search d-flex flex-nowrap">
              <div className="col">
                <InputGroup className="form-control p-0">
                  <Form.Control
                    id="form"
                    className="search mb-0 p-3 border-1 border-black"
                    placeholder="🔎  cari kota "
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <InputGroup.Text
                    className="d-none d-lg-flex border-black"
                    id="basic-addon2"
                  >
                    <span>
                      {" "}
                      <kbd className="kbd-keys">CTRL</kbd> +{" "}
                      <kbd className="kbd-keys">M</kbd>{" "}
                    </span>
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </form>
          </div>
          <div className="row">
            {kotas.data
              .filter((f) => {
                return search === ""
                  ? true
                  : f.lokasi.toLowerCase().includes(search.toLowerCase());
              })
              .map((k, index) => (
                <div
                  className="col-md-4"
                  key={index}
                >
                  <Link
                    to={`/Jadwalsholat/listkota/${k.id}`}
                    className="card-hover card my-2 text-decoration-none border-black"
                  >
                    <div className="card-body">{k.lokasi}</div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-5">
          <FooterComponent />
        </div>
      </div>
    );
  }
};

export default JadwalSholat;
