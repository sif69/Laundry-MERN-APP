import React from "react";
import { useNavigate } from "react-router-dom";
import WashIronImg from "../assets/wash-iron.png";
import WashFoldImg from "../assets/wash-fold.png";
import IronFoldImg from "../assets/iron-fold.png";
import DryCleaningImg from "../assets/dry-cleaning.png";
import EmergencyServiceImg from "../assets/emergency-service.png";

const packages = [
  {
    slug: "washAndIron",
    title: "Wash & Iron",
    description:
      "All your regular wear garments will be washed, steam ironed and neatly packed for delivery.",
    img: WashIronImg,
  },
  {
    slug: "washAndFold",
    title: "Wash & Fold",
    description:
      "Just in case you choose not to use our steam ironing services we will wash and fold them for you.",
    img: WashFoldImg,
  },
  {
    slug: "ironAndFold",
    title: "Iron & Fold",
    description:
      "Get back your dirty clothes. Your clothes will be ironed and pressed to look the best for you.",
    img: IronFoldImg,
  },
  {
    slug: "dryCleaning",
    title: "Dry Cleaning",
    description:
      "All your sensitive and special garments will be individually treated for any stains and dry cleaned.",
    img: DryCleaningImg,
  },
  {
    slug: "emergencyService",
    title: "Emergency Service",
    description:
      "You can use our emergency service to receive services easily and quickly in our machines using very safe.",
    img: EmergencyServiceImg,
  },
];


  export default function Packages() {
    const navigate = useNavigate();
    return (
      <section className="py-16 px-4 text-center">
        <h2 className="text-blue-600 text-sm font-semibold">SERVICES</h2>
        <h3 className="text-3xl font-bold my-4">Our Services</h3>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto mt-12 px-2">

          {packages.map((pkg, index) => (
            <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 w-full h-[420px] flex flex-col"
            data-aos="fade-up"
            >
          
              <img
              src={pkg.img}
              alt={pkg.title}
              className="w-full h-40 object-cover rounded-t-2xl"
              />
             <div className="p-6 flex flex-col justify-between flex-grow">
             <h4 className="text-blue-600 font-bold text-lg mb-2">{pkg.title}</h4>
             <p className="text-sm text-gray-700 mb-4">{pkg.description}</p>
             
         </div>

            </div>
          ))}
        </div>
      </section>
    );
  }
  