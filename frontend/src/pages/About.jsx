import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/images/about.jpeg"
              alt="about"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="card shadow p-4" style={{ borderRadius: "12px", background: "#f8f9fa" }}>
              <h2 className="mb-3 text-primary text-center">About Us</h2>
              <p className="text-muted mb-4 text-center">
                Welcome to our laundry service! We are committed to providing top-quality laundry and dry cleaning with a focus on hygiene, convenience, and customer satisfaction.
              </p>
              <ul className="list-unstyled fs-5">
                <li className="mb-3">
                  ✅ Professional and experienced staff
                </li>
                <li className="mb-3">
                  ✅ Modern equipment and eco-friendly detergents
                </li>
                <li className="mb-3">
                  ✅ Timely pickup and delivery
                </li>
                <li>
                  ✅ 100% satisfaction guaranteed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;