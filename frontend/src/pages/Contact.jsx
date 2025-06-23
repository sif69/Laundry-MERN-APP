import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/images/Contact.jpeg"
              alt="contactus"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="card shadow p-4" style={{ borderRadius: "12px", background: "#f8f9fa" }}>
              <h2 className="mb-3 text-primary text-center">Contact Us</h2>
              <p className="text-muted mb-4 text-center">
                For any query or info about our services, feel free to contact us anytime. We are available 24x7!
              </p>
              <ul className="list-unstyled fs-5">
                <li className="mb-3">
                  <BiMailSend className="me-2 text-secondary" />
                  <strong>Email:</strong> help@ecommerceapp.com
                </li>
                <li className="mb-3">
                  <BiPhoneCall className="me-2 text-secondary" />
                  <strong>Phone:</strong> 01857-662299
                </li>
                <li>
                  <BiSupport className="me-2 text-secondary" />
                  <strong>Support:</strong> 1800-0000-0000 <span className="text-muted">(toll free)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;