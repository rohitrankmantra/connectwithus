import axios from "axios";

// Create axios instance with base configuration
const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to transform API data to match expected format
const transformAssociateMemberData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: item.name,
    email: item.email,
    phone: item.phone,
    address: `${item.streetAddress}${
      item.apartment ? `, ${item.apartment}` : ""
    }, ${item.city}, ${item.state} ${item.zip}, ${item.country}`,
    churchAffiliation: item.churchName,
    churchAddress: item.churchAddress,
    website: item.website,
    denomination: item.denomination,
    position: item.position,
    message: item.message,
    submittedAt: item.createdAt,
    // Add additional fields for detail view
    streetAddress: item.streetAddress,
    apartment: item.apartment,
    city: item.city,
    state: item.state,
    zip: item.zip,
    country: item.country,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform Media Members API data
const transformMediaMemberData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: item.name,
    email: item.email,
    phone: item.phone,
    address: `${item.streetAddress}${
      item.apartment ? `, ${item.apartment}` : ""
    }, ${item.city}, ${item.state} ${item.zip}, ${item.country}`,
    organization: item.mediaCompany,
    position: item.position,
    experience: item.broadcastBefore,
    specialization: item.mediaDepartment,
    portfolioUrl: item.website,
    signature: item.signature,
    submittedAt: item.createdAt,
    // Add additional fields for detail view
    streetAddress: item.streetAddress,
    apartment: item.apartment,
    city: item.city,
    state: item.state,
    zip: item.zip,
    country: item.country,
    church: item.church,
    churchAddress: item.address,
    website: item.website,
    denomination: item.denomination,
    mediaDepartment: item.mediaDepartment,
    mediaDirector: item.mediaDirector,
    preferredPlatform: item.preferredPlatform,
    contentCreator: item.contentCreator,
    broadcastBefore: item.broadcastBefore,
    mediaCompany: item.mediaCompany,
    demo: item.demo,
    broadcastingStandards: item.broadcastingStandards,
    message: item.message,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform Ministers Credentials API data
const transformMinistersCredentialsData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: item.name,
    email: item.email,
    phone: item.phone,
    address: `${item.streetAddress}${
      item.apartment ? `, ${item.apartment}` : ""
    }, ${item.city}, ${item.state} ${item.zip}, ${item.country}`,
    currentChurch: item.address,
    denomination: item.theologicalViews,
    yearsInMinistry: item.yearsInMinistry,
    submittedAt: item.createdAt,
    // Add all additional fields for detail view
    streetAddress: item.streetAddress,
    apartment: item.apartment,
    city: item.city,
    state: item.state,
    zip: item.zip,
    country: item.country,
    howDidYouLearnAbout: item.How_did_you_learn_about,
    agreement: item.agreement,
    apartment1: item.apartment1,
    city1: item.city1,
    state1: item.state1,
    zip1: item.zip1,
    country1: item.country1,
    howlong1: item.howlong1,
    streetAddress1: item.streetAddress1,
    apartment2: item.apartment2,
    city2: item.city2,
    state2: item.state2,
    zip2: item.zip2,
    country2: item.country2,
    howlong2: item.howlong2,
    streetAddress2: item.streetAddress2,
    sex: item.Sex,
    maritalState: item.maritalState,
    areYouUsCitizen: item.areYouUsCitizen,
    visaOrSocialSecurity: item.visaOrSocialSecurity,
    sponsorName: item.sponsorName,
    presentMinistryRole: item.presentMinistryRole,
    isFullTime: item.isFullTime,
    ministryDescription: item.ministryDescription,
    callTestimony: item.callTestimony,
    isSupported: item.isSupported,
    ministerialRoles: item.ministerialRoles,
    currentIncome: item.currentIncome,
    salvationTestimony: item.salvationTestimony,
    isChristInLife: item.isChristInLife,
    baptizedWater: item.baptizedWater,
    baptizedSpirit: item.baptizedSpirit,
    unityInBody: item.unityInBody,
    soulWinner: item.soulWinner,
    lifestyleStandard: item.lifestyleStandard,
    doYouBelieve: item.doYouBelieve,
    pastorName: item.pastorName,
    fellowshipStatus: item.fellowshipStatus,
    pastorContact: item.pastorContact,
    address: item.address,
    dob: item.dob,
    substanceUse: item.substanceUse,
    theologicalViews: item.theologicalViews,
    misconductAccusation: item.misconductAccusation,
    legalConviction: item.legalConviction,
    explanation: item.explanation,
    alreadyCredentialed: item.alreadyCredentialed,
    paragraph: item.paragraph,
    holySpiritBaptism: item.holySpiritBaptism,
    waterBaptism: item.waterBaptism,
    ordinationConsent: item.ordinationConsent,
    actsDisqualify: item.actsDisqualify,
    willSurrender: item.willSurrender,
    declaration: item.declaration,
    electronicSignature: item.electronicSignature,
    fullName: item.fullName,
    submissionDate: item.submissionDate,
    credentialCategory: item.credentialCategory,
    materialsConsent: item.materialsConsent,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform License Renewals API data
const transformLicenseRenewalsData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: `${item.firstName} ${item.lastName}`,
    email: item.email,
    phone: item.phone,
    address: `${item.mailingAddress}${
      item.apartment ? `, ${item.apartment}` : ""
    }, ${item.city}, ${item.state} ${item.zip}, ${item.country}`,
    licenseNumber: item._id, // Using _id as license number for display
    currentStatus: item.currentTitle,
    expirationDate: item.updatedAt, // Using updatedAt as expiration date
    submittedAt: item.createdAt,
    // Add all additional fields for detail view
    currentTitle: item.currentTitle,
    otherTitle: item.otherTitle,
    firstName: item.firstName,
    lastName: item.lastName,
    mailingAddress: item.mailingAddress,
    apartment: item.apartment,
    city: item.city,
    state: item.state,
    zip: item.zip,
    country: item.country,
    agreement: item.agreement,
    electronicSignature: item.electronicSignature,
    signedBy: item.signedBy,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform Church Memberships API data
const transformChurchMembershipsData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: `${item.firstName} ${item.lastName}`,
    email: item.email,
    phone: item.mobilePhone,
    churchName: item.previousChurch,
    pastorName: item.previousPastor,
    memberSince: item.applicationDate,
    submittedAt: item.createdAt,
    // Add all additional fields for detail view
    applicationDate: item.applicationDate,
    passportPhoto: item.passportPhoto,
    applyingFor: item.applyingFor,
    firstName: item.firstName,
    lastName: item.lastName,
    dateOfBirth: item.dateOfBirth,
    gender: item.gender,
    address: item.address,
    city: item.city,
    state: item.state,
    zipCode: item.zipCode,
    country: item.country,
    mobilePhone: item.mobilePhone,
    maritalStatus: item.maritalStatus,
    spouseName: item.spouseName,
    spouseDOB: item.spouseDOB,
    anniversary: item.anniversary,
    children: item.children,
    childrenNamesAges: item.childrenNamesAges,
    previousChurch: item.previousChurch,
    previousPastor: item.previousPastor,
    reasonForLeaving: item.reasonForLeaving,
    saved: item.saved,
    salvationExperience: item.salvationExperience,
    baptized: item.baptized,
    baptismLocation: item.baptismLocation,
    baptismDate: item.baptismDate,
    currentMinistry: item.currentMinistry,
    ministryDetails: item.ministryDetails,
    spiritualGifts: item.spiritualGifts,
    skills: item.skills,
    expectations: item.expectations,
    agreeStatement: item.agreeStatement,
    signature: item.signature,
    signatureDate: item.signatureDate,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform Sacerdotal Forms API data
const transformSacerdotalFormsData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: item.contactName,
    email: item.contactEmail,
    phone: item.contactPhone,
    diocese: item.code1, // Using code1 as diocese
    currentParish: item.formTitle, // Using formTitle as current parish
    rank: item.title, // Using title as rank
    submittedAt: item.createdAt,
    // Add all additional fields for detail view
    code1: item.code1,
    code2: item.code2,
    url: item.url,
    code3: item.code3,
    formTitle: item.formTitle,
    contactName: item.contactName,
    title: item.title,
    contactPhone: item.contactPhone,
    contactEmail: item.contactEmail,
    othersParticipating: item.othersParticipating,
    briefDescription: item.briefDescription,
    dateOfRequest: item.dateOfRequest,
    yourAddress: item.yourAddress,
    fullAddress: item.fullAddress,
    city: item.city,
    state: item.state,
    zip: item.zip,
    requestPurpose: item.requestPurpose,
    venue: item.venue,
    estimatedAttendance: item.estimatedAttendance,
    preparedToMeet: item.preparedToMeet,
    budget: item.budget,
    details: item.details,
    captcha: item.captcha,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform Benevolent Requests API data
const transformBenevolentRequestsData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: item.contactName,
    email: item.contactEmail,
    phone: item.contactPhone,
    requestType: item.formTitle, // Using formTitle as request type
    amountRequested: `$${item.requestedAmount}`, // Format as currency
    urgencyLevel: item.code1, // Using code1 as urgency level
    submittedAt: item.createdAt,
    // Add all additional fields for detail view
    code1: item.code1,
    code2: item.code2,
    url: item.url,
    code3: item.code3,
    formTitle: item.formTitle,
    contactName: item.contactName,
    title: item.title,
    contactPhone: item.contactPhone,
    contactEmail: item.contactEmail,
    organizationName: item.organizationName,
    organizationDescription: item.organizationDescription,
    requestedAmount: item.requestedAmount,
    yourAddress: item.yourAddress,
    address: item.address,
    city: item.city,
    state: item.state,
    zip: item.zip,
    maritalStatus: item.maritalStatus,
    householdNumber: item.householdNumber,
    sourcesApplied: item.sourcesApplied,
    employmentStatus: item.employmentStatus,
    referralSource: item.referralSource,
    requestDetails: item.requestDetails,
    captcha: item.captcha,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform Event Attendance API data
const transformEventAttendanceData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: `${item.firstName} ${item.lastName}`,
    email: item.email,
    phone: item.dayPhone,
    eventName: item.eventSelection || item.customEvent,
    eventDate: item.createdAt, // Using createdAt as event date
    attendanceStatus: "Confirmed", // Default status
    submittedAt: item.createdAt,
    // Add all additional fields for detail view
    firstName: item.firstName,
    lastName: item.lastName,
    streetAddress: item.streetAddress,
    city: item.city,
    state: item.state,
    zip: item.zip,
    dayPhone: item.dayPhone,
    nightPhone: item.nightPhone,
    attendeeCount: item.attendeeCount,
    birthdayCelebration: item.birthdayCelebration,
    birthdayCount: item.birthdayCount,
    weddingAnniversary: item.weddingAnniversary,
    weddingAnniversaryCount: item.weddingAnniversaryCount,
    spiritualBirthday: item.spiritualBirthday,
    spiritualBirthdayCount: item.spiritualBirthdayCount,
    eventSelection: item.eventSelection,
    customEvent: item.customEvent,
    termsAgreement: item.termsAgreement,
    noCostEvents: item.noCostEvents,
    signature: item.signature,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform Ministry Requests API data
const transformMinistryRequestsData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: item.contactName,
    email: item.contactEmail,
    phone: item.contactPhone,
    requestType: item.requestType,
    preferredMinister: item.title, // Using title as preferred minister
    urgency: item.code1, // Using code1 as urgency
    submittedAt: item.createdAt,
    // Add all additional fields for detail view
    code1: item.code1,
    code2: item.code2,
    url: item.url,
    code3: item.code3,
    requestType: item.requestType,
    contactName: item.contactName,
    title: item.title,
    contactPhone: item.contactPhone,
    contactEmail: item.contactEmail,
    organizationName: item.organizationName,
    organizationDescription: item.organizationDescription,
    sessionDateTime: item.sessionDateTime,
    locationRequest: item.locationRequest,
    address: item.address,
    city: item.city,
    state: item.state,
    zip: item.zip,
    proposedRole: item.proposedRole,
    topic: item.topic,
    participants: item.participants,
    refreshments: item.refreshments,
    referralSource: item.referralSource,
    purpose: item.purpose,
    captcha: item.captcha,
    updatedAt: item.updatedAt,
  }));
};

// Helper function to transform Partner Cards API data
const transformPartnerCardsData = (apiData) => {
  return apiData.map((item) => ({
    id: item._id,
    fullName: `${item.firstName} ${
      item.middleName ? item.middleName + " " : ""
    }${item.lastName}${item.suffix ? " " + item.suffix : ""}`,
    email: item.email,
    phone: item.phone,
    organizationName: item.todayDecided, // Using todayDecided as organization
    partnershipType: item.nextSteps, // Using nextSteps as partnership type
    contributionLevel: item.additionalDetails, // Using additionalDetails as contribution
    submittedAt: item.createdAt,
    // Add all additional fields for detail view
    todayDecided: item.todayDecided,
    additionalDetails: item.additionalDetails,
    firstName: item.firstName,
    middleName: item.middleName,
    lastName: item.lastName,
    lastNameLetter: item.lastNameLetter,
    suffix: item.suffix,
    gender: item.gender,
    ethnicity: item.ethnicity,
    maritalStatus: item.maritalStatus,
    streetAddress: item.streetAddress,
    addressLine2: item.addressLine2,
    city: item.city,
    stateProvince: item.stateProvince,
    postalCode: item.postalCode,
    country: item.country,
    roles: item.roles,
    hasChildren: item.hasChildren,
    nextSteps: item.nextSteps,
    howHeard: item.howHeard,
    otherHowHeard: item.otherHowHeard,
    referrerName: item.referrerName,
    referrerPhone: item.referrerPhone,
    referrerEmail: item.referrerEmail,
    mailingList: item.mailingList,
    digitalSignature: item.digitalSignature,
    dateSigned: item.dateSigned,
    contactPreference: item.contactPreference,
    mediaConsent: item.mediaConsent,
    emergencyContactName: item.emergencyContactName,
    emergencyContactPhone: item.emergencyContactPhone,
    finalComments: item.finalComments,
    finalAgreement: item.finalAgreement,
    children: item.children, // Array of children objects
    updatedAt: item.updatedAt,
  }));
};

// API functions with real API for Associate Members
export const apiService = {
  // Generic function to fetch form submissions
  async getFormSubmissions(formType) {
    try {
      // Real API call for Associate Members
      if (formType === "associateMembers") {
        const response = await api.get("/associate-member");

        if (response.data.success) {
          const transformedData = transformAssociateMemberData(
            response.data.data
          );
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for Media Members
      if (formType === "mediaMembers") {
        const response = await api.get("/media-member");

        if (response.data.success) {
          const transformedData = transformMediaMemberData(response.data.data);
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for Ministers Credentials
      if (formType === "ministersCredentials") {
        const response = await api.get("/minister-credential");

        if (response.data.success) {
          const transformedData = transformMinistersCredentialsData(
            response.data.data
          );
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for License Renewals
      if (formType === "licenseRenewals") {
        const response = await api.get("/minister-renewal");

        if (response.data.success) {
          const transformedData = transformLicenseRenewalsData(
            response.data.data
          );
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for Church Memberships
      if (formType === "churchMemberships") {
        const response = await api.get("/church-membership-application");

        if (response.data.success) {
          const transformedData = transformChurchMembershipsData(
            response.data.data
          );
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for Sacerdotal Forms
      if (formType === "sacerdotalForms") {
        const response = await api.get("/special-sacerdotal-request");

        if (response.data.success) {
          const transformedData = transformSacerdotalFormsData(
            response.data.data
          );
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for Benevolent Requests
      if (formType === "benevolentRequests") {
        const response = await api.get("/benevolent-request-form");

        if (response.data.success) {
          const transformedData = transformBenevolentRequestsData(
            response.data.data
          );
          
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for Event Attendance
      if (formType === "eventAttendance") {
        const response = await api.get(
          "/event-attendance-registration-verification-form"
        );

        if (response.data.success) {
          const transformedData = transformEventAttendanceData(
            response.data.data
          );
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for Ministry Requests
      if (formType === "ministryRequests") {
        const response = await api.get("/meeting-or-personal-ministry-request");

        if (response.data.success) {
          const transformedData = transformMinistryRequestsData(
            response.data.data
          );
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Real API call for Partner Cards
      if (formType === "partnerCards") {
        const response = await api.get("/partner-card");

        if (response.data.success) {
          const transformedData = transformPartnerCardsData(response.data.data);
          return { data: transformedData, success: true };
        } else {
          return { data: [], success: false, error: "Failed to fetch data" };
        }
      }

      // Mock API for other form types (keeping existing functionality)
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = mockResponses[formType] || [];
      return { data, success: true };
    } catch (error) {
      console.error(`Error fetching ${formType}:`, error);
      return { data: [], success: false, error: error.message };
    }
  },

  // Specific form type functions
  getAssociateMembers: () => apiService.getFormSubmissions("associateMembers"),
  getMediaMembers: () => apiService.getFormSubmissions("mediaMembers"),
  getMinistersCredentials: () =>
    apiService.getFormSubmissions("ministersCredentials"),
  getLicenseRenewals: () => apiService.getFormSubmissions("licenseRenewals"),
  getChurchMemberships: () =>
    apiService.getFormSubmissions("churchMemberships"),
  getSacerdotalForms: () => apiService.getFormSubmissions("sacerdotalForms"),
  getBenevolentRequests: () =>
    apiService.getFormSubmissions("benevolentRequests"),
  getEventAttendance: () => apiService.getFormSubmissions("eventAttendance"),
  getMinistryRequests: () => apiService.getFormSubmissions("ministryRequests"),
  getPartnerCards: () => apiService.getFormSubmissions("partnerCards"),
};
