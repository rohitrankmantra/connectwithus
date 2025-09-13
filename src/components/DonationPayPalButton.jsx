import React, { useEffect, useRef, useState } from "react";

const DonationPayPalButton = () => {
  const paypalRef = useRef();
  const [amount, setAmount] = useState("");
  const [renderButton, setRenderButton] = useState(false);
  const [error, setError] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setRenderButton(false);
    setError("");
  };

  const handleDonateClick = () => {
    const donation = parseFloat(amount);
    if (!donation || donation <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }
    setRenderButton(true);
  };

  useEffect(() => {
    if (renderButton && window.paypal && amount) {
      window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "donate",
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
            alert(`Thank you, ${details.payer.name.given_name}, for your donation of $${amount}!`);
            console.log("Donation Details:", details);
          });
        },
        onError: (err) => {
          console.error("PayPal Checkout Error: ", err);
          alert("Something went wrong with your donation. Please try again.");
        },
      }).render(paypalRef.current);
    }
  }, [renderButton, amount]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Support Our Mission 💖</h2>
      <p className="text-gray-600 mb-4 text-center">Enter the amount you'd like to donate:</p>

      <input
        type="number"
        min="1"
        placeholder="e.g. 20"
        value={amount}
        onChange={handleAmountChange}
        className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {!renderButton && (
        <button
          onClick={handleDonateClick}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Donate with PayPal
        </button>
      )}

      {renderButton && <div ref={paypalRef} className="mt-4" />}
    </div>
  );
};

export default DonationPayPalButton;
