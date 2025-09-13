import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DataTable from '../components/DataTable';
import DetailModal from '../components/DetailModal';
import { apiService } from '../services/api';

const AdminPanel = () => {
  const [activeForm, setActiveForm] = useState('associateMembers');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form configurations with columns for each form type
  const formConfigs = {
    associateMembers: {
      title: 'Associate Members',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: false },
        { key: 'churchAffiliation', label: 'Church', sortable: true },
        { key: 'denomination', label: 'Denomination', sortable: true },
        { key: 'position', label: 'Position', sortable: true },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    mediaMembers: {
      title: 'Media Members',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'organization', label: 'Organization', sortable: true },
        { key: 'position', label: 'Position', sortable: true },
        { key: 'experience', label: 'Experience', sortable: false },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    ministersCredentials: {
      title: "Minister's Credentials",
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'currentChurch', label: 'Current Church', sortable: true },
        { key: 'denomination', label: 'Denomination', sortable: true },
        { key: 'yearsInMinistry', label: 'Years in Ministry', sortable: true },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    licenseRenewals: {
      title: 'License Renewals',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'licenseNumber', label: 'License #', sortable: true },
        { key: 'currentStatus', label: 'Status', sortable: true },
        { key: 'expirationDate', label: 'Expires', type: 'date', sortable: true },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    churchMemberships: {
      title: 'Church Memberships',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'churchName', label: 'Church Name', sortable: true },
        { key: 'pastorName', label: 'Pastor', sortable: true },
        { key: 'memberSince', label: 'Member Since', type: 'date', sortable: true },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    sacerdotalForms: {
      title: 'Sacerdotal Forms',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'diocese', label: 'Diocese', sortable: true },
        { key: 'currentParish', label: 'Current Parish', sortable: true },
        { key: 'rank', label: 'Rank', sortable: true },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    benevolentRequests: {
      title: 'Benevolent Requests',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'requestType', label: 'Request Type', sortable: true },
        { key: 'amountRequested', label: 'Amount', sortable: false },
        { key: 'urgencyLevel', label: 'Urgency', sortable: true },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    eventAttendance: {
      title: 'Event Attendance',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'eventName', label: 'Event Name', sortable: true },
        { key: 'eventDate', label: 'Event Date', type: 'date', sortable: true },
        { key: 'attendanceStatus', label: 'Status', sortable: true },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    ministryRequests: {
      title: 'Meeting or Personal Ministry Request',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'requestType', label: 'Request Type', sortable: true },
        { key: 'preferredMinister', label: 'Preferred Minister', sortable: true },
        { key: 'urgency', label: 'Urgency', sortable: true },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    },
    partnerCards: {
      title: 'Partner Cards',
      columns: [
        { key: 'fullName', label: 'Full Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'organizationName', label: 'Organization', sortable: true },
        { key: 'partnershipType', label: 'Partnership Type', sortable: true },
        { key: 'contributionLevel', label: 'Contribution', sortable: false },
        { key: 'submittedAt', label: 'Submitted', type: 'date', sortable: true }
      ]
    }
  };

  // Load data when active form changes
  useEffect(() => {
    loadFormData();
  }, [activeForm]);

  const loadFormData = async () => {
    setLoading(true);
    try {
      const result = await apiService.getFormSubmissions(activeForm);
      if (result.success) {
        setData(result.data);
      } else {
        console.error('Failed to load data:', result.error);
        setData([]);
      }
    } catch (error) {
      console.error('Error loading form data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSelect = (formType) => {
    setActiveForm(formType);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const currentConfig = formConfigs[activeForm];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeForm={activeForm} 
        onFormSelect={handleFormSelect} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentFormTitle={currentConfig?.title} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-2">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {currentConfig?.title}
              </h2>
              <p className="text-gray-600 text-sm">
                Manage and view {currentConfig?.title.toLowerCase()} submissions
              </p>
            </div>

            <DataTable
              data={data}
              columns={currentConfig?.columns || []}
              onViewDetails={handleViewDetails}
              loading={loading}
            />
          </div>
        </main>
      </div>

      <DetailModal
        data={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentConfig?.title}
      />
    </div>
  );
};

export default AdminPanel;