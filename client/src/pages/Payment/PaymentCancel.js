import React from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Payment Cancelled">
      <div className="container text-center mt-5">
        <h2 style={{ color: "#f39c12" }}>Payment Cancelled</h2>
        <p>Your payment was cancelled. No money was deducted.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </Layout>
  );
};

export default PaymentCancel;