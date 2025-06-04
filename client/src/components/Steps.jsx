import React from "react";
import pickup from "../assets/pickup.png";
import washDry from "../assets/wash-dry.png";
import fold from "../assets/fold.png";
import delivery from "../assets/delivery.png";

const steps = [
  { step: "Step 1", title: "Pickup", img: pickup },
  { step: "Step 2", title: "Wash & Dry", img: washDry },
  { step: "Step 3", title: "Fold", img: fold },
  { step: "Step 4", title: "Delivery", img: delivery },
];

export default function Steps() {
  return (
    <section className="steps-section">
      <div className="steps-container">
        <h2 className="steps-subtitle">How It Works</h2>
        <h3 className="steps-title">Get it done in 4 steps</h3>

        {/* Step cards */}
        <div className="steps-grid">
          {steps.map(({ step, title, img }) => (
            <div key={step} className="step-card">
              <img src={img} alt={title} className="step-image" />
              <h4 className="step-number">{step}</h4>
              <p className="step-name">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}