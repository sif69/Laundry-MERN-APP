import React from "react";
import WashIronImg from "../assets/wash-iron.png";
import WashFoldImg from "../assets/wash-fold.png";
import IronFoldImg from "../assets/iron-fold.png";
import DryCleaningImg from "../assets/dry-cleaning.png";
import EmergencyServiceImg from "../assets/emergency-service.png";

const packages = [
  {
    slug: "washAndIron",
    title: "Wash & Iron",
    description: "All your regular wear garments will be washed, steam ironed and neatly packed for delivery.",
    img: WashIronImg,
  },
  {
    slug: "washAndFold",
    title: "Wash & Fold",
    description: "Just in case you choose not to use our steam ironing services we will wash and fold them for you.",
    img: WashFoldImg,
  },
  {
    slug: "ironAndFold",
    title: "Iron & Fold",
    description: "Get back your dirty clothes. Your clothes will be ironed and pressed to look the best for you.",
    img: IronFoldImg,
  },
  {
    slug: "dryCleaning",
    title: "Dry Cleaning",
    description: "All your sensitive and special garments will be individually treated for any stains and dry cleaned.",
    img: DryCleaningImg,
  },
  {
    slug: "emergencyService",
    title: "Emergency Service",
    description: "You can use our emergency service to receive services easily and quickly in our machines using very safe.",
    img: EmergencyServiceImg,
  },
];

export default function Packages() {
  
  
  return (
    <section className="packages-section">
      <div className="packages-container">
        <h2 className="packages-subtitle">SERVICES</h2>
        <h3 className="packages-title">Our Services</h3>

        <div className="packages-grid" >
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="package-card"
              data-aos="flip-left"
            >
              <img
                src={pkg.img}
                alt={pkg.title}
                className="package-image" 
              />
              <div className="package-content">
                <h4 className="package-name">{pkg.title}</h4>
                <p className="package-description">{pkg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}