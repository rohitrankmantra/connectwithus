import { useAuth } from '../context/AuthContext';

const Header = ({ currentFormTitle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="md:text-2xl font-bold text-gray-900">Admin Panel</h1>
          {currentFormTitle && (
            <p className="text-gray-600 text-sm mt-1">{currentFormTitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-sm text-gray-600">
            Welcome, <span className="font-medium">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


// 