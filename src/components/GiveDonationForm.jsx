// src/components/GiveDonationForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { Heart, Wallet, CreditCard, CheckCircle, XCircle } from "lucide-react";
import bg from "../assets/images/donate.jpg";

const MessageBox = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";
  const icon =
    type === "success" ? (
      <CheckCircle className="w-6 h-6 mr-2" />
    ) : (
      <XCircle className="w-6 h-6 mr-2" />
    );

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`relative p-6 rounded-lg shadow-lg max-w-sm w-full border ${bgColor} flex items-center justify-between`}
      >
        <div className="flex items-center">
          {icon}
          <p className="text-lg font-semibold">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <XCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const GiveDonationForm = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);

  const paypalRef = useRef();

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setShowMessageBox(true);
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessage("");
    setMessageType("");
  };

  // ✅ Real PayPal Sandbox Integration
  useEffect(() => {
    if (window.paypal && paypalRef.current) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          if (!amount || amount <= 0) {
            showMessage("Please enter a valid donation amount.", "error");
            return;
          }
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount },
                description: `Donation by ${name || "Anonymous"}`,
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          showMessage(
            `Thank you ${name || "Donor"}! Your PayPal donation of $${amount} has been received. A receipt has been sent to ${email}.`,
            "success"
          );
          setAmount("");
          setName("");
          setEmail("");
          setPhone("");
        },
        onError: (err) => {
          console.error(err);
          showMessage("Something went wrong with PayPal.", "error");
        },
      }).render(paypalRef.current);
    }
  }, [amount, name, email]);

  // Dummy Authorize.Net (replace later with real API call)
  const handleDummyAuthorizeNet = () => {
    if (!amount || amount <= 0) {
      showMessage("Please enter a valid amount.", "error");
      return;
    }
    showMessage(
      `Thank you ${name || "Donor"}! Your Authorize.Net donation of $${amount} has been received. A receipt has been sent to ${email}.`,
      "success"
    );
    setAmount("");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div
      id="donation-form"
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-70 p-6 font-inter">
        <header className="text-white text-center mb-10">
          <Heart className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Support Our Mission
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto">
            Your generosity helps us continue our work. Every gift makes a
            difference and you’ll receive a receipt for your records.
          </p>
        </header>

        <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-2xl w-full max-w-xl mx-auto border border-gray-200 rounded-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Make a Donation
          </h2>

          {/* Donation Amount */}
          <div className="mb-6">
            <label className="block text-gray-600 text-lg font-medium mb-2">
              Donation Amount ($USD)
            </label>
            <input
              type="number"
              min="1"
              step="0.01"
              placeholder="e.g. 50.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 transition"
            />
          </div>

          {/* Donor Info */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123-456-7890"
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* PayPal Button */}
          <div className="mb-6 p-4 border border-blue-200 rounded-xl bg-blue-50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Wallet className="w-6 h-6 mr-2 text-black" /> Donate with PayPal
            </h3>
            <div ref={paypalRef}></div>
          </div>

          {/* Authorize.Net Dummy */}
          <div className="mb-6 p-4 border border-purple-200 rounded-xl bg-purple-50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="w-6 h-6 mr-2" /> Donate with Authorize.Net
            </h3>
            <button
              onClick={handleDummyAuthorizeNet}
              className="w-full bg-yellow-600 text-white py-3 px-4 hover:bg-yellow-700 transition duration-300 ease-in-out text-lg font-semibold shadow-md rounded-xl"
            >
              Proceed to Authorize.Net
            </button>
          </div>
        </div>

        <footer className="text-white text-center mt-10 text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          <p className="mt-2">Thank you for your support!</p>
        </footer>
      </div>

      {/* Message Popup */}
      <MessageBox
        message={message}
        type={messageType}
        onClose={closeMessageBox}
      />
    </div>
  );
};

export default GiveDonationForm;
