import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Form, Button, Spinner } from "react-bootstrap";

import ListKomentar from "./ListKomentar";
import { axiosInstance } from "../libs/axios";

const Kontak = () => {
  const queryClient = useQueryClient();

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data) => {
      return axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/comments`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });

      setData({
        name: "",
        email: "",
        message: "",
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil Mengirim Pesan",
        text: "Terimakasih komentarnya",
      });
    },
    onError: (error) => {
      console.log(error.response.data.code);
      if (error.response.data.code == 500) {
        Swal.fire({
          icon: "error",
          title: "Internal Server Error",
          text: "Internal Server Error",
        });
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div className="bg-sky-100">
      <div className="container">
        <div className="row">
          <h1 className="my-5 text-center fw-bold">Berikan Komentar</h1>
        </div>
        <div className="row">
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="formBasicNama"
            >
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
                placeholder="Masukkan Nama"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPesan"
            >
              <Form.Label>Pesan</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                name="pesan"
                className="h-100"
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                required
                placeholder="Pesan"
              />
            </Form.Group>

            <Button
              type="submit"
              className="btn btn-info w-100 mb-5"
            >
              {isPending ? (
                <Spinner
                  animation="border"
                  size="sm"
                />
              ) : (
                "Kirim Pesan"
              )}
            </Button>
          </Form>
        </div>
        <div className="row">
          <ListKomentar />
        </div>
      </div>
    </div>
  );
};

export default Kontak;
