import { useEffect } from "react";

const DetailModal = ({ data, isOpen, onClose, title }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const formatFieldValue = (key, value) => {
    if (!value) return "-";

    // Handle image fields
    if (
      key.toLowerCase().includes("photo") ||
      key.toLowerCase().includes("signature")
    ) {
      return (
        <div className="mt-2">
          <img
            src={value}
            alt={key}
            className={`rounded-lg object-cover ${
              key.toLowerCase().includes("photo") ? "w-24 h-24" : "w-32 h-16"
            }`}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/150x150?text=Image+Not+Found";
            }}
          />
        </div>
      );
    }

    // Handle children array specifically
    if (key === "children" && Array.isArray(value)) {
      return (
        <div className="space-y-4">
          {value.map((child, index) => (
            <div
              key={child._id || index}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <h4 className="font-semibold text-gray-800 mb-3">
                Child {index + 1}: {child.firstName} {child.lastName}
              </h4>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div>
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {child.dateOfBirth
                    ? new Date(child.dateOfBirth).toLocaleDateString()
                    : "-"}
                </div>
                <div>
                  <span className="font-medium">Gender:</span>{" "}
                  {child.gender || "-"}
                </div>
                <div>
                  <span className="font-medium">Ethnicity:</span>{" "}
                  {child.ethnicity || "-"}
                </div>
                <div>
                  <span className="font-medium">School:</span>{" "}
                  {child.school || "-"}
                </div>
                <div>
                  <span className="font-medium">Decision:</span>{" "}
                  {Array.isArray(child.decision)
                    ? child.decision.join(", ")
                    : "-"}
                </div>
                <div>
                  <span className="font-medium">Interest:</span>{" "}
                  {Array.isArray(child.interest)
                    ? child.interest.join(", ")
                    : "-"}
                </div>
                <div>
                  <span className="font-medium">Interests:</span>{" "}
                  {Array.isArray(child.interests)
                    ? child.interests.join(", ")
                    : "-"}
                </div>
                <div>
                  <span className="font-medium">Alternate Address:</span>{" "}
                  {child.alternateAddress || "-"}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Handle dates - more specific detection
    if (
      key.toLowerCase().includes("date") ||
      key.toLowerCase().includes("createdat") ||
      key.toLowerCase().includes("updatedat") ||
      key.toLowerCase().includes("submittedat") ||
      key.toLowerCase().includes("memberSince") ||
      key.toLowerCase().includes("expirationDate") ||
      key.toLowerCase().includes("baptismDate") ||
      key.toLowerCase().includes("spouseDOB") ||
      key.toLowerCase().includes("anniversary") ||
      key.toLowerCase().includes("dateOfBirth") ||
      key.toLowerCase().includes("dateOfRequest") ||
      key.toLowerCase().includes("signatureDate") ||
      key.toLowerCase().includes("submissionDate")
    ) {
      try {
        return new Date(value).toLocaleString();
      } catch {
        return value;
      }
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    // Handle URLs
    if (typeof value === "string" && value.startsWith("http")) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 hover:text-primary-600 underline"
        >
          {value}
        </a>
      );
    }

    return value;
  };

  const formatFieldLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/Id$/, "ID");
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 modal-backdrop"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden fade-in">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {title} - Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-gray-500 text-xl">×</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)] pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {formatFieldLabel(key)}
                </label>
                <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                  {formatFieldValue(key, value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
