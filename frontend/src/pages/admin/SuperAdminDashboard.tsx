import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Home, Book, Newspaper, Users } from 'lucide-react';
import {
  AdminSidebar,
  DashboardSection,
  FormationsSection,
  ActualitesSection,
  AdministrateursSection,
  AdminDiagnostic,
  FormationDiagnostic,
  ActualiteDiagnostic,
  SupabaseFix,
} from './components';
import InscriptionsGestion from './InscriptionsGestion';

import { Menu } from 'lucide-react';
type Section = 'dashboard' | 'formations' | 'actualites' | 'administrateurs' | 'inscriptions';

export default function SuperAdminDashboard() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  useEffect(() => {
    // If URL contains ?section=..., initialize active section from query param
    try {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('section') as Section | null;
      if (s) setActiveSection(s);
    } catch (e) {
      console.debug('URL section parsing error:', e);
    }
  }, []);

  useEffect(() => {
    console.log('[SuperAdminDashboard] Component mounted - user:', user);
  }, [isLoading, isAuthenticated, user]);

  const handleLogout = () => {
    logout();
    navigate('/superadmin/login');
  };

  // Build menu items based on user role
  const allMenuItems = [
    { id: 'dashboard' as const, label: 'Tableau de bord', icon: Home, roles: ['superadmin', 'admin_content'] },
    { id: 'formations' as const, label: 'Gérer les formations', icon: Book, roles: ['superadmin', 'admin_content'] },
    { id: 'actualites' as const, label: 'Gérer les actualités', icon: Newspaper, roles: ['superadmin', 'admin_content'] },
    { id: 'inscriptions' as const, label: 'Gestion des inscriptions', icon: Menu, roles: ['superadmin', 'admin_content'] },
    { id: 'administrateurs' as const, label: 'Gérer les administrateurs', icon: Users, roles: ['superadmin'] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(user?.role || ''));

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={section => setActiveSection(section as Section)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {menuItems.find((m) => m.id === activeSection)?.label}
            </h2>
            {user && (
              <div className="text-sm text-gray-600">
                Connecté en tant que: <span className="font-semibold">{user.email}</span>
              </div>
            )}
          </div>

          {/* Show Supabase Fix Tool on Dashboard */}
          {activeSection === 'dashboard' && (
            <SupabaseFix />
          )}

          {/* Show Diagnostic when viewing sections */}
          {activeSection === 'administrateurs' && (
            <AdminDiagnostic />
          )}
          {activeSection === 'formations' && (
            <FormationDiagnostic />
          )}
          {activeSection === 'actualites' && (
            <ActualiteDiagnostic />
          )}

          {/* Section Content */}
          {activeSection === 'dashboard' && <DashboardSection />}
          {activeSection === 'formations' && <FormationsSection />}
          {activeSection === 'actualites' && <ActualitesSection />}
          {activeSection === 'administrateurs' && <AdministrateursSection />}
          {activeSection === 'inscriptions' && <InscriptionsGestion />}
        </div>
      </main>
    </div>
  );
}
