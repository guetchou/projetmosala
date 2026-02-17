import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading, isInitialLoading } = useAuth();

  // If still loading auth context (initial verification or ongoing auth actions), show a loading state
  if (isInitialLoading || isLoading) {
    console.log('[ProtectedRoute] Auth context still loading...');
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mosala-green-600 mb-4"></div>
          <p className="text-gray-600">Vérification des droits...</p>
        </div>
      </div>
    );
  }
  
  const userRole = user?.role;
  
  // Detailed logging with table
  console.log('[ProtectedRoute] ======== AUTH STATE ========');
  console.table({
    'isAuthenticated': isAuthenticated,
    'userRole': userRole,
    'requiredRole': requiredRole,
    'user.id': user?.id,
    'user.email': user?.email,
    'user.name': user?.name,
    'Full user object': JSON.stringify(user)
  });
  console.log('[ProtectedRoute] ======== END AUTH STATE ========');
  
  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Not authenticated, redirecting to /login');
    return <Navigate to="/login" replace state={{ error: "Vous devez être connecté pour accéder à cette page." }} />;
  }

  if (
    requiredRole &&
    ((Array.isArray(requiredRole) && !requiredRole.includes(userRole || '')) ||
      (!Array.isArray(requiredRole) && userRole !== requiredRole))
  ) {
    console.log('[ProtectedRoute] Role mismatch, expected:', requiredRole, 'got:', userRole);
    // Only redirect to login when role mismatch (guard-frail as requested)
    return <Navigate to="/login" replace state={{ error: "Accès refusé : rôle insuffisant." }} />;
  }
  
  console.log('[ProtectedRoute] Access granted');
  return <>{children}</>;
};

export default ProtectedRoute; 