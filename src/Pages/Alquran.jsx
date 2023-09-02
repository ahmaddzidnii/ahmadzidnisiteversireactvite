import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// BOOTSTRAP 5
import {Form,InputGroup }from "react-bootstrap";

// AXIOS
import axios from "axios";

// Componets
import FooterComponent from "../Components/FooterComponent";

// CSS
import './alquran.css'

const Alquran = () => {

  // state filter json response
  const [input, setInput] = useState("");

  //  State Menammpilkan Surat
  const [surats, setSurats] = useState([]);

  // State loading
  const [loading, setLoading] = useState(true);

  const URL = import.meta.env.VITE_BASE_URL

  // Fetching Data Pertama Render Menggunakan axios
  const firstRender = async () => {
    const results = await axios.get(URL);
    setLoading(false);
    setSurats(results.data.data);
  };

  
  // Fetching data filter Json mengguakan fetch biasa
  const getSurats = (value) => {
    
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const json = data.data;
        const filter = json.filter((user) => {
          return  user.namaLatin && user.namaLatin.toLowerCase().includes(value.toLowerCase()) || user.nomor.toString().includes(value);
        });
        
        setSurats(filter);
      });
  };



  const handleChange = (value) => {
    setInput(value);
    getSurats(value);
  };

  // Title Halaman
  document.title = 'List Surah - ahmadzidni.site';

  useEffect(() => {
    firstRender();
  }, []);

  // Shortcut
  document.addEventListener('keydown', e => {

    if(e.key.toLowerCase() === 'm' && e.ctrlKey === true){
      document.getElementById('form').focus()
    }

  })
  // End Shorcut


// Handle Loading
  if (loading)
    return (
      <section className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="lds-facebook ">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    );

    return (
      <div className="list-surah-section bg-sky-50">
        <div className="container space-navbar">
          <div className="row mb-2">
            <form className="subnav-search d-flex flex-nowrap">
              <div className="col">
                <InputGroup  className="form-control p-0">
                  <Form.Control id="form" className="search mb-0 p-3 border-1 border-black" placeholder="🔎  cari surah atau urutan surat... " value={input} onChange={(e) => handleChange(e.target.value)} />
                  <InputGroup.Text className="d-none d-lg-flex border-black" id="basic-addon2">
                   <span> <kbd className="kbd-keys">CTRL</kbd> + <kbd className="kbd-keys">M</kbd> </span>
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </form>
          </div>
          <div className="row">
            {surats.map( surat => {
              return (
                <div className="col-md-4" key={surat.nomor}>
                  <NavLink to={`/Alquran/ayat/${surat.nomor}`} className="card my-3 transisi text-decoration-none">
                    <div className="card-body">
                      <h3 className="card-title">{surat.namaLatin}</h3>
                      <span className="badge rounded-pill bg-sky-600 p-2">{surat.jumlahAyat} Ayat</span>
                      <h1 className="card-subtitle mb-2 text-body-secondary text-end">{surat.nama}</h1>
                      <p className="card-text text-end">{surat.arti} | {surat.tempatTurun}</p>
                    </div>
                  </NavLink>              
                </div>
              );
            })}
          </div>
        </div>
        <div className="pt-5">
        <FooterComponent/>
        </div>
      </div>
    );
};

export default Alquran;
