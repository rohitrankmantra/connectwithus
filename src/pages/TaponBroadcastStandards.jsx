import React from "react";
import { Upload, Button, Form, Typography, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import bg from "../assets/images/associatebg.jpg";
import background from "../assets/images/background.png";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

const TaponBroadcastStandards = () => {
  const [form] = Form.useForm();

  //   const uploadProps = {
  //     name: "file",
  //     multiple: false,
  //     accept: ".png,.jpg,.jpeg,.pdf",
  //     action: "/api/upload-signature",
  //     onChange(info) {
  //       const { status } = info.file;
  //       if (status === "done") {
  //         message.success(`${info.file.name} uploaded successfully.`);
  //       } else if (status === "error") {
  //         message.error(`${info.file.name} upload failed.`);
  //       }
  //     },
  //   };

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
        className="relative py-32 z-20"
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20">
          {" "}
          {/* Added relative and z-20 */}
          <h1 className="text-4xl md:text-5xl  text-white text-center my-4">
            BROADCAST STANDARDS
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
            BROADCAST STANDARDS
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: `top left`,
          }}
          className=" py-10 md:py-20"
        >
          <Title level={3} className="text-center">
            TAPON RADIO BROADCAST STANDARDS AND TAPON APPLICANT REQUIREMENTS
          </Title>
        </div>

        <div
          className="text-sm space-y-1 md:my-8"
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: `top right`,
          }}
        >
          <ol className="list-decimal space-y-5 text-lg font-thin ml-6 text-gray-700">
            <li>
              All programs must be presented in mp3 format; no less than 128
              kbps speed; and 28.5 minutes in length including intro and outro.
            </li>
            <li>
              All programs must be uploaded through Tapon Program Support
              located at{" "}
              <a
                href="https://www.taponlive.org"
                className="text-blue-600 underline"
              >
                Taponlive.org
              </a>{" "}
              under the Tapon Radio section.
            </li>
            <li>
              All half hour programs must be no longer than 28.5 minutes in
              length which includes the intro and outro.
            </li>
            <li>
              Programs cannot be re-aired more than three (3) times and never
              consecutively. Re-airing is only for emergency purposes.
            </li>
            <li>
              The radio station will retain three of your programs in the event
              of a damaged program.
            </li>
            <li>
              All programs must have a "Call to Action" statement included.
            </li>
            <li>
              Programs containing references to dating (holidays, weather,
              calendar, etc.) can only be aired once.
            </li>
            <li>
              Holiday programs adaptable to a particular season may be re-aired,
              but must not be dated.
            </li>
            <li>Programs must have proper contact info.</li>
            <li>
              All media member fees must be paid and weekly offerings adhered
              to.
            </li>
            <li>
              A full and complete application and review is required before
              approval to broadcast.
            </li>
          </ol>

          <Text type="secondary">
            <strong>Footnote:</strong> Station owner reserves the right to
            update this document without notice.
          </Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="signature"
            label="Upload your signature here:"
            valuePropName="file"
            rules={[
              { required: true, message: "Please upload your signature." },
            ]}
          >
            {/* <Dragger {...uploadProps}> */}
            <Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag a file to this area to upload
              </p>
              <p className="ant-upload-hint text-xs">
                Read and agreed all the terms and conditions.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TaponBroadcastStandards;
