import React from "react";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";

import axios from "axios";
import { InputGroup, Form } from "react-bootstrap";
import FooterComponent from "../Components/FooterComponent";
import { NavLink } from "react-router-dom";
import { axiosInstance } from "../libs/axios";
import { Loader } from "../Components/loader";

const WrapperCard = ({ d, innerRef }) => {
  return (
    <div className="col-md-6">
      <NavLink
        ref={innerRef}
        to={`/Asmaulhusna/${d.id}`}
        className="card my-2 transisi text-decoration-none"
      >
        <div className="card pt-3 px-2">
          <div className="card-body">
            <div>
              <div className="d-flex align-items-start">
                <span className="badge bg-sky-600  nomor fs-1 me-4">
                  {d.id}
                </span>
                <div>
                  <h4 className="card-title">{d.text_latin}</h4>
                  <h3>{d.text_ar}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

const AsmaulHusna = () => {
  const [value, setValue] = useState("");
  const [valueDebounced] = useDebounce(value, 1000);

  const { ref, inView } = useInView();

  const fetchComments = async ({ pageParam = 1 }) => {
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/asmaul-husna?limit=20&page=${pageParam}${
        valueDebounced && `&q=${valueDebounced}`
      }`
    );
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "asmaul-husna-list",
        valueDebounced && `key=${valueDebounced}`,
      ],
      queryFn: fetchComments,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.has_next_page) {
          return lastPage.pagination.current_page + 1;
        } else {
          return undefined;
        }
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
      // console.log("inview");
    }
  }, [inView]);

  const element = data?.pages.map((page) => {
    return page.data.map((item, index) => {
      if (page.data.length === index + 1) {
        return (
          <WrapperCard
            key={index}
            innerRef={ref}
            d={item}
          />
        );
      } else {
        return (
          <WrapperCard
            key={index}
            d={item}
          />
        );
      }
    });
  });

  return (
    <div className="list-surah-section bg-sky-50">
      <div className="container space-navbar min-vh-100">
        <div className="row mb-5">
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
        <div className="row">{isLoading ? <Loader /> : element}</div>
        {isFetchingNextPage && (
          <section className="mt-5 d-flex  justify-content-center">
            <div className="lds-facebook ">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </section>
        )}
      </div>
      <div className="pt-5">
        <FooterComponent />
      </div>
    </div>
  );
};

export default AsmaulHusna;
