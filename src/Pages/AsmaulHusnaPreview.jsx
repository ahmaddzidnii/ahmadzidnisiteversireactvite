import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FooterComponent from "../Components/FooterComponent";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../libs/axios";
import { Loader } from "../Components/loader";

const AsmaulHusnaPreview = () => {
  const [asmaulHusna, SetAsmauHusna] = useState([]);
  const [pagination, SetPagination] = useState([]);
  const [loading, SetLoading] = useState(true);
  const { id } = useParams();

  // const fetchAsmaulHusna = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.ahmadzidni.site/api/asmaulhusna/${id}?ApiKey=ahmadd`
  //     );
  //     SetAsmauHusna(response.data.datas[0]);
  //     SetPagination(response.data.paginationInfo);
  //     SetLoading(false);
  //     //   console.log(response.data.datas[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleClick = () => {
  //   SetLoading(true);
  // };

  // useEffect(() => {
  //   document.title = "ahmadzidni.site";
  //   fetchAsmaulHusna();
  // }, [id]);

  const { data, isLoading } = useQuery({
    queryKey: ["asmaulhusna", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/asmaul-husna/${id}`);
      return response.data.data;
    },
  });

  return (
    <div className="space-navbar bg-sky-50">
      <div className="container min-vh-100">
        <div>
          <>
            <div className="row my-5">
              <div>
                <ul className="pagination">
                  <li className={!data?.info.prev.id ? "d-none" : ""}>
                    <Link
                      to={`/Asmaulhusna/${data?.info.prev.id}`}
                      className="page-link rounded-2 text-black bg-info btn"
                    >
                      Sebelumnya : {data?.info.prev.text_latin}
                    </Link>
                  </li>
                  <li className={!data?.info.next.id ? "d-none" : ""}>
                    <Link
                      className="page-link rounded-2 text-black bg-info btn ms-2"
                      to={`/Asmaulhusna/${data?.info.next.id}`}
                    >
                      Selanjutnya : {data?.info.next.text_latin}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {isLoading ? (
              <div className=" d-flex align-items-center justify-content-center">
                <div className="lds-facebook">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="card border border-1 border-black sky-blue-50">
                    <div className="card-body">
                      <h3 className="card-title text-center fw-bold">
                        {data?.text_latin}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card mt-1 border border-1 border-black sky-blue-50">
                    <div className="card-body">
                      <h1 className="card-title text-center  font-khusus">
                        {data?.text_ar}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card mt-1 border border-1 border-black sky-blue-50">
                    <div className="card-body">
                      <h3 className="card-title text-center text-sentence text-capitalize">
                        {data?.translate_id}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
      <div className="space-footer">
        <FooterComponent />
      </div>
    </div>
  );
};

export default AsmaulHusnaPreview;
