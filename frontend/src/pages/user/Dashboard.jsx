import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Laundry Service"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 p-4 shadow rounded bg-light">
  <h4 className="mb-3 text-primary">Name:{auth?.user?.name}</h4>
  <p className="mb-2"><strong>Email:</strong> {auth?.user?.email}</p>
  <p className="mb-2"><strong>Contact:</strong> {auth?.user?.phone}</p>
  <p><strong>Address:</strong> {auth?.user?.address}</p>
</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;