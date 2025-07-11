import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "@/utils/auth";
import { useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [accessDenied, setAccessDenied] = useState(false);
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ error: "Vous devez être connecté pour accéder à cette page." }} />;
  }
  const userRole = getUserRole();
  if (
    requiredRole &&
    ((Array.isArray(requiredRole) && !requiredRole.includes(userRole)) ||
      (!Array.isArray(requiredRole) && userRole !== requiredRole))
  ) {
    setAccessDenied(true);
    // Redirige selon le rôle de l'utilisateur
    if (userRole === "admin") return <Navigate to="/admin-dashboard" replace state={{ error: "Accès refusé." }} />;
    if (userRole === "recruteur") return <Navigate to="/recruiter-space" replace state={{ error: "Accès refusé." }} />;
    if (userRole === "candidat") return <Navigate to="/profile-creation" replace state={{ error: "Accès refusé." }} />;
    return <Navigate to="/" replace state={{ error: "Accès refusé." }} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute; 