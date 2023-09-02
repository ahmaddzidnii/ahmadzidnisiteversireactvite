import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import Swal from 'sweetalert2'
import ListKomentar from './ListKomentar';

const Kontak = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = {
    nama: '',
    email: '',
    pesan: ''
  }

  const [formData, setFormData] = useState(form);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const PostData = async () => {

    await axios.post(import.meta.env.VITE_PROD_KONTAK_URL, formData);
    setIsLoading(false);

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await PostData();
      setFormData(form)
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Set submitSuccess kembali menjadi false setelah beberapa waktu
      }, 2000);

      // Menampilkan SweetAlert setelah pengiriman selesai
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Mengirim Pesan',
        text: 'Terimakasih komentarnya',
      });
    } catch (error) {
      console.error(error);

      // Menampilkan SweetAlert jika terjadi kesalahan
      if (error.response && error.response.status === 404) {
        // Kesalahan endpoint tidak ditemukan
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: 'Internal Server Error',
        });
      } else {
        // Kesalahan umum lainnya
        Swal.fire({
          icon: 'error',
          title: 'Terjadi kesalahan',
          text: 'Maaf, terjadi kesalahan saat mengirim data.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sky-100">
      <div className="container">
        <div className="row">
          <h1 className="my-5 text-center fw-bold">Berikan Komentar</h1>
        </div>
        <div className="row">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" name="nama" value={formData.nama} onChange={handleChange} required placeholder="Masukkan Nama" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPesan">
              <Form.Label>Pesan</Form.Label>
              <Form.Control type="text" as="textarea" name="pesan" value={formData.pesan} onChange={handleChange} required placeholder="Pesan" />
            </Form.Group>

            <Button type="submit" className="btn btn-info w-100 mb-5">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Kirim Pesan"}
            </Button>
          </Form>
        </div>
        <div className="row">
          <ListKomentar submitSuccess={submitSuccess}/>
        </div>
      </div>
    </div>
  );
}

export default Kontak;
