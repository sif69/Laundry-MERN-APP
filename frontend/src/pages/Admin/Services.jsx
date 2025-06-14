import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  // Get all services
  const getAllServices = async () => {
    try {
      const { data } = await axios.get("/api/v1/service/get-service");
      setServices(data.services);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Services List</h1>
          <div className="row">
            {services?.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <Link to={`/dashboard/admin/service/${p.slug}`} className="service-link">
                  <div className="card h-100 " style={{ borderRadius:"1rem" , backgroundColor:"#F5F5F5"}}>
                    <img
                      src={`/api/v1/service/service-photo/${p._id}`}
                      className="package-image"
                      alt={p.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text flex-grow-1">{p.description}</p>
                      <p className="card-text fw-bold text-primary">৳ {p.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
