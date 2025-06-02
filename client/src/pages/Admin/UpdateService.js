import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateService = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loadCount, setLoadCount] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single Service
  const getSingleService = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/service/get-service/${params.slug}`
      );
      setName(data.service.name);
      setId(data.service._id);
      setDescription(data.service.description);
      setPrice(data.service.price);
     
      setLoadCount(data.service.loadCount);
      setShipping(data.service.shipping);
      setCategory(data.service.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleService();
    //eslint-disable-next-line
  }, []);




  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create Service function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const serviceData = new FormData();
      serviceData.append("name", name);
      serviceData.append("description", description);
      serviceData.append("price", price);
      serviceData.append("loadCount", loadCount);
      photo && serviceData.append("photo", photo);
      serviceData.append("category", category);
      serviceData.append("shipping", shipping);
      const { data } = await axios.put(
        `/api/v1/service/update-service/${id}`,
        serviceData
      );
      if (data?.success) {
      toast.success("Service Updated Successfully");
      navigate("/dashboard/admin/services");
    } else {
      toast.error(data?.message);
    }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a service
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this service ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/service/delete-service/${id}`
      );
      toast.success("Service Deleted Succfully");
      navigate("/dashboard/admin/services");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Update Service"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Service</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="service_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/service/service-photo/${id}`}
                      alt="service_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={loadCount}
                  placeholder="write a load count"
                  className="form-control"
                  onChange={(e) => setLoadCount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE Service
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateService;