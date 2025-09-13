import React from "react";

const FormModal = ({ title, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">{title} Form</h2>
        {/* Replace this part with your actual form */}
        <form>
          <input
            type="text"
            placeholder="Example Field"
            className="border p-2 w-full mb-4"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
