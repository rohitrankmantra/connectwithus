import React, { useState } from "react";
import { Form, Input, Select, Radio, Button, Row, Col } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import bg from "../assets/images/associatebg.jpg";
import { Link } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const MinistryRequestForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (values) => {
    const requiredFields = [
      "contactName",
      "contactPhone",
      "contactEmail",
      "address",
      "city",
      "state",
      "zip",
      "proposedRole",
      "topic",
      "participants",
      "refreshments",
    ];

    for (const field of requiredFields) {
      if (!values[field]) {
        toast.error(`Please fill in ${field}`);
        return false;
      }
    }

    if (!values.captcha) {
      toast.error("Please enter the captcha characters");
      return false;
    }

    return true;
  };

  const onFinish = async (values) => {
    if (!validateForm(values)) {
      return;
    }

    setLoading(true);

    try {
      // Clean up and transform the values object
      const cleanedValues = Object.keys(values).reduce((acc, key) => {
        if (
          values[key] !== undefined &&
          values[key] !== null &&
          values[key] !== ""
        ) {
          // Transform specific fields if needed
          if (key === "sessionDateTime") {
            acc[key] = values[key];
          } else {
            acc[key] = values[key];
          }
        }
        return acc;
      }, {});

      // Add metadata
      cleanedValues.submissionDate = new Date().toISOString().split("T")[0];
      cleanedValues.formType = "ministry-request";

      const response = await axios.post(
        "https://connectbackend-sol8.onrender.com/api/v1/meeting-or-personal-ministry-request",
        cleanedValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Ministry request submitted successfully!");
        setSubmitted(true);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.code === "NETWORK_ERROR") {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error("Invalid form data. Please check your inputs.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    form.resetFields();
    setSubmitted(false);
  };

  return (
    <>
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
            Meeting or Personal Ministry Request
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
            Meeting or Personal Ministry Request
          </h1>
        </div>
      </div>

      <div className="md:w-8/12 mx-auto mt-10">
        <h2 className="text-center text-3xl font-semibold mb-6">
          Meeting or Personal Ministry Request
        </h2>

        {submitted ? (
          <div className="bg-[#1A2E5C] p-8 text-center rounded-lg shadow-xl">
            <div className="text-white text-2xl font-semibold mb-4">
              Thank You!
            </div>
            <div className="text-white text-lg mb-6">
              Your ministry request has been submitted successfully. We will
              review your request and get back to you soon.
            </div>
            <Button
              type="primary"
              onClick={resetForm}
              className="bg-white text-[#1A2E5C] hover:bg-gray-200"
            >
              Submit Another Request
            </Button>
          </div>
        ) : (
          <div className="bg-[#1A2E5C] p-5 text-white">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <h3 className="text-white">
                If you would like to have a session with Dr. Gary Kirkwood
                please fill out the form below.
              </h3>
              <h3 className="text-white">
                PLEASE NOTE MOST SESSIONS LAST ONLY 1 HOUR
              </h3>

              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item name="code1">
                    <Input placeholder="1" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="code2">
                    <Input placeholder="584e722b6e8d4" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="url">
                    <Input placeholder="https://connectwithus.info" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="code3">
                    <Input placeholder="134" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="requestType">
                <Input placeholder="Speaking-Request" />
              </Form.Item>

              <Form.Item
                name="contactName"
                label="Contact Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="title" label="Title">
                <Input />
              </Form.Item>

              <Form.Item
                name="contactPhone"
                label="Contact Phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="contactEmail"
                label="Contact Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="organizationName"
                label="Name of Organization (If Applicable)"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="organizationDescription"
                label="Brief Description of Your Organization"
              >
                <Input />
              </Form.Item>

              <h2>Session Details</h2>

              <Form.Item
                name="sessionDateTime"
                label="Day, Date & Time of your request?"
                rules={[
                  {
                    required: true,
                    message: "Please provide session date and time",
                  },
                ]}
              >
                <Input placeholder="e.g., Monday, January 15, 2024 at 2:00 PM" />
              </Form.Item>

              <Form.Item
                name="locationRequest"
                label="Location Request (If other than my location)"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Please enter the address" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please enter the city" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: "Please enter the state" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="zip"
                label="Zip"
                rules={[
                  { required: true, message: "Please enter the zip code" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="proposedRole"
                label="Proposed Role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select Service">
                  <Option value="pastoral">Pastoral</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="topic"
                label="Topic of Discussion"
                rules={[{ required: true, message: "Please select a topic" }]}
              >
                <Select placeholder="Select from Options">
                  <Option value="family">Family</Option>
                  <Option value="marriage">Marriage</Option>
                  <Option value="ministry">Ministry</Option>
                  <Option value="business">Business</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="participants"
                label="Key Participants"
                rules={[
                  { required: true, message: "Please select key participants" },
                ]}
              >
                <Select placeholder="Select from Options">
                  <Option value="spouse">Spouse</Option>
                  <Option value="familyMember">Family Member</Option>
                  <Option value="minister">Minister</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="refreshments"
                label="Will this session include or require refreshments?"
                rules={[{ required: true, message: "Please choose an option" }]}
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="referralSource"
                label="How did you hear about Gary Kirkwood?"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="purpose"
                label="Please provide the purpose of this request."
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item
                name="captcha"
                label="Type the characters"
                rules={[
                  { required: true, message: "Please enter the characters" },
                  { min: 3, message: "Please enter at least 3 characters" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="bg-white text-[#1A2E5C] hover:bg-gray-200"
                >
                  {loading ? "Submitting..." : "Send Message"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default MinistryRequestForm;
