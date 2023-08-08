import React from "react";
import img404 from "../assets/img/404img/404.png";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="space-navbar bg-sky-50">
      <div className="container">
        <div className="row  d-flex align-items-center text-center">
          <div className="col-md-6">
            <img className="card-img" src={img404} />
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold titlenotfound">404</h1>
            <h1 className="fw-bold fs-1">NOT FOUND</h1>
            <h2 className="fs-3">Maaf Halaman yang anda cari tidak ditemukan !!!</h2>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-md-4 offset-md-4 ">
            <Link className="btn btn-info w-100" to={"/"}>
              Kembali ke home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
