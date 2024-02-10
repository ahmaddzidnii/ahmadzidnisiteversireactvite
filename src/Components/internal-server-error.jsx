import React from "react";
import img500 from "../assets/img/404img/500.png";

const InternalServerErrorComponent = () => {
  return (
    <div className="space-navbar bg-sky-50 pb-5 ">
      <div className="container">
        <div className="row min-vh-100 d-flex align-items-center text-center">
          <div className="col-md-6">
            <img
              className="card-img"
              src={img500}
            />
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold titlenotfound">500</h1>
            <h1 className="fw-bold fs-1">INTERNAL SERVER ERROR</h1>
            <h2 className="fs-3">
              Maaf Ada Kesalahan Teknis di Server Kami. Tenang.. Akan Kami
              Perbaiki Sesegera Mungkin.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalServerErrorComponent;
