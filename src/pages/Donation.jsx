import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Heart, Wallet, CreditCard, XCircle, CheckCircle } from "lucide-react";
import bg from "../assets/images/slider1.jpg";

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
    <div
      id="donation"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
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

const Donation = () => {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(""); // ✅ Added state
  const paypalRef = useRef();
  const [renderPayPalButton, setRenderPayPalButton] = useState(false);
  const [showAuthorizeNetIframe, setShowAuthorizeNetIframe] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setRenderPayPalButton(false);
    setShowAuthorizeNetIframe(false);
    closeMessageBox();
  };

  const handlePayPalDonateClick = () => {
    const donation = parseFloat(amount);
    if (isNaN(donation) || donation <= 0) {
      showMessage("Please enter a valid donation amount for PayPal.", "error");
      return;
    }
    setRenderPayPalButton(true);
    setShowAuthorizeNetIframe(false);
    closeMessageBox();
  };

  const handleAuthorizeNetSubmit = async (e) => {
  e.preventDefault();
  const donation = parseFloat(amount);
  if (isNaN(donation) || donation <= 0) {
    showMessage(
      "Please enter a valid donation amount for Authorize.Net.",
      "error"
    );
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/donate/get-donation-token",
      { amount }
    );

    if (res.data.success) {
      setToken(res.data.token);
      setPaymentUrl(res.data.paymentUrl); // ✅ Save backend-provided paymentUrl
      setShowAuthorizeNetIframe(true);
      setRenderPayPalButton(false);
      showMessage("Loading Authorize.Net payment form...", "success");

      // ✅ Save donor details locally
      localStorage.setItem(
        "donorDetails",
        JSON.stringify({ name, email, phone, amount })
      );

      // ✅ Trigger the hidden form submission once token/paymentUrl are set
      setTimeout(() => {
        const form = document.getElementById("authorizeNetForm");
        if (form) form.submit();
      }, 200); // small delay so React renders the form
    } else {
      showMessage("Error generating token for Authorize.Net.", "error");
    }
  } catch (error) {
    console.error("Authorize.Net token error:", error);
    showMessage("Server error. Please try again later.", "error");
  }
};


  useEffect(() => {
    if (renderPayPalButton && window.paypal && paypalRef.current) {
      paypalRef.current.innerHTML = "";

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "pill",
            label: "donate",
            height: 40,
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              showMessage(
                `Thank you, ${details.payer.name.given_name}, for your generous donation of $${amount}!`,
                "success"
              );
              setRenderPayPalButton(false);
              axios.post(
                "https://connectbackend-vrny.onrender.com/api/v1/donate/send-thankyou",
                {
                  name,
                  email,
                  phone,
                  amount,
                }
              );
              setAmount("");
            });
          },
          onError: (err) => {
            console.error("PayPal Checkout Error:", err);
            showMessage(
              "Something went wrong with your PayPal donation. Please try again.",
              "error"
            );
            setRenderPayPalButton(false);
          },
        })
        .render(paypalRef.current);
    }
  }, [renderPayPalButton, amount]);

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-60 p-4 sm:p-6 lg:p-8 font-inter">
        <header className="text-white text-center mb-10 mt-10">
          <Heart className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Support Our Mission
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto">
            Your generosity helps us continue our work in the community. Every
            contribution makes a difference.
          </p>
        </header>

        <div className="bg-white/90 bg-opacity-95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-2xl w-full max-w-xl mx-auto border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Make a Donation
          </h2>

          <div className="mb-6">
            <label
              htmlFor="donation-amount"
              className="block text-gray-600 text-lg font-medium mb-2"
            >
              Enter Donation Amount ($USD)
            </label>
            <input
              id="donation-amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="e.g. 25.00"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
              required
            />
          </div>
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
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-xl"
              required
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

          <div className="mb-6 p-4 border border-blue-200 rounded-xl bg-blue-50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Wallet className="w-6 h-6 mr-2 text-black" /> Donate with PayPal
            </h3>
            {!renderPayPalButton ? (
              <button
                onClick={handlePayPalDonateClick}
                className="w-full bg-yellow-600 text-white py-3 px-4 hover:bg-yellow-700 transition duration-300 ease-in-out text-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Proceed to PayPal
              </button>
            ) : (
              <div ref={paypalRef} className="mt-4 flex justify-center" />
            )}
          </div>

          <div className="mb-6 p-4 border border-purple-200 rounded-xl bg-purple-50">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 " /> Donate with Authorize.Net
            </h3>
            <form onSubmit={handleAuthorizeNetSubmit}>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 px-4 hover:bg-yellow-700 transition duration-300 ease-in-out text-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                Proceed to Authorize.Net
              </button>
            </form>
          </div>

 {showAuthorizeNetIframe && token && paymentUrl && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className=" max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden relative">
      {/* Close Button */}
      <button
        onClick={() => setShowAuthorizeNetIframe(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
      >
        ✕
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#001053] to-[#761c14] text-white py-5 px-8">
        <h2 className="text-xl font-semibold">Secure Payment</h2>
        <p className="text-sm opacity-90">Complete your donation using Authorize.Net</p>
      </div>

      {/* Iframe + hidden form */}
      <div className="p-6">
        <form
          id="authorizeNetForm"
          method="post"
          action={paymentUrl}
          target="authorizeNetIFrame"
        >
          <input type="hidden" name="token" value={token} />
        </form>
        <iframe
          name="authorizeNetIFrame"
          width="100%"
          height="700px"
          frameBorder="0"
          scrolling="auto"
          className="rounded-lg border border-gray-300"
        ></iframe>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 py-4 px-6 text-center text-xs text-gray-600">
        🔒 Payments are encrypted and securely processed by <b>Authorize.Net</b>.
      </div>
    </div>
  </div>
)}


        </div>

        <footer className="text-white text-center mt-10 text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          <p className="mt-2">Thank you for your support!</p>
        </footer>
      </div>

      <MessageBox
        message={message}
        type={messageType}
        onClose={closeMessageBox}
      />
    </div>
  );
};

export default Donation;
