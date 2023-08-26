import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const ListKomentar = (props) => {
  // console.log(props)

  const [count, setCount] = useState(null);
  const [data, setData] = useState([]);
  // console.log(data);

  const getKomentar = async () => {
    try {
      const response = await axios.get("https://api.ahmadzidni.site/api/kontak?ApiKey=ahmadd");
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
      <h1 className="mb-4">{count} Komentar</h1>
      <div>
        {data.map((d) => {
          return (
            <div className="card mb-3" key={d.id}>
              <ul className="list-group">
                <div className="list-group-item p-2 pe-3">
                  <div className="toast-header">
                    <img src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" className="rounded me-2 img-profile" alt="profile" />
                    <div>
                      <strong className="me-auto">{d.nama}</strong>
                      <span className="d-block">{d.email}</span>
                    </div>
                    <small className="text-body-secondary ms-auto">{d.TimeStamp}</small>
                  </div>
                </div>
                <li className="list-group-item">{d.pesan}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListKomentar;
