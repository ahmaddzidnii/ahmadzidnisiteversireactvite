import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import avatar from "../assets/img/avatar.png";
import Nav from "react-bootstrap/Nav";

const ListKomentar = (props) => {
  // console.log(props)

  const [count, setCount] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(data);

  const getKomentar = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_PROD_KONTAK_URL);
      // console.log(response.data.data.reverse());
      setCount(response.data.totalCount);
      setData(response.data.data.reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getKomentarTerbaru = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_PROD_KONTAK_URL);
      setCount(response.data.totalCount);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.submitSuccess) {
      getKomentarTerbaru();
    }
  }, [props.submitSuccess]);

  useEffect(() => {
    getKomentarTerbaru();
  }, []);

  return (
    <div>
      <div>
        <div className="container">
          <h1 className="mb-4">{count} Komentar</h1>
          <div className="row mb-4">
            <div className="col-md-12">
              <Nav variant="underline" defaultActiveKey="link-1">
                <Nav.Item>
                  <Nav.Link onClick={getKomentarTerbaru} className="text-black" eventKey="link-1">
                    Terlama
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={getKomentar} className="text-black" eventKey="link-2">
                    Terbaru
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          {loading ? (
            <div className="h-100 justify-content-center d-flex mb-5">
              <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row h-100 overflow-y-auto">
              <div className="col-md-12 mb-3">
                {data.map((d) => {
                  const hari = new Date(d.Tanggal).getDate();
                  const bulan = new Date(d.Tanggal).getMonth() + 1;
                  const tahun = new Date(d.Tanggal).getFullYear();
                  const jam = new Date(d.Tanggal).getHours();
                  const menit = new Date(d.Tanggal).getMinutes();

                  const formatTanggal = (h, b, t, j, m) => {
                    if (h < 10) {
                      h = `0${h}`;
                    }

                    if (b < 10) {
                      b = `0${b}`;
                    }

                    if (j < 10) {
                      j = `0${j}`;
                    }

                    if (m < 10) {
                      m = `0${m}`;
                    }

                    return `${h}-${b}-${t} ${j} : ${m}`;
                  };
                  const formatedDate = `${formatTanggal(hari, bulan, tahun, jam, menit)}`;
                  return (
                    <div key={d.id} className="card mb-4">
                      <div className="card-header">
                        <div>
                          <div className="d-flex align-items-center">
                            <div className="col-md-1">
                              <img className="img-fluid rounded-circle img-profile" src={avatar} alt="profil" />
                            </div>
                            <div className="col-md-11">
                              <strong>{d.nama}</strong>
                              <h6 className="mt-2">{d.email}</h6>
                              <h6 className="mt-2">{formatedDate}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="p-2" align="justify">
                          {d.pesan}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListKomentar;
