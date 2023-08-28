import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import avatar from "../assets/img/avatar.png";

const ListKomentar = (props) => {
  // console.log(props)

  const [count, setCount] = useState(null);
  const [data, setData] = useState([]);
  // console.log(data);

  const getKomentar = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/kontak?ApiKey=ahmadd");
      // console.log(response.data);
      setCount(response.data.totalCount);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.submitSuccess) {
      getKomentar();
    }
  }, [props.submitSuccess]);

  useEffect(() => {
    getKomentar();
  }, []);

  return (
    <div>
      <div>
        <div className="container">
          <h1 className="mb-4">{count} Komentar</h1>
          <div className="row">
            {data.map((d) => {
              const hari = new Date(d.Tanggal).getDate();
              const bulan = new Date(d.Tanggal).getMonth()+1

              const formatTanggal = (h,b) => {
                if(h < 10){
                  h = `0${h}`
                }

                if(b < 10){
                  b = `0${b}`
                }

                return `${h}-${b}`
              }

              const formatedDate = `${formatTanggal(hari,bulan)}-${new Date(d.Tanggal).getFullYear()} ${new Date(d.Tanggal).getHours()}:${new Date(d.Tanggal).getMinutes()}`;
              return (
                <div className="col-md-12 mb-3" key={d.id}>
                  <div className="card">
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
                      <p className="p-2" align="justify">{d.pesan}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListKomentar;
