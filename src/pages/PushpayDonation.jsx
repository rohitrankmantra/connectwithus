import React from "react";
import { Upload, Button, Form, Typography, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import bg from "../assets/images/pushpay_bg.jpg";
import qr from "../assets/images/qr.png";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

const PushpayDonation = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
    message.success("Form submitted successfully!");
  };

  return (
    <div className="relative bg-cover bg-center min-h-screen pb-10 ">
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 30%",
        }}
        className="relative py-28 z-20"
      >
        <div className="relative z-20 flex justify-center">
          {" "}
          {/* Added relative and z-20 */}
          <Link
            to={"https://pushpay.com/pay/nfcocc"}
            target="_blank"
            className="text-lg   text-white text-center font-thin bg-yellow-500 rounded-xl  px-4 py-3"
          >
            Online Donation
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="text-xl font-bold">OR</h1>
          <h1 className="text-lg">Use Other Below Donation Methods</h1>
        </div>
      </div>

      {/* second */}
      <div className="mt-10 md:w-8/12 mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-center md:text-left">
          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            <h1 className="font-semibold mb-4">SCAN THE QR CODE FOR GIVING</h1>
            <img
              src={qr}
              alt="QR Code"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Donate Button Section */}
          <div className="flex flex-col items-center justify-center">
            <Link
              to="/donate"
             
              className="px-6 py-4 bg-black text-white rounded-sm hover:bg-gray-800 transition"
            >
              Donate Now
            </Link>
          </div>

          {/* Text Giving Info Section */}
          <div className="relative text-center md:text-left border-t-4 border-yellow-500 shadow-md rounded overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-[8%]" />
            <div className="relative z-10 p-6 space-y-2 text-black">
              <h3 className="font-medium text-2xl">Text</h3>
              <p>Text: 833-228-3756</p>
              <p>
                TYPE IN THE WORD: <strong>give</strong>
              </p>
              <p>
                YOU WILL RECEIVE A TEXT WITH A LINK <br />
                CLICK ON THE LINK AND THE APP WILL OPEN
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushpayDonation;
