import React from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Payment Failed">
      <div className="container text-center mt-5">
        <h2 style={{ color: "#e74c3c" }}>Payment Failed</h2>
        <p>Unfortunately, your payment could not be processed.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </Layout>
  );
};

export default PaymentFail;