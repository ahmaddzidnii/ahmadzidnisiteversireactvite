import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FooterComponent from "../Components/FooterComponent";

const AsmaulHusnaPreview = () => {
  const [asmaulHusna, SetAsmauHusna] = useState([]);
  const [pagination, SetPagination] = useState([]);
  const [loading, SetLoading] = useState(true);
  const { id } = useParams();

  const fetchAsmaulHusna = async () => {
    try {
      const response = await axios.get(`https://api.ahmadzidni.site/api/asmaulhusna/${id}?ApiKey=ahmadd`);
      SetAsmauHusna(response.data.datas[0]);
      SetPagination(response.data.paginationInfo);
      SetLoading(false);
      //   console.log(response.data.datas[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    SetLoading(true);
  };

  useEffect(() => {
    document.title = "ahmadzidni.site";
    fetchAsmaulHusna();
  }, [id]);

  return (
    <div className="space-navbar bg-sky-50">
      <div className="container">
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
            <>
              <div className="row">
                <div>
                  <ul className="pagination">
                    <li className={!pagination.prev.id ? "d-none" : ""}>
                      <Link onClick={handleClick} to={`/Asmaulhusna/${pagination.prev.id}`} className="page-link rounded-2 text-black bg-info btn">
                        Sebelumnya : {pagination.prev.latin}
                      </Link>
                    </li>
                    <li className={!pagination.next.id ? "d-none" : ""}>
                      <Link onClick={handleClick} className="page-link rounded-2 text-black bg-info btn ms-2" to={`/Asmaulhusna/${pagination.next.id}`}>
                        Selanjutnya : {pagination.next.latin}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card border border-1 border-black sky-blue-50">
                    <div className="card-body">
                      <h3 className="card-title text-center fw-bold">{asmaulHusna.latin}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card mt-1 border border-1 border-black sky-blue-50">
                    <div className="card-body">
                      <h1 className="card-title text-center  font-khusus">{asmaulHusna.arabic}</h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card mt-1 border border-1 border-black sky-blue-50">
                    <div className="card-body">
                      <h3 className="card-title text-center text-sentence text-capitalize">{asmaulHusna.translation_id}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card mt-1 border border-1 border-black sky-blue-50">
                    <div className="card-body">
                      <h3 className="card-title text-center">{asmaulHusna.translation_en}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="space-footer">
        <FooterComponent />
      </div>
    </div>
  );
};

export default AsmaulHusnaPreview;
