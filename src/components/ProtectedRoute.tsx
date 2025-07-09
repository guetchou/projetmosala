import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  if (requiredRole && getUserRole() !== requiredRole) {
    // Redirige selon le rôle de l'utilisateur
    const role = getUserRole();
    if (role === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (role === "recruteur") return <Navigate to="/recruiter-space" replace />;
    if (role === "candidat") return <Navigate to="/profile-creation" replace />;
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute; 