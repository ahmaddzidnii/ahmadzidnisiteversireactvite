import React from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import moment from "moment";

import avatar from "../assets/img/avatar.png";
import Nav from "react-bootstrap/Nav";
import { axiosInstance } from "../libs/axios";

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

const CardComment = ({ innerRef, d, formatedDate }) => {
  return (
    <div
      ref={innerRef}
      className="card mb-4"
    >
      <div className="card-header">
        <div>
          <div className="d-flex align-items-center">
            <div className="p-2 col-md-11">
              <strong>{d.name}</strong>
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
};

const ListKomentar = () => {
  const [short, setShort] = useState("asc");
  const [isCommentInView, setIsCommentInView] = useState(false);

  const { ref, inView } = useInView();

  const { ref: refTopComment, inView: inViewTopComment } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
      // console.log("inview");
    }
  }, [inView]);

  useEffect(() => {
    if (inViewTopComment) {
      setIsCommentInView(true);
    } else {
      setIsCommentInView(false);
    }
  }, [inViewTopComment]);

  const fetchComments = async ({ pageParam = 1 }) => {
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/comments?limit=10&order=${short}&page=${pageParam}`
    );
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", short],
      queryFn: fetchComments,
      enabled: isCommentInView,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.has_next_page) {
          return lastPage.pagination.current_page + 1;
        } else {
          return undefined;
        }
      },
    });

  const element = data?.pages.map((page) =>
    page.data.map((d, i) => {
      const date = moment(moment.unix(d.time), "YYYYMMDD").fromNow();
      if (page.data.length == i + 1) {
        return (
          <CardComment
            innerRef={ref}
            key={i}
            d={d}
            formatedDate={date}
          />
        );
      } else {
        return (
          <CardComment
            key={i}
            d={d}
            formatedDate={date}
          />
        );
      }
    })
  );

  return (
    <div>
      <div ref={refTopComment}>
        <div className="container">
          <h1 className="mb-4">
            {data?.pages[0].pagination.items.total} Komentar
          </h1>
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

          <div className="row">
            <div className="col-md-12 mb-3">
              {isLoading ? (
                <div className="h-100 justify-content-center d-flex mb-5">
                  <div
                    className="spinner-grow text-info"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div>{element}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isFetchingNextPage && (
        <div className={`justify-content-center d-flex mb-5`}>
          <div
            className="spinner-grow text-info"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListKomentar;
