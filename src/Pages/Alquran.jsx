import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
// BOOTSTRAP 5
import { Form, InputGroup } from "react-bootstrap";

// AXIOS
import axios from "axios";

// Componets
import FooterComponent from "../Components/FooterComponent";

// CSS
import "./alquran.css";
import { useDocumentTitle } from "../hooks/use-document-title";
import { Loader } from "../Components/loader";
import InternalServerErrorComponent from "../Components/internal-server-error";

const Alquran = () => {
  const [input, setInput] = useState("");
  const [data] = useDebounce(input, 500);

  const URL = import.meta.env.VITE_BASE_URL;

  const {
    data: surat,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-surat"],
    queryFn: async () => {
      const response = await axios.get(URL);
      return response.data.data;
    },
  });

  // Title Halaman
  useDocumentTitle("List Surah - ahmadzidni.site");

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

  if (isError) return <InternalServerErrorComponent />;

  if (isLoading) return <Loader />;

  return (
    <div className="list-surah-section bg-sky-50">
      <div className="container space-navbar">
        <div className="row mb-2">
          <form className="subnav-search d-flex flex-nowrap">
            <div className="col">
              <InputGroup className="form-control p-0">
                <Form.Control
                  ref={inputRef}
                  id="form"
                  className="search mb-0 p-3 border-1 border-black"
                  placeholder="🔎  cari surah atau urutan surat... "
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <InputGroup.Text
                  className="d-none d-lg-flex border-black"
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
          {surat
            .filter(
              (f) =>
                f.namaLatin.toLowerCase().includes(data.toLowerCase()) ||
                f.namaLatin
                  .toLowerCase()
                  .replace(/[\s-]/g, "")
                  .includes(data.toLowerCase()) ||
                f.nomor.toString().includes(data)
            )
            .map((surat) => {
              return (
                <div
                  className="col-md-4"
                  key={surat.nomor}
                >
                  <Link
                    to={`/Alquran/ayat/${surat.nomor}`}
                    preventScrollReset={false}
                    className="card my-3 transisi text-decoration-none"
                  >
                    <div className="card-body">
                      <h3 className="card-title">{surat.namaLatin}</h3>
                      <span className="badge rounded-pill bg-sky-600 p-2">
                        {surat.jumlahAyat} Ayat
                      </span>
                      <h1 className="card-subtitle mb-2 text-body-secondary text-end">
                        {surat.nama}
                      </h1>
                      <p className="card-text text-end">
                        {surat.arti} | {surat.tempatTurun}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <div className="pt-5">
        <FooterComponent />
      </div>
    </div>
  );
};

export default Alquran;
