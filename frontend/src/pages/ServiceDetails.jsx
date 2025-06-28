import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import axios from "../axiosConfig";
import { useParams } from "react-router-dom";
import { getServicePhotoUrl } from "../utils/getApiUrl";
const ServiceDetails = () => {
  const params = useParams();
  const [service, setService] = useState({});
  const [relatedServices, setRelatedServices] = useState([]);
  const [cart, setCart] = useCart();
  // add to cart

  const handleAddToCart = (service) => {
    // Only block if the exact same _id is already in the cart
    if (cart.some((item) => item._id === service._id)) {
      toast.error(`${service.name} is already in your laundry basket`);
      return;
    }
    const serviceWithDate = {
      ...service,
      purchaseDate: new Date().toISOString(),
      quantity: 1,
    };
    setCart([...cart, serviceWithDate]);
    localStorage.setItem("cart", JSON.stringify([...cart, serviceWithDate]));
    toast.success(`${service.name} added to laundry basket`);
  };

  // initial details
  useEffect(() => {
    if (params?.slug) getService();
  }, [params?.slug]);
  // getService
  const getService = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/service/get-service/${params.slug}`
      );
      setService(data?.service);
      getSimilarService(data?.service._id, data?.service.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  // get similar service
  const getSimilarService = async (sid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/service/related-service/${sid}/${cid}`
      );
      setRelatedServices(data?.services);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={getServicePhotoUrl(service._id)}
            className="card-img-top"
            alt={service.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Service Details</h1>
          <h6>Name : {service.name}</h6>
          <h6>Description : {service.description}</h6>
          <h6>Price : {service.price}</h6>
          <h6>Category : {service?.category?.name}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => handleAddToCart(service)}
          >
            Add To Laundry Basket
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Services</h6>
        {relatedServices.length < 1 && (
          <p className="text-center">No Similar Services found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedServices?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={getServicePhotoUrl(p?._id)}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                {/* <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/service/${p.slug}`)}
                >
                  More Details
                </button> */}
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => handleAddToCart(p)}
                >
                  Add To Laundry Basket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetails;
