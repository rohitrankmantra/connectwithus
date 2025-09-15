import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DonationCancel = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/donate");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
        <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your donation was not completed. You can try again if you like.
        </p>
        <button
          onClick={handleBack}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-xl font-semibold transition duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default DonationCancel;
