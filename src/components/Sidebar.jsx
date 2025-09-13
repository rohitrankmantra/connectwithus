import { useEffect, useState } from "react";

const Sidebar = ({ activeForm, onFormSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formTypes = [
    { key: "associateMembers", label: "Associate Members", icon: "👥" },
    { key: "mediaMembers", label: "Media Members", icon: "📺" },
    {
      key: "ministersCredentials",
      label: "Minister's Credentials",
      icon: "⛪",
    },
    { key: "licenseRenewals", label: "License Renewals", icon: "📋" },
    { key: "churchMemberships", label: "Church Memberships", icon: "🏛️" },
    { key: "sacerdotalForms", label: "Sacerdotal Forms", icon: "✝️" },
    { key: "benevolentRequests", label: "Benevolent Requests", icon: "🤝" },
    { key: "eventAttendance", label: "Event Attendance", icon: "📅" },
    { key: "ministryRequests", label: "Ministry Requests", icon: "🙏" },
    { key: "partnerCards", label: "Partner Cards", icon: "🤝" },
  ];

  return (
    <div
      className={`
          bg-white shadow-lg transition-all duration-300   
          ${isCollapsed ? " w-16" : " w-64"} 
          min-h-screen
        `}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-800">
              ConnectWithUs
            </h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-500">{isCollapsed ? "→" : "←"}</span>
          </button>
        </div>
      </div>

      <nav className="p-2">
        {formTypes.map((form) => (
          <button
            key={form.key}
            onClick={() => onFormSelect(form.key)}
            className={`sidebar-item w-full text-left p-3 rounded-md mb-1 flex items-center space-x-3 ${
              activeForm === form.key ? "active" : "text-gray-700"
            }`}
          >
            <span className="text-lg">{form.icon}</span>
            {!isCollapsed && (
              <span className="text-sm font-medium">{form.label}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
