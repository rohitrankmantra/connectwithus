import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonationSuccess = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your donation was successful. We truly appreciate your support!
        </p>
        <button
          onClick={handleBack}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-xl font-semibold transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default DonationSuccess;
