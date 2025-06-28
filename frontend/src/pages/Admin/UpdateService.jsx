import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "../../axiosConfig";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getServicePhotoUrl } from "../../utils/getApiUrl";
const { Option } = Select;

const UpdateService = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // Get single service
  const getSingleService = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/service/get-service/${params.slug}`
      );
      setName(data.service.name);
      setId(data.service._id);
      setDescription(data.service.description);
      setPrice(data.service.price);
      setCategory(data.service.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update service
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const serviceData = new FormData();
      serviceData.append("name", name);
      serviceData.append("description", description);
      serviceData.append("price", price);
      if (photo) serviceData.append("photo", photo);
      serviceData.append("category", category);

      await axios.put(
        `/api/v1/service/update-service/${id}`,
        serviceData
      );
      toast.success("Service Updated Successfully");
      navigate("/dashboard/admin/services");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete service (updated with confirm dialog)
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this service?");
      if (!confirmDelete) return;

      const { data } = await axios.delete(
        `/api/v1/service/delete-service/${id}`
      );
      toast.success("Service Deleted Successfully");
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
                onChange={(value) => setCategory(value)}
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
              <div className="mb-3 text-center">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : getServicePhotoUrl(id)
                  }
                  alt="service_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
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
