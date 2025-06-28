// import React from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import DefaultProfile from "../../assets/admin-profile.jpg"; // sample profile image

// const AdminDashboard = () => {
//   const [auth] = useAuth();

//   return (
//     <Layout>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <div className="card w-75 p-4 d-flex flex-row align-items-center gap-4">
//               <img
//                 src={DefaultProfile}
//                 alt="Admin Profile"
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   objectFit: "cover",
//                   borderRadius: "50%",
//                   border: "2px solid #ccc"
//                 }}
//               />
//               <div>
//                 <h4 className="mb-2">Admin Name: {auth?.user?.name}</h4>
//                 <p className="mb-1">Email: {auth?.user?.email}</p>
//                 <p className="mb-0">Contact: {auth?.user?.phone}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import DefaultProfile from "../../assets/admin-profile.jpg";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-4 d-flex flex-row align-items-center gap-4">
              <img
                src={DefaultProfile}
                alt="Admin Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #ccc",
                }}
              />
              <div>
                <h4 className="mb-2">Admin Name: {auth?.user?.name}</h4>
                <p className="mb-1">Email: {auth?.user?.email}</p>
                <p className="mb-0">Contact: {auth?.user?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
