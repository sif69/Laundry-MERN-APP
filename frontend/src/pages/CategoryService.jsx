import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const CategoryService = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getServicesByCat();
  }, [params?.slug]);
  const getServicesByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/service/service-category/${params.slug}`
      );
      setServices(data?.services);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div style={{ backgroundColor: "#e0f7fa", minHeight: "100vh", padding: "1rem" }}>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{services?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {services?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/service/service-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> $ {p.price}</p>
                    {/* <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/service/${p.slug}`)}
                    >
                      More Details
                    </button> */}
                    <button className="btn btn-secondary ms-1">
                      Add To Laundry Basket
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {

            /* <div className="m-2 p-3">
            {services && services.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */
          }
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default CategoryService;