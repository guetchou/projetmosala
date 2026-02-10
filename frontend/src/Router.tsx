import Formations from "@/pages/Formations";
import FAQ from "@/pages/FAQ";
import CandidateSpace from "@/pages/CandidateSpace";
import RecruiterSpace from "@/pages/RecruiterSpace";
import SuperAdminRegister from "@/pages/admin/SuperAdminRegister";
import SuperAdminLogin from "@/pages/admin/SuperAdminLogin";
import SuperAdminDashboard from "@/pages/admin/SuperAdminDashboard";
import AdminContentRegister from "@/pages/admin/AdminContentRegister";
import AdminContentLogin from "@/pages/admin/AdminContentLogin";
import AdminContentDashboard from "@/pages/admin/AdminContentDashboard";
import Actualites from "@/pages/Actualites";
import ActualiteDetail from "@/pages/ActualiteDetail";
import { Route } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Route path="/formations" element={<Formations />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/candidate-space" element={<CandidateSpace />} />
      <Route path="/recruiter-space" element={<RecruiterSpace />} />
      
      {/* Actualités routes */}
      <Route path="/actualites" element={<Actualites />} />
      <Route path="/actualites/:id" element={<ActualiteDetail />} />
      
      {/* Superadmin routes */}
      <Route path="/superadmin/register" element={<SuperAdminRegister />} />
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      
      {/* Admin Content routes */}
      <Route path="/admin-content/register" element={<AdminContentRegister />} />
      <Route path="/admin-content/login" element={<AdminContentLogin />} />
      <Route path="/admin-content/dashboard" element={<AdminContentDashboard />} />
    </>
  );
};

export default Router;