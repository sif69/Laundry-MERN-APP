// import React, { useState, useEffect } from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// const Services = () => {
//   const [services, setServices] = useState([]);

//   //get all services
//   const getAllServices = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/service/get-service");
//       setServices(data.services);
//     } catch (error) {
//       console.log(error);
//       toast.error("Something Went Wrong");
//     }
//   };

//   //lifecycle method
//   useEffect(() => {
//     getAllServices();
//   }, []);
//   return (
//     <Layout>
//       <div className="row">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9 ">
//           <h1 className="text-center">All Services List</h1>
//           <div className="d-flex">
//             {services?.map((p) => (
//               <Link
//                 key={p._id}
//                 to={`/dashboard/admin/service/${p.slug}`}
//                 className="service-link"
//               >
//                 <div className="card m-2" style={{ width: "18rem" }}>
//                   <img
//                     src={`/api/v1/service/service-photo/${p._id}`}
//                     className="card-img-top"
//                     alt={p.name}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{p.name}</h5>
//                     <p className="card-text">{p.description}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Services;
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  //get all services
  const getAllServices = async () => {
    try {
      const { data } = await axios.get("/api/v1/service/get-service");
      setServices(data.services);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await axios.delete(`/api/v1/service/delete-service/${id}`);
      toast.success("Service deleted successfully");
      getAllServices();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete service");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Services List</h1>
          <div className="d-flex flex-wrap">
            {services?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/service/service-photo/${p._id}`}
                  className="service-card-img"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/dashboard/admin/service/${p.slug}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
