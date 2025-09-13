import React from "react";
import background from "../assets/images/background.png";
import nfocc from "../assets/images/necocc.png";
import scriptureChurch from "../assets/images/scriptureChurch.png";
import tapon from "../assets/images/tapon.png";
import kirkwood from "../assets/images/kirkwood.png";
import aagba from "../assets/images/aagba.png";
import reach from "../assets/images/reach-logo.png";
import { Link } from "react-router-dom";

const ministries = [
  { img: nfocc, alt: "NFCOCC", link: "/form-section" },
  {
    img: scriptureChurch,
    alt: "Scripture Church",
    link: "/scripture-church-form-page",
  },
  { img: tapon, alt: "Tapon", link: "/tapon-form-page" },
  { img: kirkwood, alt: "Gary Kirkwood Ministries", link: "/meeting-request-form-page" },
  { img: aagba, alt: "AAGBA", link: "/" },
  { img: reach, alt: "REACH 1070 Partner", link: "/reach1070c-f-partner" },
];

const FellowshipMinistries = () => {
  return (
    <section
      className="py-16 px-4 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl ">
          Our <span className="text-gray-800 ">Fellowship</span> Ministries
        </h2>
        <div className="mt-2 h-1 w-24 bg-yellow-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {ministries.map(({ img, alt, link }, index) => (
          <Link
            key={index}
            to={link}
            rel="noopener noreferrer"
            className="flex items-center justify-center hover:scale-105 transition-transform"
          >
            <img src={img} alt={alt} className="w-48 h-48 object-contain" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FellowshipMinistries;
