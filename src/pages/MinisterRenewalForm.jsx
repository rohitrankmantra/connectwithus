import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import bg from "../assets/images/associatebg.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Row,
  Col,
  Space,
  Switch,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MediaInstructions from "../components/MediaInstructions";

const { TextArea } = Input;
const { Option } = Select;

const MinisterRenewalForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://connectbackend-vrny.onrender.com/api/v1/minister-renewal",
        values
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Application submitted successfully!");
        setSubmitted(true);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-cover bg-center min-h-screen pb-10 ">
      <Toaster position="top-right" />
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
            Minister Renewal
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
            className="text-white"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <Link to={"/"} className="text-white ml-1 text-lg md:text-xl">
            Home{" "}
          </Link>
          <h1 className="text-green-500 mx-2 text-lg md:text-xl">
            {" "}
            Minister Renewal
          </h1>
        </div>
      </div>

      <div className=" flex justify-center flex-col z-20 mt-10">
        <h2 className="text-3xl font-thin text-center  mb-6">
          Please Answer All Questions & Provide Requested Information.
          <br />
          Incomplete Applications Will Not Be Processed.
        </h2>

        <div className="md:w-8/12 mx-auto mt-10">
          {submitted ? (
            <div className="bg-[#1A2E5C] p-8 text-center rounded-lg shadow-xl">
              <div className="text-white text-2xl font-semibold mb-4">
                Thank You!
              </div>
              <div className="text-white text-lg mb-6">
                Your associate member application has been submitted
                successfully. We will review your application and get back to
                you soon.
              </div>
              <Button
                type="primary"
                onClick={() => setSubmitted(false)}
                className="bg-white text-[#1A2E5C] hover:bg-gray-200"
              >
                Submit Another Application
              </Button>
            </div>
          ) : (
            <div className="bg-[#1A2E5C] p-5">
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="currentTitle"
                  label="Current Title"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select">
                    <Option value="Apostle">Apostle</Option>
                    <Option value="Bishop">Bishop</Option>
                    <Option value="Dr.">Dr.</Option>
                    <Option value="Evangelist">Evangelist</Option>
                    <Option value="Minister">Minister</Option>
                    <Option value="Miss">Miss</Option>
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Mrs.">Mrs.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Pastor">Pastor</Option>
                    <Option value="Rev.">Rev.</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="otherTitle"
                  label='If Current Title is "Other" Please Designate Here'
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="mailingAddress"
                  label="Mailing Address"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Street Address" />
                </Form.Item>

                <Form.Item
                  name="apartment"
                  label="Apartment, suite, etc."
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="city"
                      label="City"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="state"
                      label="State/Province"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="E.g. New South Wales" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="zip"
                      label="ZIP / Postal Code"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="E.g. 2000" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="country"
                      label="Country"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select country">
                        <Option value="USA">USA</Option>
                        <Option value="India">India</Option>
                        <Option value="Australia">Australia</Option>
                        {/* Add more as needed */}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input />
                </Form.Item>

                <div className="text-sm text-white mt-[-12px] mb-4">
                  *Required to receive updates regarding NFCOCC and the
                  Director's Program.
                </div>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("You must agree to terms."),
                    },
                  ]}
                >
                  <Checkbox>
                    Do you understand and agree to the Terms & Conditions of the
                    NFCOCC Director Position as outlined in the "Disclaimer"
                    below?
                  </Checkbox>
                </Form.Item>

                <div className="text-xs text-white mb-6 leading-relaxed">
                  Disclaimer: This application is not an employment contract.
                  Applicants/Directors ("Directors") are considered to be
                  self-employed for tax purposes and are solely responsible for
                  his/her Federal, State, and Social Security taxes. Directors
                  will not have any benefits or privileges as it relates to
                  employment issues. Directors must conduct themselves in a
                  reasonable manner and comply with NFCOCC Bylaws and
                  Constitution. Directors must be in good standing with their
                  NFCOCC Ministerial Credentials. Director status is subject to
                  termination by the Director or NFCOCC at will, with or without
                  cause, and with or without notice, at any time.
                </div>

                <Form.Item
                  name="electronicSignature"
                  label="Electronic Signature:"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter signature using slash format, e.g. /ABC/" />
                </Form.Item>

                <Form.Item
                  name="signedBy"
                  label="Signed By"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Please type your full legal name." />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="bg-white text-[#1A2E5C] hover:bg-gray-200"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </Form.Item>

                <div className="text-white mt-4">
                  <a
                    href="/assets/pdf/w9.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-white"
                  >
                    CLICK HERE TO DOWNLOAD A W-9 FORM
                  </a>
                </div>
              </Form>
            </div>
          )}
          ;
        </div>
      </div>
    </div>
  );
};

export default MinisterRenewalForm;
