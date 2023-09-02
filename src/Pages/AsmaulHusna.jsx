import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { InputGroup, Form } from "react-bootstrap";
import FooterComponent from "../Components/FooterComponent";
import { NavLink } from "react-router-dom";

const AsmaulHusna = () => {
  const [datas, setDatas] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  // console.log(value);

  const getAllAsmaulHusna = async () => {
    const response = await axios.get("https://api.ahmadzidni.site/api/asmaulhusna?ApiKey=ahmadd");
    try {
      setDatas(response.data.datas);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAsmaulHusna();
  }, []);

  return (
    <div className="list-surah-section bg-sky-50">
      <div className="container space-navbar">
        <div className="row mb-2">
          <form className="subnav-search d-flex flex-nowrap">
            <div className="col">
              <InputGroup className="form-control p-0">
                <Form.Control
                  id="form"
                  className="search mb-0 p-3 border-1 border-black"
                  placeholder="🔎  cari asmaul husna atau urutan asaul husna... "
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <InputGroup.Text className="d-none d-lg-flex border-black" id="basic-addon2">
                <span> <kbd className="kbd-keys">CTRL</kbd> + <kbd className="kbd-keys">M</kbd> </span>
                </InputGroup.Text>
              </InputGroup>
            </div>
          </form>
        </div>
        <div>
          {loading ? (
          <section className="min-vh-100 d-flex  justify-content-center">
            <div className="lds-facebook ">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </section>
          ) : (
           <div className="row">
             {datas
            .filter((f) => {
              return value.toLowerCase() === "" ? f : f.id.toString().includes(value) || f.latin.toLowerCase().includes(value.toLowerCase());
            })
            .map((d, index) => {
              return (
                <div className="col-md-6" key={index}>
                  <NavLink to={`/Asmaulhusna/${d.id}`} className="card my-3 transisi text-decoration-none">
                    <div className="card pt-3 px-2">
                      <div className="card-body">
                        <div>
                          <div className="d-flex align-items-start">
                            <span className="badge bg-sky-600  nomor fs-1 me-4">{d.id}</span>
                            <div>
                              <h4 className="card-title">{d.latin}</h4>
                              <h3>{d.arabic}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              );
            })}

           </div>
          )}
        </div>
      </div>
      <div className="pt-5">
        <FooterComponent />
      </div>
    </div>
  );
};

export default AsmaulHusna;
