import React from "react";
import pickup from "../assets/pickup.png";
import washDry from "../assets/wash-dry.png";
import fold from "../assets/fold.png";
import delivery from "../assets/delivery.png";

const steps = [
  { step: 1, title: "Pickup", img: pickup },
  { step: 2, title: "Wash & Dry", img: washDry },
  { step: 3, title: "Fold", img: fold },
  { step: 4, title: "Delivery", img: delivery },
];

export default function Steps() {
  return (
    <section className="bg-blue-50 py-16 px-4 text-center">
      <h2 className="text-blue-600 text-sm font-semibold">HOW IT WORKS</h2>
      <h3 className="text-3xl font-bold my-4">Get it done in 4 steps</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8"  data-aos="zoom-in">
        {steps.map(({ step, title, img }) => (
          <div
            key={step}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center transform hover:scale-105 transition duration-300 animate-fade"

          >
            <img src={img} alt={title} className="h-32" />
            <h4 className="text-blue-600 mt-4">STEP {step}</h4>
            <p className="font-semibold">{title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}