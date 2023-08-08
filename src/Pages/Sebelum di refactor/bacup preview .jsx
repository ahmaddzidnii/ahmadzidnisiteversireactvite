import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// BOOTSTRAP 5
import {Form, InputGroup}from "react-bootstrap";

const PreviewAlquran = () => {
  const [title, setTitle] = useState([]);
  const [surat, setSurat] = useState([]);
  const [link, setLink] = useState();
  const [ayat, setAyat] = useState([]);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  const getDetailSurat = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.data);
        setSurat(data.data);
        setAyat(data.data.ayat);
        setLoading(false);
        const linkAudio = data.data.audioFull["05"];
        setLink(linkAudio);
      });
  };

  
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
      <div className="bg-sky-200 min-vh-100">
        <div className="container space-navbar">
          <div className="row mb-2">
            <div className="col-md-12">
              <div className="card p-1 p-lg-4">
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
                  <figcaption className="mt-5 mb-2 p-2"> </figcaption>
                  <audio className="w-100" controls src={link}></audio>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <form className="subnav-search d-flex flex-nowrap">
              <div className="col">
                <InputGroup  className="form-control p-0">
                  <Form.Control id="form" className="search mb-0 p-3 border-1 border-black" placeholder="🔎  cari urutan ayat atau penggalan arti..." />
                  <InputGroup.Text className="d-none d-lg-flex border-black" id="basic-addon2">
                    CTRL + M
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </form>
          </div>
          <div className="row">
            {ayat.map((ayat, index) => {
              return (
                <div className="col-md-12" key={index}>
                  <div className="card my-3 text-decoration-none p-1 p-lg-4">
                    <div className="card-body">
                      <span className="badge rounded-circle text-bg-primary my-5 p-3 fs-2 ms-0 ms-lg-3">{ayat.nomorAyat}</span>
                      <h1 className="card-subtitle mb-2 text-body-secondary text-end">{ayat.teksArab}</h1>
                      <p align="justify" className="card-text">{ayat.teksLatin}</p>
                      <hr />
                      <p align="justify" className="card-text">{ayat.teksIndonesia}</p>
                      <hr />
                      <audio className="w-100" controls src={ayat.audio["05"]}></audio>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default PreviewAlquran;
