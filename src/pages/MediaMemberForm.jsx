import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import bg from "../assets/images/associatebg.jpg";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { toast } from "react-hot-toast";

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
import img2 from "../assets/images/card-bg.jpeg";
import qr from "../assets/images/qr.png";

const { TextArea } = Input;
const { Option } = Select;

const MediaMemberForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (values) => {
    const requiredFields = [
      "name",
      "email",
      "streetAddress",
      "city",
      "state",
      "zip",
      "country",
      "phone",
    ];

    for (const field of requiredFields) {
      if (!values[field]) {
        toast.error(`Please fill in ${field}`);
        return false;
      }
    }

    return true;
  };

  const onFinish = async (values) => {
    if (!validateForm(values)) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add all form values to FormData
      Object.keys(values).forEach((key) => {
        if (key === "signature" && values[key]?.fileList?.[0]) {
          // Handle signature file upload
          formData.append("signature", values[key].fileList[0].originFileObj);
        } else if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      // Add current date if not provided
      if (!values.submissionDate) {
        formData.append(
          "submissionDate",
          new Date().toISOString().split("T")[0]
        );
      }

      const response = await axios.post(
        "https://connectbackend-sol8.onrender.com/api/v1/media-member",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Application submitted successfully!");
        setSubmitted(true);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-cover bg-center min-h-screen pb-10 ">
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
            Media Member
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
            Media Member
          </h1>
        </div>
      </div>

      <div className=" flex justify-center flex-col z-20">
        <MediaInstructions />

        <div className="md:w-8/12 mx-auto mt-10">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Media Member
          </h2>
          <div className="bg-[#1A2E5C] p-5">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "This field is required!" },
                    ]}
                  >
                    <Input placeholder="Your full name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "This field is required!",
                      },
                    ]}
                  >
                    <Input placeholder="your@email.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="streetAddress"
                label="Street Address"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input placeholder="Eg. 42 Wallaby Way" />
              </Form.Item>

              <Form.Item name="apartment" label="Apartment, Suite, etc.">
                <Input />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      { required: true, message: "This field is required!" },
                    ]}
                  >
                    <Input placeholder="Eg. Sydney" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="state"
                    label="State/Province"
                    rules={[
                      { required: true, message: "This field is required!" },
                    ]}
                  >
                    <Input placeholder="Eg. New South Wales" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="zip"
                    label="ZIP / Postal Code"
                    rules={[
                      { required: true, message: "This field is required!" },
                    ]}
                  >
                    <Input placeholder="Eg. 2000" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                      { required: true, message: "This field is required!" },
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
              </Row>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="church"
                label="Name Of Church Or Ministry"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="website"
                label="Website"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input placeholder="https://www.example.com" />
              </Form.Item>

              <Form.Item
                name="denomination"
                label="Denomination"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="position"
                label="Your Position"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="mediaDepartment"
                label="Do you have a media department?"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="mediaDirector"
                label="Who's your media Director?"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="preferredPlatform"
                label="Which media platform do you prefer?"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="contentCreator"
                label="Who's responsible for your content creation?"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="broadcastBefore"
                label="Have you ever broadcast before?"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="mediaCompany"
                label="If so, what media company?"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="demo"
                label="Can you provide a demo?"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="broadcastingStandards"
                label="Have you thoroughly read and understood our broadcasting standards?"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: "This field is required!" }]}
              >
                <Input.TextArea
                  rows={4}
                  maxLength={180}
                  placeholder="Enter message..."
                />
              </Form.Item>

              <Col xs={24}>
                <Form.Item
                  name="signature"
                  label="Upload Signature"
                  rules={[
                    {
                      required: true,
                      message: "Please upload your signature!",
                    },
                  ]}
                >
                  <Upload
                    beforeUpload={() => false}
                    accept="image/*"
                    maxCount={1}
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Upload Signature</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <h1 className="text-white mb-2">
                Please sign this statement : By signing this application page
                you agree that you understand and comply with all of the terms
                and conditions stipulated including, but not limited to, the
                broadcasting standards and all other requirements as a Media
                Member of the National Fellowship Conference of Christian
                Churches. Signed:
              </h1>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 md:w-6/12 mx-2 md:mx-auto mt-16">
        {/* ON LINE */}

        <div className="relative text-center  mt-2 border-t-4 border-yellow-500 shadow-md rounded overflow-hidden w-6/12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[8%]"
            style={{ backgroundImage: `url(${img2})` }}
          />

          <div className="relative z-10 p-6 flex flex-col h-full justify-between">
            <h3 className="font-medium text-black text-2xl">ON LINE</h3>
            <Link
              to={"https://pushpay.com/pay/nfcocc"}
              className="text-yellow-400 hover:text-blue-950 cursor-pointer font-semibold hover:underline"
            >
              Pay Now
            </Link>
          </div>
        </div>

        {/* TEXT */}

        <div className="relative text-center mt-2 border-t-4 border-yellow-500 shadow-md rounded overflow-hidden w-6/12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[8%]"
            style={{ backgroundImage: `url(${img2})` }}
          />

          <div className="relative z-10 p-6 flex flex-col h-full justify-between">
            <h3 className="font-medium text-black text-2xl">Text</h3>
            <h3>Text: 833-228-3756</h3>
            <h3>TYPE IN THE WORD: give</h3>
            <h3>
              YOU WILL RECEIVE A TEXT WITH A LINK CLICK ON THE LINK AND THE APP
              WILL OPEN
            </h3>
          </div>
        </div>
      </div>

      <div className="md:w-6/12 mt-16 mx-auto flex justify-center flex-col">
        <h1 className="text-center font-semibold text-2xl mb-5 ">
          SCAN THE QR CODE FOR GIVING:
        </h1>
        <img className="w-6/12 mx-auto" src={qr}></img>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default MediaMemberForm;
