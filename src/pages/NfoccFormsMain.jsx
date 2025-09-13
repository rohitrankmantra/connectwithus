import React, { useState } from "react";
import FormModal from "../components/FormModal";
import img1 from "../assets/images/formSectionBg.jpeg"; // Main background
import img2 from "../assets/images/card-bg.jpeg"; // Card background
import { Link } from "react-router-dom";

const formRoutes = {
  "Associate Member": "/associate-member",
  "Media Member": "/media-member",
  "Minister’s Credential": "/minister-credential",
  "Minister’s License Renewal": "/minister-renewal",
};
const forms = [
  "Associate Member",
  "Media Member",
  "Minister’s Credential",
  "Minister’s License Renewal",
];

const FormsSection = () => {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay over main background */}
      <div className="absolute inset-0 bg-[#050A30]/80 z-0" />

      {/* Top Section */}
      <div className="relative z-10 text-white py-40">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Select The Following Form And Complete
          </h2>
          <p className="mt-4 uppercase tracking-wide ">Fill the form</p>
          <div className="w-12 h-1 bg-yellow-500 mx-auto mt-2"></div>
        </div>
      </div>

      {/* White section starts */}
      <div className="relative z-10 bg-white">
        {/* Form Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 -mt-20">
          {forms.map((title, index) => (
            <div
              key={index}
              className="relative text-center h-[15rem] mt-2 border-t-4 border-yellow-500 shadow-md rounded overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[8%]"
                style={{ backgroundImage: `url(${img2})` }}
              />

              <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                <h3 className="font-medium text-black text-2xl">
                  {title.toUpperCase()}
                </h3>
                <Link
                  to={formRoutes[title]} // 👈 dynamic path
                  className="text-yellow-400 hover:text-blue-950 cursor-pointer font-semibold hover:underline"
                >
                  FILL FORM
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Broadcasting Standards Card */}
        <div className="relative w-max mx-auto mt-10 text-center h-[15rem] border-t-4 border-yellow-500 shadow-md rounded overflow-hidden">
          {/* Card background with reduced opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[8%]"
            style={{ backgroundImage: `url(${img2})` }}
          />

          {/* Card content */}
          <div className="relative z-10 p-6 flex flex-col h-full justify-between">
            <h3 className="font-medium text-black text-2xl">
              Broadcasting Standards
            </h3>
            <Link
              to={"/tapon-radio-broadcast-standards"}
              className="text-yellow-400 hover:text-blue-950 cursor-pointer font-semibold hover:underline"
              // onClick={() => setActiveForm(title)}
            >
              View More
            </Link>
          </div>
        </div>

        {/* Pushpay Donation Section */}
        <div className="text-center my-10">
          <h2 className="text-xl font-semibold">PUSHPAY DONATION OPTIONS</h2>
          <p className="uppercase mt-1">Ways to donate:</p>
          <div className="w-12 h-1 bg-black mx-auto mt-2"></div>
        </div>

        <div className="relative w-3/12 mx-auto mt-10 text-center h-[10rem] mb-20 border-t-4 border-yellow-500 shadow-md rounded overflow-hidden">
          {/* Card background with reduced opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[8%]"
            style={{ backgroundImage: `url(${img2})` }}
          />

          {/* Card content */}
          <div className="relative z-10 p-6 flex flex-col h-full justify-between">
            <h3 className="font-medium text-black text-2xl">Pushpay Payment</h3>
            <Link
              to={"/pushpay-donation"}
              className="text-yellow-400 hover:text-blue-950 cursor-pointer font-semibold hover:underline"
              // onClick={() => setActiveForm(title)}
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeForm && (
        <FormModal title={activeForm} onClose={() => setActiveForm(null)} />
      )}
    </div>
  );
};

export default FormsSection;
