import OfflineMode from './pages/OfflineMode';
import CustomAlerts from './pages/CustomAlerts';
import InteractiveMap3D from './pages/InteractiveMap3D';
import ProfileCreation from './pages/ProfileCreation';
import AdvancedSearch from './pages/AdvancedSearch';
import Contact from './pages/Contact';
import About from './pages/About';
import Employers from './pages/Employers';
import Orientation from './pages/Orientation';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from './pages/BlogPost';
import Actualites from './pages/Actualites';
import Inscription from './pages/Inscription';
import ChatbotWidget from "@/components/ChatbotWidget";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Formations from "./pages/Formations";
import FAQ from "./pages/FAQ";
// Candidate/Recruiter pages removed per admin-only configuration
import ConfirmationCaravane from "@/pages/ConfirmationCaravane";
import Support from "./pages/Support";
import Services from "./pages/Services";
import LegalNotice from "./pages/LegalNotice";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import DemoOverlay from "@/components/DemoOverlay";

// Admin pages
import SuperAdminLogin from './pages/admin/SuperAdminLogin';
import SuperAdminRegister from './pages/admin/SuperAdminRegister';
import AdminContentLogin from './pages/admin/AdminContentLogin';
import AdminContentRegister from './pages/admin/AdminContentRegister';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import AdminContentDashboard from './pages/admin/AdminContentDashboard';

// Dashboard pages
import AdminUsers from "./pages/dashboard/AdminUsers";
import AdminJobs from "./pages/dashboard/AdminJobs";
// removed dashboard pages for candidates/recruiters

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <NavbarProvider>
          <DemoOverlay />
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
          <Route path="/login" element={<Navigate to="/superadmin/login" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          {/* Super Admin Routes */}
          <Route path="/superadmin/login" element={<SuperAdminLogin />} />
          <Route path="/superadmin/register" element={<SuperAdminRegister />} />
          <Route path="/superadmin/dashboard" element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          } />

          {/* Admin Content Routes */}
          <Route path="/admin-content/login" element={<AdminContentLogin />} />
          <Route path="/admin-content/register" element={<AdminContentRegister />} />
          <Route path="/admin-content/dashboard" element={
            <ProtectedRoute requiredRole="admin_content">
              <AdminContentDashboard />
            </ProtectedRoute>
          } />

          {/* Profile creation and public candidate/recruiter spaces removed (admin-only) */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRole="superadmin">
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/jobs" element={
            <ProtectedRoute requiredRole={['superadmin', 'admin_content']}>
              <AdminJobs />
            </ProtectedRoute>
          } />
          
          {/* Candidate/Recruiter dashboard routes removed (admin-only) */}
          
          <Route path="/map-3d" element={<InteractiveMap3D />} />
          <Route path="/alerts" element={<CustomAlerts />} />
          <Route path="/offline-mode" element={<OfflineMode />} />
          {/* /jobs route removed per request */}
          <Route path="/about" element={<About />} />
          {/* /candidates route removed per request */}
          <Route path="/employers" element={<Employers />} />
          <Route path="/orientation" element={<Orientation />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/inscription/:formationId" element={<Inscription />} />
          <Route path="/faq" element={<FAQ />} />
            <Route path="/actualites" element={<Actualites />} />
          {/* candidate-space removed */}
          <Route path="/confirmation-caravane" element={<ConfirmationCaravane />} />
          <Route path="/support" element={<Support />} />
          <Route path="/services" element={<Services />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotWidget />
        </BrowserRouter>
        </NavbarProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
