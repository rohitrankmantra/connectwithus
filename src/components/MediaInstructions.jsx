import React from "react";
import bg from "../assets/images/background.png"

const MediaInstructions = () => {
  const handleDownload = () => {
    window.open("/assets/pdf/FELLOWSHIP-INSTRUCTIONS-A.pdf", "_blank"); // Replace with your actual PDF path
  };

  return (
    <div className="bg-white text-gray-800  max-w-6xl mx-auto">
      <div style={{backgroundImage:`url(${bg})`}} className="py-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">
          The National Fellowship Conference of Christian Churches, Inc.
        </h2>
        <h3 className="text-lg md:text-xl text-center font-medium mb-6">
          MEDIA MEMBERS INSTRUCTIONS
        </h3>
        <p className="text-center text-sm mb-12">
          Connect With Us: The requirements for becoming a Media Member
          <br />
          of the Fellowship are as follows. Media Members are On Air Program &
          content Providers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 bg-gray-100 gap-8 p-2">
        {/* Left Column */}
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            <strong>1.</strong> Anyone who wishes to provide a program on Radio
            Station WKMB 1070 AM and Taponlive.org streaming platforms must
            follow these steps:
          </p>
          <ol className="list-decimal ml-5 space-y-5">
            <li>You must join and become a member of the Fellowship.</li>
            <li>
              Visit{" "}
              <a
                className="text-blue-600 underline"
                href="https://www.connectwithus.info"
                target="_blank"
              >
                www.connectwithus.info
              </a>
            </li>
            <li>
              Scroll down and click on the logo (NFCOCC) for the Fellowship,
              once opened.
            </li>
            <li>
              Click on Media Member, open the application and follow the
              instructions.
            </li>
            <li>
              The required Annual Registration fee ($299.00) will be requested
              after your application is approved.
            </li>
            <li>Share a weekly free will offering of any amount.</li>
            <li>
              Carefully read the terms and conditions that apply to broadcasting
              standards.
            </li>
            <li>
              Provide a written copy of your organization's articles of faith,
              mission, purpose and vision, and by-laws.
            </li>
            <li>Willingness to participate and attend Fellowship events.</li>
            <li>Willing to serve as a Trainer and/or Workshop Facilitator.</li>
            <li>
              Provide a weekly program for airing and a demo which meets
              broadcasting quality standards on Tapon Media platforms.
            </li>
          </ol>
        </div>

        {/* Right Column */}
        <div className="space-y-4 text-sm leading-relaxed">
          <h4 className="font-semibold">
            This is a set of instructions for Telegram:
          </h4>
          <ol className="list-decimal ml-5 space-y-5">
            <li>Download the Telegram App on your phone or computer.</li>
            <li>Log on using your device.</li>
            <li>After, text your name and phone number to 1-732-877-2202</li>
            <li>
              We will then add your name to the NFCOCC Fellowship and Media
              group.
            </li>
            <li>
              All application requests will include:
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Provide demo of your show.</li>
                <li>
                  Attend a meeting to review your application, demo, and
                  understanding of mission/purpose.
                </li>
              </ul>
            </li>
          </ol>

          <h4 className="font-semibold pt-4">
            All Sources that carry Tapon Media:
          </h4>
          <ol className="list-decimal ml-5 space-y-3">
            <li>WKMB 1070 AM</li>
            <li>100.7 FM</li>
            <li>
              <a
                href="https://www.taponlive.org"
                className="text-blue-600 underline"
                target="_blank"
              >
                www.taponlive.org
              </a>
            </li>
            <li>IHeart Radio – coming soon</li>
            <li>Radio Max – coming soon</li>
            <li>Tuneln – coming soon</li>
            <li>Apple TV</li>
            <li>Android TV</li>
            <li>Fire TV</li>
            <li>Roku TV</li>
          </ol>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleDownload}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
        >
          DOWNLOAD INSTRUCTIONS
        </button>
      </div>
    </div>
  );
};

export default MediaInstructions;
