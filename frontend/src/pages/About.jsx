import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            At Laundry, we make laundry day effortless. Our mission is to deliver fast, reliable, and eco-friendly laundry services tailored to your schedule. Whether it’s everyday wear or delicate fabrics, we handle your clothes with the utmost care. With convenient pickup and delivery options, Landdry is here to simplify your life—one clean load at a time.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;