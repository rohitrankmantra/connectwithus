import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Upload,
  Checkbox,
  Row,
  Col,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import bg from "../assets/images/associatebg.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const { TextArea } = Input;
const { Option } = Select;

const EventAttendanceForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (values) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "streetAddress",
      "city",
      "state",
      "zip",
      "dayPhone",
      "email",
      "eventSelection",
    ];

    for (const field of requiredFields) {
      if (!values[field]) {
        toast.error(`Please fill in ${field}`);
        return false;
      }
    }

    if (!values.termsAgreement) {
      toast.error("Please agree to the terms and conditions");
      return false;
    }

    if (!values.noCostEvents) {
      toast.error("Please confirm the no-cost events agreement");
      return false;
    }

    if (!values.signature || values.signature.length === 0) {
      toast.error("Please upload your signature");
      return false;
    }

    return true;
  };

  const handleFinish = async (values) => {
    if (!validateForm(values)) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add all form values to FormData
      Object.keys(values).forEach((key) => {
        if (key === "signature" && values[key]?.length > 0) {
          // Handle signature file upload
          formData.append("signature", values[key][0].originFileObj);
        } else if (
          values[key] !== undefined &&
          values[key] !== null &&
          values[key] !== ""
        ) {
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
        "https://connectbackend-sol8.onrender.com/api/v1/event-attendance-registration-verification-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Event attendance registration submitted successfully!");
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
        toast.error("Failed to submit registration. Please try again.");
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
            Event Attendance Registration Verification Form
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
            Event Attendance Registration Verification Form
          </h1>
        </div>
      </div>

      <div className="md:w-8/12 mx-auto mt-10">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Event Attendance Registration Verification Form
        </h2>

        {submitted ? (
          <div className="bg-[#1A2E5C] p-8 text-center rounded-lg shadow-xl">
            <div className="text-white text-2xl font-semibold mb-4">
              Thank You!
            </div>
            <div className="text-white text-lg mb-6">
              Your event attendance registration has been submitted
              successfully. We will review your registration and get back to you
              soon.
            </div>
            <Button
              type="primary"
              onClick={resetForm}
              className="bg-white text-[#1A2E5C] hover:bg-gray-200"
            >
              Submit Another Registration
            </Button>
          </div>
        ) : (
          <div className="bg-[#1A2E5C] p-5 text-white">
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                      { required: true, message: "First name is required" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                      { required: true, message: "Last name is required" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="streetAddress"
                label="Street Address"
                rules={[
                  { required: true, message: "Street address is required" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "City is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: "State is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="zip"
                label="ZIP Code"
                rules={[{ required: true, message: "ZIP code is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="dayPhone"
                label="Day Time Phone Number"
                rules={[{ required: true, message: "Day phone is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="nightPhone" label="Night Time Phone Number">
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Enter a valid email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="attendeeCount"
                label="How many will be attending the event selected below?"
                rules={[
                  {
                    pattern: /^[1-9]\d*$/,
                    message: "Please enter a valid number",
                  },
                ]}
              >
                <Input type="number" min="1" />
              </Form.Item>

              <Form.Item
                label="Will anyone be celebrating a birthday?"
                name="birthdayCelebration"
              >
                <Radio.Group>
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="birthdayCount"
                label="If so how many?"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter a valid number",
                  },
                ]}
              >
                <Input type="number" min="0" />
              </Form.Item>

              <Form.Item
                label="Anyone celebrating wedding anniversary?"
                name="weddingAnniversary"
              >
                <Radio.Group>
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="weddingAnniversaryCount"
                label="If so how many?"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter a valid number",
                  },
                ]}
              >
                <Input type="number" min="0" />
              </Form.Item>

              <Form.Item
                label="Anyone celebrating a spiritual birthday?"
                name="spiritualBirthday"
              >
                <Radio.Group>
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="spiritualBirthdayCount"
                label="If so how many?"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter a valid number",
                  },
                ]}
              >
                <Input type="number" min="0" />
              </Form.Item>

              <Form.Item
                name="eventSelection"
                label="Please select which event you are completing this form for:"
              >
                <Select placeholder="Select">
                  <Option value="Monthly unique dinner fellowship">
                    Monthly unique dinner fellowship
                  </Option>
                  <Option value="NFCOCC monthly event">
                    NFCOCC monthly event
                  </Option>
                  <Option value="MENg first monday night monthly empowerment session">
                    MENg first monday night monthly empowerment session
                  </Option>
                  <Option value="LADYS first monday night monthly empowerment session">
                    L.A.D.Y.S. first monday night monthly empowerment session
                  </Option>
                  <Option value="GKM historic tours">GKM historic tours</Option>
                  <Option value="Family unity day in the park">
                    Family unity day in the park
                  </Option>
                  <Option value="Take it to the hoop basketball tournament">
                    Take it to the hoop basketball tournament
                  </Option>
                  <Option value="Annual cruise">Annual cruise</Option>
                  <Option value="Annual Celebrity golf classic">
                    Annual Celebrity golf classic
                  </Option>
                  <Option value="Reach 1070 covenant faith partners appreciation luncheon">
                    Reach 1070 covenant faith partners appreciation luncheon
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="customEvent"
                label="Please write in event not listed"
              >
                <Input />
              </Form.Item>

              <div className="w-full border p-2 mx-auto text-white h-[15rem] overflow-scroll">
                <p>
                  1. **Non-Discrimination Policy**: Clearly state that
                  discrimination or harassment of any kind will not be
                  tolerated. Make it explicit that the event is open and
                  welcoming to people of all backgrounds, regardless of race,
                  ethnicity, religion, gender identity, sexual orientation,
                  disability, or any other characteristic.
                </p>
                <p>
                  2. **Respect for Cultural and Religious Sensitivities**:
                  Encourage attendees to be mindful and respectful of cultural
                  and religious practices that may differ from their own. Ensure
                  that the event respects dietary restrictions, dress codes, and
                  other cultural norms.
                </p>
                <p>
                  3. **Inclusivity in Programming**: Strive to include diverse
                  perspectives and representation in the event programming,
                  including speakers, performers, and activities that reflect
                  the varied backgrounds of attendees.
                </p>
                <p>
                  4. **Accessibility**: Ensure that the event venue is
                  accessible to people with disabilities, including wheelchair
                  access, accessible restrooms, and accommodations for those
                  with sensory sensitivities. Provide information on
                  accessibility features and services available at the event.
                </p>
                <p>
                  5. **Language Accessibility**: If the event is multilingual,
                  provide translation services or materials in multiple
                  languages to ensure that all attendees can fully participate
                  and understand the content.
                </p>
                <p>
                  6. **Safety and Security**: Establish guidelines for
                  maintaining a safe and secure environment, including protocols
                  for addressing emergencies, conflicts, or incidents of
                  misconduct. Clearly communicate how attendees can report
                  concerns or seek assistance during the event.
                </p>
                <p>
                  7. **Informed Consent**: If the event involves activities or
                  interactions that may be physically or emotionally
                  challenging, ensure that attendees are fully informed and able
                  to consent to participate. Provide options for opting out or
                  seeking support if needed.
                </p>
                <p>
                  8. **Environmental Sustainability**: Encourage environmentally
                  friendly practices and minimize the event's ecological
                  footprint by promoting recycling, reducing waste, and using
                  sustainable resources wherever possible.
                </p>
                <p>
                  9. **Compliance with Laws and Regulations**: Require attendees
                  to comply with applicable laws and regulations, including
                  those related to public health, safety, and alcohol
                  consumption if applicable.
                </p>
                <p>
                  10. **Feedback and Accountability**: Create channels for
                  attendees to provide feedback on their experience and address
                  any concerns or grievances that may arise. Hold organizers
                  accountable for upholding the event's values of inclusivity
                  and fairness.
                </p>
              </div>
              <Form.Item
                name="termsAgreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("You must agree to continue."),
                  },
                ]}
              >
                <Checkbox>
                  I understand that this is an attendance registration form only
                  and does not include any cost for any event.
                </Checkbox>
              </Form.Item>

              <Form.Item
                name="noCostEvents"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("Please confirm this agreement."),
                  },
                ]}
              >
                <Checkbox>
                  I understand that if the event selected has no cost, I will be
                  sent a text message confirmation or phone call by a
                  representative.
                </Checkbox>
              </Form.Item>

              <Form.Item
                name="signature"
                label="Upload Signature"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[
                  { required: true, message: "Please upload your signature!" },
                ]}
              >
                <Upload
                  name="signature"
                  listType="picture"
                  beforeUpload={() => false}
                  accept="image/*"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload Signature</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="bg-white text-[#1A2E5C] hover:bg-gray-200"
                >
                  {loading ? "Submitting..." : "Submit Registration"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default EventAttendanceForm;
