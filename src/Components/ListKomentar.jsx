import React from "react";
import { useState } from "react";
import avatar from "../assets/img/avatar.png";
import Nav from "react-bootstrap/Nav";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../libs/axios";

const ListKomentar = () => {
  const [short, setShort] = useState("asc");
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", short],
    queryFn: async () => {
      return (
        await axiosInstance.get(
          `${import.meta.env.VITE_API_BASE_URL}/comments?order=${short}`
        )
      ).data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-100 justify-content-center d-flex mb-5">
        <div
          className="spinner-grow text-info"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="container">
          <h1 className="mb-4">{comments?.data.length} Komentar</h1>
          <div className="row mb-4">
            <div className="col-md-12">
              <Nav
                variant="underline"
                defaultActiveKey="link-1"
              >
                <Nav.Item>
                  <Nav.Link
                    onClick={() => {
                      setShort("asc");
                    }}
                    className="text-black"
                    eventKey="link-1"
                  >
                    Terlama
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => {
                      setShort("desc");
                    }}
                    className="text-black"
                    eventKey="link-2"
                  >
                    Terbaru
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>

          <div className="row h-100 overflow-y-auto">
            <div className="col-md-12 mb-3">
              {comments?.data.map((d) => {
                const hari = new Date(d.time * 1000).getDate();
                const bulan = new Date(d.time * 1000).getMonth() + 1;
                const tahun = new Date(d.time * 1000).getFullYear();
                const jam = new Date(d.time * 1000).getHours();
                const menit = new Date(d.time * 1000).getMinutes();

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
                const formatedDate = `${formatTanggal(
                  hari,
                  bulan,
                  tahun,
                  jam,
                  menit
                )}`;
                return (
                  <div
                    key={d.id}
                    className="card mb-4"
                  >
                    <div className="card-header">
                      <div>
                        <div className="d-flex align-items-center">
                          <div className="col-md-1">
                            <img
                              className="img-fluid rounded-circle img-profile"
                              src={avatar}
                              alt="profil"
                            />
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
                      <p
                        className="p-2"
                        align="justify"
                      >
                        {d.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListKomentar;
