import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Policy Page"}>
      <div className="container py-5">
        <div className="row align-items-center shadow rounded bg-white p-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="p-4" style={{ background: "#f8f9fa", borderRadius: "12px" }}>
              <h2 className="mb-3 text-primary">Our Policy</h2>
              <ul className="list-unstyled fs-5">
                <li>✅ <strong>First Come, First Service</strong></li>
                <li>✅ Quality and hygiene are our top priorities</li>
                <li>✅ Timely delivery guaranteed</li>
                <li>✅ Customer satisfaction is our mission</li>
              </ul>
              <p className="mt-4 text-muted">
                For more details, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;