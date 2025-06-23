// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Checkbox, Radio } from "antd";
// import { Prices } from "../components/Prices";
// import { useCart } from "../context/cart";
// import toast from "react-hot-toast";
// const HomePage = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useCart();
//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // get all categories
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get all services
//   const getAllServices = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/service/service-list/${page}`);
//       setLoading(false);
//       setServices(data.services);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   // get total count
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/service/service-count");
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);

//   // load more services
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/service/service-list/${page}`);
//       setLoading(false);
//       setServices((prev) => [...prev, ...data?.services]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   // filter by category
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//   };

//   // get filtered services
//   const filterService = async () => {
//     try {
//       const { data } = await axios.post(`/api/v1/service/service-filters`, {
//         checked,
//         radio,
//       });
//       setServices(data?.services);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Combined effect for filters
//   useEffect(() => {
//     if (!checked.length && !radio.length) {
//       getAllServices();
//     } else {
//       filterService();
//     }
//   }, [checked, radio]);

//   return (
//     <Layout title={"All Services - Best offers "}>
//       <div className="container-fluid row mt-3">
//         <div className="col-md-2">
//           <h4 className="text-center">Filter By Category</h4>
//           <div className="d-flex flex-column">
//             {categories?.map((c) => (
//               <Checkbox
//                 key={c._id}
//                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//               >
//                 {c.name}
//               </Checkbox>
//             ))}
//           </div>
//           {/* price filter */}
//           <h4 className="text-center mt-4">Filter By Price</h4>
//           <div className="d-flex flex-column">
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Prices?.map((p) => (
//                 <div key={p._id}>
//                   <Radio value={p.array}>{p.name}</Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           </div>
//           <div className="d-flex flex-column">
//             <button
//               className="btn btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </div>
//         <div className="col-md-9 offset-1">
//           <h1 className="text-center">All Services</h1>
//           <div className="d-flex flex-wrap">
//             {services?.map((p) => (
//               <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
//                 <img
//                   src={`/api/v1/service/service-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">
//                     {p.description.substring(0, 30)}...
//                   </p>
//                   <p className="card-text"> $ {p.price}</p>
//                   <button
//                     className="btn btn-primary ms-1"
//                     onClick={() => navigate(`/service/${p.slug}`)}
//                   >
//                     More Details
//                   </button>
//                   <button
//                     className="btn btn-secondary ms-1"
//                     onClick={() => {
//                       const serviceWithDate = {
//                         ...p,
//                         purchaseDate: new Date().toISOString(),
//                       };
//                       setCart([...cart, serviceWithDate]);
//                       localStorage.setItem(
//                         "cart",
//                         JSON.stringify([...cart, serviceWithDate])
//                       );
//                       toast.success(`${p.name} added to laundry basket`);
//                     }}
//                   >
//                     Add To Laundry Basket
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="m-2 p-3">
//             {services && services.length < total && (
//               <button
//                 className="btn btn-warning"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Load More"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;

// // import React, { useState, useEffect } from "react";
// // import Layout from "./../components/Layout/Layout";
// // import axios from "axios";
// // import { Checkbox, Radio } from "antd";
// // import { Prices } from "../components/Prices";

// // const HomePage = () => {
// //   const [services, setServices] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [checked, setChecked] = useState([]);
// //   const [radio, setRadio] = useState([]);
// //   const [total, setTotal] = useState(0);
// //   const [page, setPage] = useState(1);
// //   const [loading, setLoading] = useState(false);

// //   // get all categories
// //   const getAllCategory = async () => {
// //     try {
// //       const { data } = await axios.get("/api/v1/category/get-category");
// //       if (data?.success) {
// //         setCategories(data?.category);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // get all services
// //   const getAllServices = async () => {
// //     try {
// //       setLoading(true);
// //       const { data } = await axios.get(`/api/v1/service/service-list/${page}`);
// //       setLoading(false);
// //       setServices(data.services);
// //     } catch (error) {
// //       setLoading(false);
// //       console.log(error);
// //     }
// //   };

// //   // get total count
// //   const getTotal = async () => {
// //     try {
// //       const { data } = await axios.get("/api/v1/service/service-count");
// //       setTotal(data?.total);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // load more services
// //   const loadMore = async () => {
// //     try {
// //       setLoading(true);
// //       const { data } = await axios.get(`/api/v1/service/service-list/${page}`);
// //       setLoading(false);
// //       setServices((prev) => [...prev, ...data?.services]);
// //     } catch (error) {
// //       console.log(error);
// //       setLoading(false);
// //     }
// //   };

// //   // filter by category
// //   const handleFilter = (value, id) => {
// //     let all = [...checked];
// //     if (value) {
// //       all.push(id);
// //     } else {
// //       all = all.filter((c) => c !== id);
// //     }
// //     setChecked(all);
// //   };

// //   // get filtered services
// //   const filterService = async () => {
// //     try {
// //       const { data } = await axios.post(`/api/v1/service/service-filters`, {
// //         checked,
// //         radio,
// //       });
// //       setServices(data?.services);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // Combined effect for filters
// //   useEffect(() => {
// //     if (!checked.length && !radio.length) {
// //       getAllServices();
// //     } else {
// //       filterService();
// //     }
// //   }, [checked, radio]);

// //   useEffect(() => {
// //     getAllCategory();
// //     getTotal();
// //   }, []);

// //   useEffect(() => {
// //     if (page === 1) return;
// //     loadMore();
// //     // eslint-disable-next-line
// //   }, [page]);

// //   return (
// //     <Layout title={"All Services - Best offers "}>
// //       <div className="container-fluid row mt-3">
// //         <div className="col-md-2">
// //           <h4 className="text-center">Filter By Category</h4>
// //           <div className="d-flex flex-column">
// //             {categories?.map((c) => (
// //               <Checkbox
// //                 key={c._id}
// //                 onChange={(e) => handleFilter(e.target.checked, c._id)}
// //               >
// //                 {c.name}
// //               </Checkbox>
// //             ))}
// //           </div>
// //           {/* price filter */}
// //           <h4 className="text-center mt-4">Filter By Price</h4>
// //           <div className="d-flex flex-column">
// //             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
// //               {Prices?.map((p) => (
// //                 <div key={p._id}>
// //                   <Radio value={p.array}>{p.name}</Radio>
// //                 </div>
// //               ))}
// //             </Radio.Group>
// //           </div>
// //           <div className="d-flex flex-column">
// //             <button
// //               className="btn btn-danger"
// //               onClick={() => window.location.reload()}
// //             >
// //               RESET FILTERS
// //             </button>
// //           </div>
// //         </div>
// //         <div className="col-md-9">
// //           <h1 className="text-center">All Services</h1>
// //           <div className="d-flex flex-wrap">
// //             {services?.map((p) => (
// //               <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
// //                 <img
// //                   src={`/api/v1/service/service-photo/${p._id}`}
// //                   className="card-img-top"
// //                   alt={p.name}
// //                 />
// //                 <div className="card-body">
// //                   <h5 className="card-title">{p.name}</h5>
// //                   <p className="card-text">
// //                     {p.description.substring(0, 30)}...
// //                   </p>
// //                   <p className="card-text"> Tk {p.price}</p>
// //                   <button className="btn btn-primary ms-1">More Details</button>
// //                   <button className="btn btn-secondary ms-1">
// //                     Add To Laundry Basket
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="m-2 p-3">
// //             {services && services.length < total && (
// //               <button
// //                 className="btn btn-warning"
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   setPage(page + 1);
// //                 }}
// //               >
// //                 {loading ? "Loading ..." : "Load More"}
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default HomePage;
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Steps from "../components/Steps";
import Packages from "../components/Packages";
import washing1 from "../assets/pick.svg";
import washing2 from "../assets/collect.svg";
import washing3 from "../assets/go.svg";
import washing4 from "../assets/card.svg"

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const washingImages = [washing1, washing2, washing3, washing4];
const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % washingImages.length);
  }, 3000); // Change image every 3 seconds

  return () => clearInterval(interval); // Cleanup
}, []);


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
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  // load more services
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/service/service-list/${page}`);
      setLoading(false);
      setServices((prev) => [...prev, ...data?.services]);
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
  const filterService = async () => {
    try {
      const { data } = await axios.post(`/api/v1/service/service-filters`, {
        checked,
        radio,
      });
      setServices(data?.services);
    } catch (error) {
      console.log(error);
    }
  };

  // Combined effect for filters
  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllServices();
    } else {
      filterService();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  return (
    <Layout title={"All Services - Best offers "}>
      <div className="header-wrapper">
        <header className="header-container">
  <div className="header-content" data-aos="fade-down-right">
    <h1 className="header-title">
      <span className="green-text">Best </span>
      <span className="blue-text">Wash and Iron service</span><br />
      <span className="green-text">in your doorstep...</span>
    </h1>

    <div className="header-divider"></div>

    <p className="header-description">
      Laundry Service is an Online Laundry Platform with the latest technology in washing, dry cleaning and laundry. Our services combine our expertise and experience acquired over a period of time to provide you with clean laundry in the shortest possible turnaround time.
    </p>

   
  </div>

  <div className="header-image-container" data-aos="fade-down-left">
    <img
      src={washingImages[currentImageIndex]}
      alt="Washing Machine"
      className="header-image" 
    />
  </div>
</header>
      </div>

     <Steps/>
     <Packages/> 
    </Layout>
      );
};

export default HomePage;
//  <Layout title={"All Services - Best offers "}>
//       <div className="container-fluid row mt-3">
//         <div className="col-md-2">
//           <h4 className="text-center">Filter By Category</h4>
//           <div className="d-flex flex-column">
//             {categories?.map((c) => (
//               <Checkbox
//                 key={c._id}
//                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//               >
//                 {c.name}
//               </Checkbox>
//             ))}
//           </div>
          
//           <h4 className="text-center mt-4">Filter By Price</h4>
//           <div className="d-flex flex-column">
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Prices?.map((p) => (
//                 <div key={p._id}>
//                   <Radio value={p.array}>{p.name}</Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           </div>
//           <div className="d-flex flex-column">
//             <button
//               className="btn btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </div>
//         <div className="col-md-9 offset-1">
//           <h1 className="text-center">All Services</h1>
//           <div className="d-flex flex-wrap">
//             {services?.map((p) => (
//               <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
//                 <img
//                   src={`/api/v1/service/service-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">
//                     {p.description.substring(0, 30)}...
//                   </p>
//                   <p className="card-text"> $ {p.price}</p>
//                   <button
//                     className="btn btn-primary ms-1"
//                     onClick={() => navigate(`/service/${p.slug}`)}
//                   >
//                     More Details
//                   </button>
//                   <button
//                     className="btn btn-secondary ms-1"
//                     onClick={() => {
//                       const existing = cart.find((item) => item._id === p._id);
//                       let newCart;
//                       if (existing) {
//                         toast.error(
//                           `${p.name} is already in your laundry basket,you can increase or decrease
//                           by checking Laundry Basket`
//                         );
//                         return;
//                       } else {
//                         newCart = [
//                           ...cart,
//                           {
//                             ...p,
//                             quantity: 1,
//                             purchaseDate: new Date().toISOString(),
//                           },
//                         ];
//                       }
//                       setCart(newCart);
//                       localStorage.setItem("cart", JSON.stringify(newCart));
//                       toast.success(`${p.name} added to laundry basket`);
//                     }}
//                   >
//                     Add To Laundry Basket
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="m-2 p-3">
//             {services && services.length < total && (
//               <button
//                 className="btn btn-warning"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Load More"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout> 
//   );
// };

// export default HomePage;

