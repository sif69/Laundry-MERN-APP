import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { getServicePhotoUrl } from "../utils/getApiUrl";

const ServicePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all services
  const getAllServices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/service/service-list/${page}`);
      setLoading(false);
      setServices(data.services);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/service/service-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
  if (page === 1) return;
  if (!checked.length && !radio.length) {
    loadMore();
  } else {
    filterService(page);
  }
  // eslint-disable-next-line
}, [page]);

  // load more services
const loadMore = async () => {
  try {
    setLoading(true);
    let data;
    if (!checked.length && !radio.length) {
      // No filters, get all services
      const res = await axios.get(`/api/v1/service/service-list/${page}`);
      data = res.data;
    } else {
      // Filters active, get filtered services
      const res = await axios.post(`/api/v1/service/service-filters`, {
        checked,
        radio,
        page,
      });
      data = res.data;
    }
    setLoading(false);
    setServices((prev) => [...prev, ...(data?.services || [])]);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filtered services
  const filterService = async (pageNum = 1) => {
  try {
    const { data } = await axios.post(`/api/v1/service/service-filters`, {
      checked,
      radio,
      page: pageNum,
    });
    if (pageNum === 1) {
      setServices(data?.services);
    } else {
      setServices((prev) => [...prev, ...(data?.services || [])]);
    }
  } catch (error) {
    console.log(error);
  }
};

  // Combined effect for filters
  useEffect(() => {
  setPage(1);
  filterService(1);
  // eslint-disable-next-line
}, [checked, radio]);

  return (
    <Layout title={"All Services - Best offers "}>
      <div className="service-page-background">
        <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 offset-1">
          <h1 className="text-center">All Services</h1>
          <div className="d-flex flex-wrap">
            {services?.map((p) => (
              <div className="card m-2" style={{ width: "18rem", borderRadius: "1rem" , backgroundColor: "#F5F5F5"
               }} key={p._id}>
                <img
                  src={getServicePhotoUrl(p._id)}
                  className="package-image"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ৳{p.price}</p>
                  {/* <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/service/${p.slug}`)}
                  >
                    More Details
                  </button> */}
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      const existing = cart.find((item) => item._id === p._id);
                      let newCart;
                      if (existing) {
                        toast.error(
                          `${p.name} is already in your laundry basket,you can increase or decrease
                          by checking Laundry Basket`
                        );
                        return;
                      } else {
                        newCart = [
                          ...cart,
                          {
                            ...p,
                            quantity: 1,
                            purchaseDate: new Date().toISOString(),
                          },
                        ];
                      }
                      setCart(newCart);
                      localStorage.setItem("cart", JSON.stringify(newCart));
                      toast.success(`${p.name} added to laundry basket`);
                    }}
                  >
                    Add To Laundry Basket
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {services && services.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
      </div>

    </Layout>
  );
};

export default ServicePage;
