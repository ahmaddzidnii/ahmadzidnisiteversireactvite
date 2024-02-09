import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import React, { useEffect, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterComponent from "../Components/FooterComponent";
import { Loader } from "../Components/loader";
import { useDocumentTitle } from "../hooks/use-document-title";

const JadwalSholat = () => {
  useDocumentTitle("List Kota - ahmadzidni.site");

  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 400);

  const { data: cities, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_JADWAL_SHOLAT_URL}/kota/semua`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-sky-50">
      <title>List Kota - ahmadzidni.site</title>
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
                    <kbd className="kbd-keys">CTRL</kbd> +{" "}
                    <kbd className="kbd-keys">M</kbd>{" "}
                  </span>
                </InputGroup.Text>
              </InputGroup>
            </div>
          </form>
        </div>
        <div className="row">
          {cities.data
            .filter((f) =>
              value === ""
                ? true
                : f.lokasi.toLowerCase().includes(value.toLowerCase())
            )
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
};

export default JadwalSholat;
