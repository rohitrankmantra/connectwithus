import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Checkbox,
  Radio,
  Typography,
  Row,
  Col,
} from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const { Title } = Typography;

const { Option } = Select;

const ChildForm = ({ index }) => {
  const prefix = `child${index}`;
  return (
    <>
      <h1 className="text-white text-xl font-bold">Child {index}</h1>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name={`${prefix}FirstName`}
            label="First Name"
            rules={[{ required: true, message: "First Name is required" }]}
          >
            <Input placeholder="E.g. John Doe" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name={`${prefix}LastName`}
            label="Last Name"
            rules={[{ required: true, message: "Last Name is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name={`${prefix}DOB`} label="Child - Date Of Birth">
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item name={`${prefix}Gender`} label="Child - Gender">
        <Select placeholder="Select">
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item name={`${prefix}Ethnicity`} label="Child - Ethnicity">
        <Select placeholder="Select">
          <Option value="African American">African American</Option>
          <Option value="Caucasian">Caucasian</Option>
          <Option value="Hispanic">Hispanic</Option>
          <Option value="Asian">Asian</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item name={`${prefix}School`} label="Child - School Name">
        <Input />
      </Form.Item>

      <Form.Item
        name={`${prefix}Decision`}
        label="Child - Today I Decided To: (optional)"
      >
        <Select mode="multiple" placeholder="Select decision(s)">
          <Option value="Accept Christ">
            Accept Jesus Christ as my Lord and Savior
          </Option>
          <Option value="Become Member">Become a Member</Option>
          <Option value="Get Baptized">Get Baptized</Option>
          <Option value="Re-dedicate Life">
            Re-dedicate my life to Jesus Christ
          </Option>
          <Option value="Request Prayer">Request Prayer</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={`${prefix}Interest`}
        label="I'm Interested In: (optional)"
      >
        <Select mode="multiple" placeholder="Select">
          <Option value="Baby Dedication">
            Baby Dedication (for ages 4 and under)
          </Option>
          <Option value="Baptism">Baptism</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={`${prefix}interests`}
        label="I'm Interested In: (optional)"
        help="Baptism is for 5 years and up."
      >
        <Checkbox.Group>
          <Checkbox value="Baby Dedication (for ages 4 and under)">
            Baby Dedication (for ages 4 and under)
          </Checkbox>
          <Checkbox value="Baptism">Baptism</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        name={`${prefix}AlternateAddress`}
        label="Does the Child have an alternate address?"
        rules={[{ required: true, message: "Please choose an option" }]}
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

const Reach10Form = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const addMore = Form.useWatch("addMoreChild", form);
  const hasChildren = Form.useWatch("hasChildren", form);

  const validateForm = (values) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "streetAddress",
      "city",
      "stateProvince",
      "postalCode",
      "country",
      "hasChildren",
      "nextSteps",
      "howHeard",
      "referrerName",
      "finalAgreement",
    ];

    for (const field of requiredFields) {
      if (!values[field]) {
        toast.error(`Please fill in ${field}`);
        return false;
      }
    }

    // Validate children if they have children
    if (values.hasChildren === "yes") {
      if (!values.child1FirstName || !values.child1LastName) {
        toast.error("Please fill in Child 1's first and last name");
        return false;
      }

      if (values.addMoreChild === "yes") {
        if (!values.child2FirstName || !values.child2LastName) {
          toast.error("Please fill in Child 2's first and last name");
          return false;
        }
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
      // Process child data into an array
      const children = [];

      // Check if user has children
      if (values.hasChildren === "yes") {
        // Process Child 1
        if (values.child1FirstName || values.child1LastName) {
          children.push({
            firstName: values.child1FirstName,
            lastName: values.child1LastName,
            dateOfBirth: values.child1DOB
              ? values.child1DOB.format("YYYY-MM-DD")
              : null,
            gender: values.child1Gender,
            ethnicity: values.child1Ethnicity,
            school: values.child1School,
            decision: values.child1Decision,
            interest: values.child1Interest,
            interests: values.child1interests,
            alternateAddress: values.child1AlternateAddress,
          });
        }

        // Process Child 2 if exists
        if (
          values.addMoreChild === "yes" &&
          (values.child2FirstName || values.child2LastName)
        ) {
          children.push({
            firstName: values.child2FirstName,
            lastName: values.child2LastName,
            dateOfBirth: values.child2DOB
              ? values.child2DOB.format("YYYY-MM-DD")
              : null,
            gender: values.child2Gender,
            ethnicity: values.child2Ethnicity,
            school: values.child2School,
            decision: values.child2Decision,
            interest: values.child2Interest,
            interests: values.child2interests,
            alternateAddress: values.child2AlternateAddress,
          });
        }
      }

      // Clean up the values object and structure the data
      const cleanedValues = {
        // Adult information
        todayDecided: values.todayDecided,
        additionalDetails: values.additionalDetails,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        lastNameLetter: values.lastNameLetter,
        suffix: values.suffix,
        gender: values.gender,
        ethnicity: values.ethnicity,
        maritalStatus: values.maritalStatus,
        dateOfBirth: values.dob ? values.dob.format("YYYY-MM-DD") : null,
        email: values.email,
        phone: values.phone,

        // Address information
        streetAddress: values.streetAddress,
        addressLine2: values.addressLine2,
        city: values.city,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
        country: values.country,

        // Registration details
        roles: values.roles,
        hasChildren: values.hasChildren,
        children: children,

        // Next steps
        nextSteps: values.nextSteps,

        // Visit information
        howHeard: values.howHeard,
        otherHowHeard: values.otherHowHeard,
        referrerName: values.referrerName,
        referrerPhone: values.referrerPhone,
        referrerEmail: values.referrerEmail,

        // Preferences
        mailingList: values.mailingList,
        digitalSignature: values.digitalSignature,
        dateSigned: values.dateSigned || new Date().toLocaleDateString(),
        contactPreference: values.contactPreference,
        mediaConsent: values.mediaConsent,

        // Emergency contact
        emergencyContactName: values.emergencyContactName,
        emergencyContactPhone: values.emergencyContactPhone,

        // Additional information
        finalComments: values.finalComments,
        finalAgreement: values.finalAgreement,

        // Metadata
        submissionDate: new Date().toISOString().split("T")[0],
        formType: "reach10-registration",
      };

      // Remove empty fields
      Object.keys(cleanedValues).forEach((key) => {
        if (
          cleanedValues[key] === undefined ||
          cleanedValues[key] === null ||
          cleanedValues[key] === ""
        ) {
          delete cleanedValues[key];
        }
      });

      const response = await axios.post(
        "https://connectbackend-sol8.onrender.com/api/v1/partner-card",
        cleanedValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Registration submitted successfully!");
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
    <div>
      <Toaster position="top-right" />
      <div className="md:w-8/12 mx-auto mt-10">
        {submitted ? (
          <div className="bg-black/90 p-8 text-center rounded-lg shadow-xl">
            <div className="text-white text-2xl font-semibold mb-4">
              Thank You!
            </div>
            <div className="text-white text-lg mb-6">
              Your Reach10 registration has been submitted successfully. We will
              review your registration and get back to you soon.
            </div>
            <Button
              type="primary"
              onClick={resetForm}
              className="bg-white text-black hover:bg-gray-200"
            >
              Submit Another Registration
            </Button>
          </div>
        ) : (
          <div className="bg-black/90 p-5 text-white">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              scrollToFirstError
            >
              {/* Adult 1 */}
              <Form.Item>
                <h2 className="text-white">Get to Know You - Adult 1</h2>
              </Form.Item>

              <Form.Item name="todayDecided" label="Today I Decided To:">
                <Select placeholder="Select an option">
                  <Option value="Become-a-Reach1070-Covenant-Faith-Partner">
                    Become a Reach1070 Covenant Faith Partner
                  </Option>
                  <Option value="one">
                    Accept Jesus Christ as my Lord and Savior
                  </Option>
                  <Option value="two">Become a Member</Option>
                  <Option value="Get-Baptized">Get Baptized</Option>
                  <Option value="Re-dedicate-my-life-to-Jesus-Christ">
                    Re-dedicate my life to Jesus Christ
                  </Option>
                  <Option value="Request-Prayer">Request Prayer</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="additionalDetails"
                label="Additional details about your decision: (optional)"
              >
                <Input.TextArea rows={6} maxLength={180} />
              </Form.Item>

              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="middleName" label="Middle Name">
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastNameLetter"
                label="Last Name Begins With The Letter"
              >
                <Select placeholder="Select">
                  <Option value="A-C">A-C</Option>
                  <Option value="D-F">D-F</Option>
                  <Option value="G-I">G-I</Option>
                  <Option value="J-L">J-L</Option>
                  <Option value="M-O">M-O</Option>
                  <Option value="P-R">P-R</Option>
                  <Option value="S-V">S-V</Option>
                  <Option value="W-Z">W-Z</Option>
                </Select>
              </Form.Item>
              <Form.Item name="suffix" label="Suffix">
                <Select placeholder="Select">
                  <Option value="Jr">Jr</Option>
                  <Option value="Sr">Sr</Option>
                  <Option value="III">III</Option>
                  <Option value="IV">IV</Option>
                  <Option value="V">V</Option>
                </Select>
              </Form.Item>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="Select">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item name="ethnicity" label="Ethnicity">
                <Select placeholder="Select">
                  <Option value="African American">African American</Option>
                  <Option value="Asian">Asian</Option>
                  <Option value="Caucasian">Caucasian</Option>
                  <Option value="Hispanic">Hispanic</Option>
                  <Option value="Multi-Racial">Multi Racial</Option>
                  <Option value="Native-American">Native American</Option>
                  <Option value="Pacific-Islander">Pacific Islander</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
              <Form.Item name="maritalStatus" label="Marital Status">
                <Select placeholder="Select">
                  <Option value="Single">Single</Option>
                  <Option value="Married">Married</Option>
                  <Option value="Separated">Separated</Option>
                  <Option value="Divorced">Divorced</Option>
                  <Option value="Widow">Widow</Option>
                  <Option value="Widower">Widower</Option>
                </Select>
              </Form.Item>
              <Form.Item name="dob" label="Date Of Birth">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="E.g. john@doe.com" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Primary Address */}
              <Form.Item>
                <h2 className="text-white">Primary Address</h2>
              </Form.Item>
              <Form.Item
                name="streetAddress"
                label="Street Address*"
                rules={[
                  {
                    required: true,
                    message: "Please enter your street address",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="addressLine2" label="Apartment, suite, etc*">
                <Input />
              </Form.Item>
              <Form.Item
                name="city"
                label="City*"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="stateProvince"
                label="State/Province*"
                rules={[
                  {
                    required: true,
                    message: "Please enter your state or province",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="postalCode"
                label="ZIP / Postal Code*"
                rules={[
                  { required: true, message: "Please enter your postal code" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country*"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a country"
                  optionFilterProp="children"
                >
                  <Option value="United States">United States</Option>
                  <Option value="Canada">Canada</Option>
                  <Option value="India">India</Option>
                  <Option value="United Kingdom">United Kingdom</Option>
                </Select>
              </Form.Item>

              {/* Registering As */}
              <Form.Item name="roles" label="I am registering as a">
                <Checkbox.Group>
                  <Checkbox value="Audio/Visual/Production">
                    Audio/Visual/Production
                  </Checkbox>
                  <Checkbox value="Children/Youth/College">
                    Children/Youth/College
                  </Checkbox>
                  <Checkbox value="Communications & Social Media">
                    Communications & Social Media
                  </Checkbox>
                  <Checkbox value="Discipleship">Discipleship</Checkbox>
                  <Checkbox value="Hospitality">Hospitality</Checkbox>
                  <Checkbox value="Ministry">Ministry</Checkbox>
                  <Checkbox value="Outreach">Outreach</Checkbox>
                  <Checkbox value="Worship & Arts">Worship & Arts</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                name="hasChildren"
                label="Do you have children to register?"
                rules={[{ required: true, message: "Please select Yes or No" }]}
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
              {hasChildren?.includes("yes") && (
                <div>
                  {/* Always render Child 1 */}
                  <ChildForm index={1} />

                  {/* Add Another Child */}
                  <Form.Item name="addMoreChild" label="Add Another Child">
                    <Radio.Group>
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {/* Conditional Child 2 */}
                  {addMore?.includes("yes") && <ChildForm index={2} />}
                </div>
              )}

              {/* Next Steps */}
              <Form.Item className="text-white">
                <h2>Next Steps - Become A Member</h2>
                <h3>
                  Becoming a member is...today and become an essential part of
                  our New Birth family!
                </h3>
              </Form.Item>
              <Form.Item
                name="nextSteps"
                label="Next Steps - Become A Member"
                rules={[{ required: true, message: "Please choose an option" }]}
              >
                <Radio.Group className="text-white">
                  <Radio value="now">
                    Register for the Next Steps Class now
                  </Radio>
                  <Radio value="later">
                    Register for the Next Steps Class later
                  </Radio>
                </Radio.Group>
              </Form.Item>

              {/* Tell Us About Your Visit */}
              <Form.Item className="text-white">
                <h2>Tell Us About Your Visit</h2>
              </Form.Item>
              <Form.Item
                name="howHeard"
                label="How did you hear about us?"
                rules={[{ required: true, message: "Please select one" }]}
              >
                <Select placeholder="Select an option">
                  <Option value="Invited">Invited</Option>
                  <Option value="Community Outreach">Community Outreach</Option>
                  <Option value="Flyer">Flyer</Option>
                  <Option value="Radio">Radio</Option>
                  <Option value="Social Media Ad (Facebook, Instagram)">
                    Social Media Ad (Facebook, Instagram)
                  </Option>
                  <Option value="Live Streaming Service">
                    Live Streaming Service
                  </Option>
                  <Option value="Website/Mail/Eblast">
                    Website/Mail/Eblast
                  </Option>
                  <Option value="Online Search">Online Search</Option>
                  <Option value="Homegoing/Funeral">Homegoing/Funeral</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
              <Form.Item name="otherHowHeard" label="Other (please specify)">
                <Input />
              </Form.Item>
              <Form.Item
                name="referrerName"
                label="Who invited you?"
                rules={[{ required: true, message: "Please enter a name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="referrerPhone" label="Referrer's Phone Number">
                <Input />
              </Form.Item>
              <Form.Item name="referrerEmail" label="Referrer's Email Address">
                <Input />
              </Form.Item>

              {/* Mailing List */}
              <Form.Item
                name="mailingList"
                label="Would you like to join our mailing list?"
              >
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Digital Signature */}
              <Form.Item
                name="digitalSignature"
                label="Digital Signature (type your name)"
                rules={[
                  {
                    required: true,
                    message: "Please provide your digital signature",
                  },
                ]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
              <Form.Item
                name="dateSigned"
                label="Date Signed"
                initialValue={new Date().toLocaleDateString()}
              >
                <Input disabled />
              </Form.Item>

              {/* Contact Preference */}
              <Form.Item
                name="contactPreference"
                label="How would you prefer to be contacted?"
              >
                <Checkbox.Group>
                  <Checkbox value="phone">Phone</Checkbox>
                  <Checkbox value="email">Email</Checkbox>
                  <Checkbox value="sms">SMS</Checkbox>
                </Checkbox.Group>
              </Form.Item>

              {/* Media Consent */}
              <Form.Item name="mediaConsent" valuePropName="checked">
                <Checkbox>
                  I consent to being photographed or recorded during events.
                </Checkbox>
              </Form.Item>

              {/* Emergency Contact */}
              <Form.Item
                name="emergencyContactName"
                label="Emergency Contact Name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="emergencyContactPhone"
                label="Emergency Contact Phone"
              >
                <Input />
              </Form.Item>

              {/* Final Comments */}
              <Form.Item
                name="finalComments"
                label="Additional Comments or Questions?"
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              {/* Final Declaration/Agreement */}
              <Form.Item
                name="finalAgreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              "You must accept the agreement to continue"
                            )
                          ),
                  },
                ]}
              >
                <Checkbox>
                  I confirm that the information provided is accurate and
                  complete. I understand and agree to the terms and privacy
                  policy.
                </Checkbox>
              </Form.Item>

              {/* Submit */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reach10Form;
