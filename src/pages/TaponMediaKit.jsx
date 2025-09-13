import React from "react";
import bg from "../assets/images/associatebg.jpg";
import background from "../assets/images/background.png";
import { Link } from "react-router-dom";
import bg2 from "../assets/images/mediaKit.png";
const TaponMediaKit = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 30%",
        }}
        className="relative py-32 z-20"
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20">
          {" "}
          {/* Added relative and z-20 */}
          <h1 className="text-4xl md:text-5xl  text-white text-center my-4">
            Tapon Media Kit
          </h1>
        </div>

        <div className="flex absolute bottom-1 translate-x-1/2 right-1/2 justify-end p-2 w-max mx-auto bg-black/10 text-2xl items-center z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="text-white"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <Link to={"/"} className="text-white ml-1 text-lg md:text-xl">
            Home{" "}
          </Link>
          <h1 className="text-green-500 mx-2 text-lg md:text-xl">
            {" "}
            Tapon Media Kit
          </h1>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center px-4 py-2">
        <img src={bg2}></img>
        <Link
          to={"/assets/pdf/TAPON-MEDIA-KIT-RATE-CARD.pdf"}
          target="_blank"
          className="bg-yellow-500 text-black px-4 py-3 my-5 "
        >
          Download ppt
        </Link>
      </div>
    </div>
  );
};

export default TaponMediaKit;
