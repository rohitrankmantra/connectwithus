import React from "react";
import Reach10Form from "../components/Reach10Form";
import logo from "../assets/images/reach-logo.png";
import mainbg from "../assets/Reach10/mainbg.webp";
import bg from "../assets/Reach10/bg2.jpg";
import user1 from "../assets/Reach10/user1.jpg";
import user2 from "../assets/Reach10/user2.jpg";
import user3 from "../assets/Reach10/user3.jpg";
import banner from "../assets/Reach10/bs-banner-t-icon.png"

const Reach10 = () => {
  return (
    <div>
      <div>
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center text-white text-center py-20"
          style={{
            backgroundImage: `url(${mainbg})`,
          }}
        >
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>

          {/* Content on top */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <img src={logo} alt="Logo" className="w-30 h-30 mb-4" />
            <h2 className="text-xl italic">Create Healthy Living</h2>
            <img src={banner}></img>
            <h1 className="text-4xl md:text-5xl font-bold my-4">
              Today's Seed - Is Tomorrow's Harvest
            </h1>
            <p className="text-lg">
              Meeting The Need - With My Seed - Sow Today
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="flex  flex-col justify-center items-center py-12 text-center bg-white">
          <h3 className="text-lg text-red-500 italic">Welcome to our</h3>
                      <img src={banner} ></img>
          <h2 className="text-3xl font-bold text-gray-800 my-2">What We Do</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4 mb-10">
            “Where Faith Meets Action” commitment to Service and Social Change
            and embracing Humanity through Our Outreach Programs.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-4">
            <div className="text-center">
              <img
                src={user1}
                alt="Become A Member"
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <p className="font-medium">Become A Member</p>
            </div>
            <div className="text-center">
              <img
                src={user2}
                alt="Healing Sessions"
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <p className="font-medium">Healing Sessions</p>
            </div>
            <div className="text-center">
              <img
                src={user3}
                alt="Outreach Programs"
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <p className="font-medium">Outreach Programs</p>
            </div>
          </div>
        </div>

        {/* Partner Card Section */}
        <div className="md:flex bg-gray-100 items-center py-12">
          <div className="md:w-1/2">
            <img src={bg} alt="Church" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 px-6 md:px-12 text-gray-800">
            <h3 className="text-lg text-red-500 italic mt-6 md:mt-0">
              Welcome to our
            </h3>
             <img src={banner} ></img>
            <h2 className="text-3xl font-bold my-2">Partner Card</h2>
            <p className="mt-4">
              We are so honored to have you as a friend and partner with The
              National Fellowship Conference of Christian Churches and Tapon
              Media! Please take a moment whether you are new or an existing
              Partner or Member to tell us about yourself. This information is
              to identify how we can better serve you and to provide you with
              access to Awards, Incentives, Recognition and Events. Let's Equip.
              Empower. Engage.
            </p>
          </div>
        </div>

        {/* Complete Below Section */}
        <div className="flex flex-col justify-center items-center text-center py-10">
          <h3 className="text-lg text-red-500 italic">Welcome to our</h3>
           <img src={banner} ></img>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Please complete below
          </h2>
        </div>
      </div>
      <Reach10Form />


      <div className="py-12 px-4 text-center mt-10">
  <h2 className="text-3xl font-bold mb-2">Partner's Membership Pricing</h2>
  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 mx-auto my-2 rounded-full"></div>
  <p className="text-gray-500 max-w-xl mx-auto mb-10">
    Transforming Lives, Building Hope. Join Us: Faith in action empowering communities through our outreach programs.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {/* Silver Partner */}
    <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-medium mb-4">Monthly</h3>
      <div className="bg-gray-700 text-white rounded-full py-3 px-6 inline-block text-xl font-semibold">
        <span className="text-sm align-top">$</span>10.70<span className="text-sm ml-1">Month</span>
      </div>
      <p className="mt-4 text-gray-600">Silver Partner</p>
    </div>

    {/* Gold Partner */}
    <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-medium mb-4 text-orange-400">Monthly</h3>
      <div className="bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-full py-3 px-6 inline-block text-xl font-semibold">
        <span className="text-sm align-top">$</span>107.10<span className="text-sm ml-1">Month</span>
      </div>
      <p className="mt-4 text-gray-600">Gold Partner</p>
    </div>

    {/* Platinum Partner */}
    <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-medium mb-4">Yearly</h3>
      <div className="bg-gray-700 text-white rounded-full py-3 px-6 inline-block text-xl font-semibold">
        <span className="text-sm align-top">$</span>1,070.00<span className="text-sm ml-1">Yearly</span>
      </div>
      <p className="mt-4 text-gray-600">Platinum Partner</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default Reach10;
