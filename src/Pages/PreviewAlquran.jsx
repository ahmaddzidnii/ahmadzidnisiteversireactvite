import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";

import FooterComponent from "../Components/FooterComponent";
import axios from "axios";
import Notfound from "./404Notfound";
import InternalServerErrorComponent from "../Components/internal-server-error";
import { useHotkeys } from "react-hotkeys-hook";

const PreviewAlquran = () => {
  const [search, setSearch] = useState("");

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

  const URL = import.meta.env.VITE_BASE_URL;
  let { id } = useParams();

  const {
    data: suratResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["surat", id],
    queryFn: async () => {
      const response = await axios.get(`${URL}/${id}`);
      return response.data;
    },
    retry: 1,
  });
  const errorCode = error?.response.data.code;
  const title = suratResponse?.data;
  const surat = suratResponse?.data;
  const ayat = suratResponse?.data.ayat;
  const prev = suratResponse?.data.suratSebelumnya;
  const next = suratResponse?.data.suratSelanjutnya;

  // title

  const { pathname } = useLocation();

  console.log();

  // Shortcut
  const inputRef = useRef(null);
  useHotkeys(
    "ctrl+k",
    () => {
      inputRef.current?.focus();
    },
    {
      preventDefault: true,
    }
  );
  // End Shorcut

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isError)
    return (
      <>{errorCode === 404 ? <Notfound /> : <InternalServerErrorComponent />}</>
    );

  document.title = `${
    title?.namaLatin ? title?.namaLatin : "Not found"
  } - ahmadzidni.site`;
  if (isLoading)
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
                  <p className="card-text">
                    Tempat turun : {surat.tempatTurun}
                  </p>
                  <strong>
                    <p className="card-text">Deskripsi Surah :</p>
                  </strong>
                  <div
                    align="justify"
                    className="card-text"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: surat.deskripsi }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className={prev === false ? "d-none" : "col-md-4 mb-1"}>
              <div>
                <Link
                  to={`/Alquran/ayat/${prev.nomor}`}
                  className="w-100 btn btn-info me-2"
                >
                  ⬅️ {prev.namaLatin} {prev.nama}{" "}
                </Link>
              </div>
            </div>
            <div className="col-md-4 mb-1">
              <div>
                <audio
                  src={surat.audioFull["05"]}
                  ref={audioRef}
                  onPlay={() => setIsAudioPlaying(true)}
                  onPause={() => setIsAudioPlaying(false)}
                ></audio>
                <button
                  className="btn btn-info w-100"
                  onClick={handleAudioPlayPause}
                >
                  {isAudioPlaying ? " ⏹️ Pause Surah" : " ▶️ Play Full Surah"}
                </button>
              </div>
            </div>
            <div className="col-md-4 mb-1">
              <a
                href={`/Alquran/tafsir/${surat.nomor}`}
                className="w-100 btn btn-info me-2"
              >
                📃Tafsir
              </a>
            </div>
          </div>
          <div className="row mt-3">
            <form className="subnav-search d-flex flex-nowrap">
              <div className="col">
                <InputGroup className="form-control p-0">
                  <Form.Control
                    ref={inputRef}
                    onChange={(e) => setSearch(e.target.value)}
                    id="form"
                    className="search mb-0 p-3 border-1 border-black"
                    placeholder="🔎  cari urutan ayat atau penggalan arti..."
                  />
                  <InputGroup.Text
                    className="d-none d-lg-flex border-black bg-sky-100"
                    id="basic-addon2"
                  >
                    <span>
                      <kbd className="kbd-keys">CTRL</kbd> +
                      <kbd className="kbd-keys">K</kbd>
                    </span>
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </form>
          </div>
          <div className="row">
            {/* Filter Data */}
            {ayat
              .filter((x) => {
                return search.toLowerCase() === ""
                  ? x
                  : x.nomorAyat.toString().includes(search) ||
                      x.teksIndonesia
                        .toLowerCase()
                        .includes(search.toLowerCase());
              })
              // looping data
              .map((ayat, index) => {
                return (
                  <div
                    className="col-md-12"
                    key={index}
                  >
                    <div className="card my-3 text-decoration-none p-1 p-lg-4 rounded-4 bg-sky-100">
                      <div className="card-body">
                        <Badge
                          bg="info"
                          className="bg-sky-600 me-2 my-5 p-3 fs-2 ms-0 ms-lg-3"
                        >
                          {ayat.nomorAyat}
                        </Badge>
                        <h1 className="card-subtitle mb-2 text-body-secondary text-end">
                          {ayat.teksArab}
                        </h1>
                        <p
                          align="justify"
                          className="card-text"
                        >
                          {ayat.teksLatin}
                        </p>
                        <hr />
                        <p
                          align="justify"
                          className="card-text"
                        >
                          {ayat.teksIndonesia}
                        </p>
                        <hr />

                        <audio
                          className="w-100 border-2 rounded-5 border-black border"
                          controls
                          src={ayat.audio["05"]}
                        ></audio>
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
                <Link
                  to={`/Alquran/ayat/${next.nomor}`}
                  className="btn btn-info w-100"
                >
                  {next.namaLatin} {next.nama} ➡️
                </Link>
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
