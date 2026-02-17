import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface AdminSidebarProps {
  menuItems: MenuItem[];
  title: string;
  subtitle?: string;
}

export default function AdminSidebar({ menuItems, title, subtitle }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-mosala-green-800 text-white transition-all duration-300 flex flex-col shadow-2xl`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-mosala-green-700">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div>
                <h1 className="text-xl font-bold text-mosala-green-100">MOSALA</h1>
                <p className="text-xs text-mosala-green-300">{title}</p>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-mosala-green-700 rounded-lg transition"
            >
              {isOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-mosala-green-700 transition group"
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-mosala-green-700 p-4">
          {isOpen && (
            <div className="mb-4 pb-4 border-b border-mosala-green-700">
              <p className="text-xs text-mosala-green-300 uppercase">Connecté</p>
              <p className="text-sm font-semibold text-mosala-green-100 truncate">{user?.name}</p>
              <p className="text-xs text-mosala-green-400 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-mosala-red-600 hover:bg-mosala-red-700 rounded-lg transition font-medium text-sm"
          >
            <span>🚪</span>
            {isOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-mosala-green-800">{title}</h2>
              {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
            </div>
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <slot />
          </div>
        </div>
      </div>
    </div>
  );
}
