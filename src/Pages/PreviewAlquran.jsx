import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// BOOTSTRAP 5
import { Form, InputGroup } from "react-bootstrap";
import FooterComponent from "../Components/FooterComponent";
import { Badge } from "react-bootstrap";

const PreviewAlquran = () => {
  const [title, setTitle] = useState([]);
  const [surat, setSurat] = useState([]);
  const [ayat, setAyat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [prev, setPref] = useState([]);
  const [next, setNext] = useState([]);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleAudioPlayPause = () => {
    const audioElement = audioRef.current;
    if (isAudioPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const URL = import.meta.env.VITE_BASE_URL
  let { id } = useParams();
  const getDetailSurat = () => {
    fetch(`${URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.data);
        setSurat(data.data);
        setAyat(data.data.ayat);
        setLoading(false);
        setPref(data.data.suratSebelumnya);
        setNext(data.data.suratSelanjutnya);
      });
  };

  window.addEventListener('keydown', e =>{
    e.key.toLowerCase()==='m' || e.ctrlKey ? document.getElementById('form').focus() : ''
  })
  // title
  document.title = `${title.namaLatin} - ahmadzidni.site`;

  useEffect(() => {
    getDetailSurat();
  }, []);

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
  else
    return (
      <div className="bg-sky-50">
        <div className="container space-navbar">
          <div className="row mb-2">
            <div className="col-md-12">
              <div className="card p-1 p-lg-4 rounded-5 rounded-bottom-4 bg-sky-100">
                <div className="card-body">
                  <h1 className="card-title">{surat.namaLatin}</h1>
                  <h6 className="card-subtitle mb-2 text-body-secondary"></h6>
                  <p className="card-text">Tempat turun : {surat.tempatTurun}</p>
                  <strong>
                    <p className="card-text">Deskripsi Surah :</p>
                  </strong>
                  <div align="justify" className="card-text">
                    <div dangerouslySetInnerHTML={{ __html: surat.deskripsi }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className={prev === false ? "d-none" : "col-md-4 mb-1"}>
              <div>
                <a href={`/Alquran/ayat/${prev.nomor}`} className="w-100 btn btn-info me-2">
                  ⬅️ {prev.namaLatin} {prev.nama}{" "}
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-1">
            <div>
                <audio src={surat.audioFull["05"]} ref={audioRef} onPlay={() => setIsAudioPlaying(true)} onPause={() => setIsAudioPlaying(false)}></audio>
                <button className="btn btn-info w-100" onClick={handleAudioPlayPause}>
                  {isAudioPlaying ? " ⏹️ Pause Surah" : " ▶️ Play Full Surah"}
                </button>
              </div>
            </div>
            <div className="col-md-4 mb-1">
            <a href={`/Alquran/tafsir/${surat.nomor}`} className="w-100 btn btn-info me-2">
              📃Tafsir
              </a>
            </div>
          </div>
          <div className="row mt-3">
            <form className="subnav-search d-flex flex-nowrap">
              <div className="col">
                <InputGroup className="form-control p-0">
                  <Form.Control onChange={(e) => setSearch(e.target.value)} id="form" className="search mb-0 p-3 border-1 border-black" placeholder="🔎  cari urutan ayat atau penggalan arti..." />
                  <InputGroup.Text className="d-none d-lg-flex border-black bg-sky-100" id="basic-addon2">
                  <span> <kbd className="kbd-keys">CTRL</kbd> + <kbd className="kbd-keys">M</kbd> </span>
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </form>
          </div>
          <div className="row">
            {/* Filter Data */}
            {ayat
              .filter((x) => {
                return search.toLowerCase() === "" ? x : x.nomorAyat.toString().includes(search) || x.teksIndonesia.toLowerCase().includes(search.toLowerCase());
              })
              // looping data
              .map((ayat, index) => {
                return (
                  <div className="col-md-12" key={index}>
                    <div className="card my-3 text-decoration-none p-1 p-lg-4 rounded-4 bg-sky-100">
                      <div className="card-body">
                        <Badge bg="info" className="bg-sky-600 me-2 my-5 p-3 fs-2 ms-0 ms-lg-3">
                          {ayat.nomorAyat}
                        </Badge>
                        <h1 className="card-subtitle mb-2 text-body-secondary text-end">{ayat.teksArab}</h1>
                        <p align="justify" className="card-text">
                          {ayat.teksLatin}
                        </p>
                        <hr />
                        <p align="justify" className="card-text">
                          {ayat.teksIndonesia}
                        </p>
                        <hr />
                        
                        <audio className="w-100 border-2 rounded-5 border-black border" controls src={ayat.audio["05"]}></audio>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Tombol next */}
          <div className="row">
            <div className="col-md-5 offset-md-7">
              <div className={next === false ? "d-none" : ""}>
                <a href={`/Alquran/ayat/${next.nomor}`} className="btn btn-info w-100">
                  {next.namaLatin} {next.nama} ➡️
                </a>
              </div>
            </div>
          </div>

          {/* Tombol next */}
        </div>
        <div className="mt-3">
          <FooterComponent />
        </div>
      </div>
    );
};

export default PreviewAlquran;
