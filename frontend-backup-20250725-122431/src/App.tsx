import OfflineMode from './pages/OfflineMode';
import RecruiterSpace from './pages/RecruiterSpace';
import CustomAlerts from './pages/CustomAlerts';
import InteractiveMap3D from './pages/InteractiveMap3D';
import ProfileCreation from './pages/ProfileCreation';
import AdvancedSearch from './pages/AdvancedSearch';
import Contact from './pages/Contact';
import About from './pages/About';
import Candidates from './pages/Candidates';
import Employers from './pages/Employers';
import Jobs from './pages/Jobs';
import Orientation from './pages/Orientation';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from './pages/BlogPost';
import ChatbotWidget from "@/components/ChatbotWidget";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Formations from "./pages/Formations";
import FAQ from "./pages/FAQ";
import CandidateSpace from "./pages/CandidateSpace";
import ConfirmationCaravane from "@/pages/ConfirmationCaravane";
import Support from "./pages/Support";
import Services from "./pages/Services";
import LegalNotice from "./pages/LegalNotice";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import DemoOverlay from "@/components/DemoOverlay";

// Dashboard pages
import AdminUsers from "./pages/dashboard/AdminUsers";
import AdminJobs from "./pages/dashboard/AdminJobs";
import RecruiterApplications from "./pages/dashboard/RecruiterApplications";
import CandidateApplications from "./pages/dashboard/CandidateApplications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-creation" element={
            <ProtectedRoute requiredRole="candidat">
              <ProfileCreation />
            </ProtectedRoute>
          } />
          <Route path="/recruiter-space" element={
            <ProtectedRoute requiredRole="recruteur">
              <RecruiterSpace />
            </ProtectedRoute>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path="/admin/jobs" element={
            <ProtectedRoute requiredRole="admin">
              <AdminJobs />
            </ProtectedRoute>
          } />
          
          {/* Recruiter Dashboard Routes */}
          <Route path="/recruiter/applications" element={
            <ProtectedRoute requiredRole="recruteur">
              <RecruiterApplications />
            </ProtectedRoute>
          } />
          
          {/* Candidate Dashboard Routes */}
          <Route path="/candidate/applications" element={
            <ProtectedRoute requiredRole="candidat">
              <CandidateApplications />
            </ProtectedRoute>
          } />
          
          <Route path="/map-3d" element={<InteractiveMap3D />} />
          <Route path="/alerts" element={<CustomAlerts />} />
          <Route path="/offline-mode" element={<OfflineMode />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/about" element={<About />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/orientation" element={<Orientation />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/candidate-space" element={<CandidateSpace />} />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
