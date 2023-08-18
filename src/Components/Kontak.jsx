import axios from 'axios';
import React, { useState } from 'react';
import { Form, FloatingLabel, Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2'

const Kontak = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  const PostData = async () => {
    const response = await axios.post('https://api.ahmadzidni.site/api/kontak?ApiKey=ahmadd', formData);
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
      // Simulasi pengiriman data ke server
      await PostData();

      // Menampilkan SweetAlert setelah pengiriman selesai
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Mengirim Pesan',
        text: 'Terimakasih pesannya',
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
    <div className="bg-sky-50">
      <div className="container">
        <div className="row">
          <h1 className="my-5 text-center fw-bold">Hubungi Kami</h1>
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

            <Button variant="primary" type="submit">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Kontak;
