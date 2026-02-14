import { useState } from 'react';
import { Menu, X, LogOut, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  menuItems: MenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export default function AdminSidebar({
  menuItems,
  activeSection,
  onSectionChange,
  onLogout,
}: AdminSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed lg:relative top-0 left-0 h-screen bg-gradient-to-b from-[#2fdab8] to-[#1fa890] text-white transition-all duration-300 z-50 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        {sidebarOpen && <h1 className="text-xl font-bold">Mosala Admin</h1>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/20 rounded-lg transition"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="p-4 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                try {
                  navigate(`/superadmin/dashboard?section=${item.id}`);
                } catch (e) {
                  // ignore navigation errors in non-router contexts
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                activeSection === item.id
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/20">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-left"
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}
