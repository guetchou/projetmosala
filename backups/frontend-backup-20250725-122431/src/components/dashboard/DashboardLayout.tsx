import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings, 
  Bell,
  TrendingUp,
  FileText,
  Building,
  Calendar,
  MessageSquare,
  Award,
  Target,
  PieChart
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  role: "admin" | "candidate" | "recruiter";
}

const menuItems = {
  admin: [
    { icon: Home, label: "Vue d'ensemble", to: "/admin/dashboard" },
    { icon: Users, label: "Utilisateurs", to: "/admin/users" },
    { icon: Briefcase, label: "Offres d'emploi", to: "/admin/jobs" },
    { icon: BarChart3, label: "Analytics", to: "/admin/analytics" },
    { icon: Settings, label: "Paramètres", to: "/admin/settings" },
  ],
  candidate: [
    { icon: Home, label: "Mon Dashboard", to: "/candidate/dashboard" },
    { icon: Briefcase, label: "Mes candidatures", to: "/candidate/applications" },
    { icon: FileText, label: "Mon CV", to: "/candidate/cv" },
    { icon: Target, label: "Mes objectifs", to: "/candidate/goals" },
    { icon: Calendar, label: "Mes formations", to: "/candidate/trainings" },
    { icon: MessageSquare, label: "Messages", to: "/candidate/messages" },
  ],
  recruiter: [
    { icon: Home, label: "Vue d'ensemble", to: "/recruiter/dashboard" },
    { icon: Briefcase, label: "Mes offres", to: "/recruiter/jobs" },
    { icon: Users, label: "Candidatures", to: "/recruiter/applications" },
    { icon: Building, label: "Mon entreprise", to: "/recruiter/company" },
    { icon: BarChart3, label: "Analytics", to: "/recruiter/analytics" },
    { icon: MessageSquare, label: "Messages", to: "/recruiter/messages" },
  ],
};

const DashboardLayout = ({ children, title, subtitle, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const items = menuItems[role];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-white)] to-[var(--color-mosala-yellow-50)]">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[var(--color-mosala-white)] shadow-2xl border-r-2 border-[var(--color-mosala-green-200)] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
        initial={{ x: -256 }}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-mosala-green-100)]">
            <Link to="/" className="flex items-center gap-3">
              <img src="/topcenter-uploads/logo-mosala1.png" alt="Mosala" className="h-8 w-8" />
              <span className="font-bold text-xl text-[var(--color-mosala-green-600)]">Mosala</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-mosala-green-100)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] shadow-lg"
                      : "text-[var(--color-mosala-dark-700)] hover:bg-[var(--color-mosala-green-100)] hover:text-[var(--color-mosala-green-700)]"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--color-mosala-green-100)]">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-mosala-green-50)]">
              <div className="w-8 h-8 rounded-full bg-[var(--color-mosala-green-500)] flex items-center justify-center">
                <span className="text-[var(--color-mosala-white)] font-bold text-sm">
                  {role === "admin" ? "A" : role === "candidate" ? "C" : "R"}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--color-mosala-dark-700)]">
                  {role === "admin" ? "Administrateur" : role === "candidate" ? "Candidat" : "Recruteur"}
                </p>
                <p className="text-xs text-[var(--color-mosala-dark-400)]">Mosala Platform</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-[var(--color-mosala-white)]/80 backdrop-blur-xl border-b border-[var(--color-mosala-green-100)] sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-mosala-green-100)]"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-mosala-dark-700)]">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-[var(--color-mosala-dark-400)]">{subtitle}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-[var(--color-mosala-green-100)] relative">
                <Bell className="w-6 h-6 text-[var(--color-mosala-green-700)]" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--color-mosala-yellow-500)] rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 