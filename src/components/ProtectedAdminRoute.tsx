import React from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AdminLoginPage } from './AdminLoginPage';
import { ShieldCheck, RefreshCw, Sprout } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAuthenticated, adminUser, isLoading } = useAdminAuth();

  // Loading state during initial JWT session token verification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#122414] text-white flex flex-col items-center justify-center p-4">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
            <ShieldCheck size={36} />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-emerald-100 flex items-center justify-center gap-2">
              <RefreshCw size={16} className="animate-spin text-emerald-400" />
              Verifying Admin JWT Authorization...
            </h2>
            <p className="text-xs text-emerald-300/70 mt-1">
              Validating session tokens and role privileges with Talukdar Nursery backend.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Strict Protection Gate: If user is not authenticated OR role is not 'admin'
  if (!isAuthenticated || !adminUser || adminUser.role !== 'admin') {
    return <AdminLoginPage />;
  }

  // User is verified as an active Admin with role === 'admin' -> grant access to Admin routes
  return <>{children}</>;
};
