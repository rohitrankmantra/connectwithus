import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import bg from "../assets/images/associatebg.jpg";

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

const { TextArea } = Input;
const { Option } = Select;

const AssociateMember = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://connectbackend-vrny.onrender.com/api/v1/associate-member",
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
            Associate Member
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
            Associate Member
          </h1>
        </div>
      </div>

      <div className="bg-gray-100 flex justify-center flex-col z-20">
        <h1 className="text-center text-black text-4xl font-semibold my-10 mx-auto p-2 md:p-0 md:w-8/12 py-8">
          Associate Member
        </h1>

        <div className="md:w-8/12 mx-auto">
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
              <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                // Apply text-white to the form for global label color
                className="bg-[#1A2E5C] mx-auto my-8 text-white  rounded-lg shadow-xl max-w-4xl"
                initialValues={{
                  country: "USA",
                  hasMediaDept: false,
                  broadcastedBefore: false,
                }}
              >
                {/* Personal Information Section */}
                <Row gutter={[24, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label={<span className="text-white">Name</span>} // Explicitly set label color
                      rules={[
                        { required: true, message: "Please enter your name!" },
                      ]}
                    >
                      <Input placeholder="John Doe" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label={<span className="text-white">Email Address</span>} // Explicitly set label color
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please enter a valid email address!",
                        },
                      ]}
                    >
                      <Input placeholder="john.doe@example.com" />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="streetAddress"
                      label={<span className="text-white">Street Address</span>} // Explicitly set label color
                      rules={[
                        {
                          required: true,
                          message: "Please enter your street address!",
                        },
                      ]}
                    >
                      <Input placeholder="123 Main St" />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      name="apartment"
                      label={
                        <span className="text-white">
                          Apartment, suite, etc.
                        </span>
                      } // Explicitly set label color
                    >
                      <Input placeholder="Apt 4B" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="city"
                      label={<span className="text-white">City</span>} // Explicitly set label color
                      rules={[
                        { required: true, message: "Please enter your city!" },
                      ]}
                    >
                      <Input placeholder="New York" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="state"
                      label={<span className="text-white">State/Province</span>} // Explicitly set label color
                      rules={[
                        {
                          required: true,
                          message: "Please enter your state/province!",
                        },
                      ]}
                    >
                      <Input placeholder="NY" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="zip"
                      label={
                        <span className="text-white">ZIP / Postal Code</span>
                      } // Explicitly set label color
                      rules={[
                        {
                          required: true,
                          message: "Please enter your ZIP/postal code!",
                        },
                      ]}
                    >
                      <Input placeholder="10001" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="country"
                      label={<span className="text-white">Country</span>} // Explicitly set label color
                      rules={[
                        {
                          required: true,
                          message: "Please select your country!",
                        },
                      ]}
                    >
                      <Select showSearch placeholder="Select a country">
                        <Option value="USA">United States</Option>
                        <Option value="Canada">Canada</Option>
                        <Option value="UK">United Kingdom</Option>
                        <Option value="Australia">Australia</Option>
                        <Option value="Germany">Germany</Option>
                        <Option value="France">France</Option>
                        <Option value="Japan">Japan</Option>
                        <Option value="India">India</Option>
                        <Option value="China">China</Option>
                        <Option value="Brazil">Brazil</Option>
                        <Option value="Mexico">Mexico</Option>
                        <Option value="Italy">Italy</Option>
                        <Option value="Spain">Spain</Option>
                        <Option value="SouthAfrica">South Africa</Option>
                        <Option value="Nigeria">Nigeria</Option>
                        <Option value="Egypt">Egypt</Option>
                        <Option value="Argentina">Argentina</Option>
                        <Option value="Russia">Russia</Option>
                        <Option value="SouthKorea">South Korea</Option>
                        <Option value="SaudiArabia">Saudi Arabia</Option>
                        <Option value="Indonesia">Indonesia</Option>
                        <Option value="Turkey">Turkey</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label={<span className="text-white">Phone Number</span>} // Explicitly set label color
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number!",
                        },
                      ]}
                    >
                      <Input placeholder="(123) 456-7890" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 16]}>
                  <Col xs={24}>
                    <Form.Item
                      name={["churchName"]}
                      label={
                        <span className="text-white">
                          Name Of Church Or Ministry
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message:
                            "Please enter the name of church or ministry",
                        },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name={["churchAddress"]}
                      label={<span className="text-white">Address</span>}
                      rules={[
                        { required: true, message: "Please enter the address" },
                      ]}
                    >
                      <Input placeholder="Church Address" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name="website"
                      label={<span className="text-white">Website</span>}
                      rules={[
                        {
                          required: true,
                          type: "url",
                          message: "Please enter a valid URL",
                        },
                      ]}
                    >
                      <Input placeholder="E.g. http://www.example.com" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name="denomination"
                      label={<span className="text-white">Denomination</span>}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your denomination",
                        },
                      ]}
                    >
                      <Input placeholder="Enter denomination" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name="position"
                      label={<span className="text-white">Your Position</span>}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your position",
                        },
                      ]}
                    >
                      <Input placeholder="e.g. Pastor, Elder" />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      name="message"
                      label={<span className="text-white">Message</span>}
                    >
                      <TextArea
                        rows={4}
                        maxLength={180}
                        showCount
                        placeholder="Enter your message..."
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="bg-white text-[#1A2E5C] hover:bg-gray-200"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssociateMember;
