import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InputGroup, Form, Badge } from "react-bootstrap";
import FooterComponent from "../Components/FooterComponent";


const Tafsir = () => {
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prev, setPref] = useState([]);
  const [next, setNext] = useState([]);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [placeholder, setPlaceHolder] = useState([]);

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

  const id = useParams().id;

  const getTafsirs =  () => {
   axios.get(`${import.meta.env.VITE_TAFSIR_URL}/${id}`)
   .then(response => {
       setData(response.data.data.tafsir);
       setFiltered(response.data.data.tafsir);
       setPlaceHolder(response.data.data.tafsir.length);
       setSurat(response.data.data);
       setPref(response.data.data.suratSebelumnya);
       setNext(response.data.data.suratSelanjutnya);
        setLoading(false)
   })
   .catch(err => {
    console.log(err.message)
    setLoading(true)
   })
  };

   // title
   document.title = `${surat.namaLatin} - ahmadzidni.site`;

    // Shortcut
    document.addEventListener('keydown', e => {

      if(e.key.toLowerCase() === 'm' && e.ctrlKey === true){
        document.getElementById('form').focus()
      }
  
    })
    // End Shorcut
  

  useEffect(() => {
    getTafsirs();

  }, []);

  const Filter = (event) => {
    setFiltered(data.filter(filter => 
      filter.ayat.toString().includes(event.target.value)))
      
   
    // console.log(event.target.value)
  }

  if(loading === true) {
    return (
        <section className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="lds-facebook ">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
      );
  }
  return (
    <div className="bg-sky-200">
      <div className="container space-navbar">
        <div className="row mb-2">
          <div className="col-md-12">
            <div className="card p-1 p-lg-4 rounded-5 rounded-bottom-4">
              <div className="card-body">
                <h1 className="card-title"> {surat.namaLatin}</h1>
                <h6 className="card-subtitle mb-2 text-body-secondary"></h6>
                <p className="card-text">Tempat turun : {surat.tempatTurun} </p>
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
        <div className="row mt-3">
            <div className={prev === false ? "d-none" : "col-md-4 mb-1"}>
              <div>
                <a href={`/Alquran/ayat/${prev.nomor}`} className="w-100 btn btn-primary me-2">
                  ⬅️ {prev.namaLatin} {prev.nama}{" "}
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-1">
            <div>
                <audio src={surat.audioFull["05"]} ref={audioRef} onPlay={() => setIsAudioPlaying(true)} onPause={() => setIsAudioPlaying(false)}></audio>
                <button className="btn btn-primary w-100" onClick={handleAudioPlayPause}>
                  {isAudioPlaying ? " ⏹️ Pause Surah" : " ▶️ Play Full Surah"}
                </button>
              </div>
            </div>
            <div className="col-md-4 mb-1">
            <a href={`/Alquran/ayat/${surat.nomor}`} className="w-100 btn btn-primary me-2">
              📃 Ayat
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <form className="subnav-search d-flex flex-nowrap">
            <div className="col">
              <InputGroup className="form-control p-0">
                <Form.Control onChange={Filter} id="form" type="number" className="search mb-0 p-3 border-1 border-black" placeholder={`🔎  cari urutan ayat..   (1 - ${placeholder})  `} />
                <InputGroup.Text className="d-none d-lg-flex border-black" id="basic-addon2">
                  CTRL + M
                </InputGroup.Text>
              </InputGroup>
            </div>
          </form>
        </div>
        <div className="row">
          {/* LOOPING DATA */}
          {filtered.map((ayat, index) => {
              return (
                <div className="col-md-12" key={index}>
                  <div className="card my-2 text-decoration-none p-1 p-lg-4 rounded-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-2 offset-5 d-flex justify-content-center">
                        <Badge bg="info" className="bg-sky-600 me-2 my-5 p-3 fs-2 ms-0 ms-lg-3">
                          {ayat.ayat}
                        </Badge>
                        </div>
                      </div>
                      <hr />
                      <p align="justify" className="card-text">
                        {ayat.teks}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="row my-5">
          <div className="col-md-3 offset-md-9">
            <div className={next === false ? "d-none" : ""}>
              <a href={`/Alquran/tafsir/${next.nomor}`} className="btn btn-primary w-100">
                {next.namaLatin} {next.nama} ➡️
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <FooterComponent/>
      </div>
    </div>
  );
};

export default Tafsir;
