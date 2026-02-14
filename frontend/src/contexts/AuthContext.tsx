import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: string | number;
  name?: string;
  email?: string;
  role?: 'candidat' | 'recruteur' | 'admin' | 'admin_content' | 'superadmin' | string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  user_metadata?: any;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isInitialLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, endpoint?: string, expectedRole?: string, navigate?: (to: string, opts?: any) => void) => Promise<User | null>;
  register: (data: any, endpoint?: string, role?: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            if (mounted) setUser(parsedUser as User);
          } catch (e) {
            console.warn('[AuthContext] failed parsing saved user', e);
          }
        }

        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData?.session;
        if (session?.access_token) {
          const accessToken = session.access_token;
          if (mounted) {
            setToken(accessToken);
          }

          const userFromSession = session.user;
          if (userFromSession) {
            const enrichedUser: User = {
              ...userFromSession,
              id: userFromSession.id,
              email: userFromSession.email,
              name: userFromSession.user_metadata?.name || userFromSession.email?.split('@')[0] || 'User',
              role: (userFromSession as any).raw_user_meta_data?.role || userFromSession.user_metadata?.role || undefined,
              user_metadata: userFromSession.user_metadata || (userFromSession as any).raw_user_meta_data || {},
            } as User;

            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('role, is_active, full_name')
                .eq('id', enrichedUser.id)
                .single();
              if (profileError) {
                console.warn('[AuthContext] profiles lookup error during init:', profileError.message);
              } else if (profileData) {
                enrichedUser.role = (profileData as any).role || enrichedUser.role;
                enrichedUser.isActive = (profileData as any).is_active !== undefined ? (profileData as any).is_active : enrichedUser.isActive;
                enrichedUser.name = (profileData as any).full_name || enrichedUser.name;
              }
            } catch (e: any) {
              console.error('[AuthContext] profile lookup exception during init:', e?.message);
            }

            if (mounted) {
              if ((enrichedUser.role === 'admin' || enrichedUser.role === 'admin_content' || enrichedUser.role === 'superadmin') && enrichedUser.isActive === false) {
                try {
                  await supabase.auth.signOut();
                } catch (e) {
                  console.warn('[AuthContext] signOut error:', e);
                }
                console.warn('[AuthContext] admin/admin_content/superadmin account inactive, refusing session');
              } else {
                setUser(enrichedUser);
                try {
                  localStorage.setItem('auth_user', JSON.stringify(enrichedUser));
                } catch (e) {
                  console.warn('[AuthContext] localStorage save error:', e);
                }
              }
            }
          }
        }
      } catch (e) {
        console.error('[AuthContext] init error:', e);
      } finally {
        console.log('[AuthContext] useEffect finally block executing');
        if (mounted) {
          setIsInitialLoading(false);
          setIsLoading(false);
        }
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'SIGNED_OUT') {
          if (mounted) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('auth_user');
          }
        } else if (session?.access_token) {
          const accessToken = session.access_token;
          if (mounted) {
            setToken(accessToken);
          }
          const userData = session.user;
          if (userData) {
            const enrichedUser: User = {
              ...userData,
              id: userData.id,
              email: userData.email,
              name: userData.user_metadata?.name || userData.email?.split('@')[0] || 'User',
              role: (userData as any).raw_user_meta_data?.role || userData.user_metadata?.role || undefined,
              user_metadata: userData.user_metadata || (userData as any).raw_user_meta_data || {},
            } as User;

            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('role, is_active, full_name')
                .eq('id', enrichedUser.id)
                .single();
              if (profileError) {
                console.warn('[AuthContext] profiles lookup error on auth change:', profileError.message);
              } else if (profileData) {
                enrichedUser.role = (profileData as any).role || enrichedUser.role;
                enrichedUser.isActive = (profileData as any).is_active !== undefined ? (profileData as any).is_active : enrichedUser.isActive;
                enrichedUser.name = (profileData as any).full_name || enrichedUser.name;
              }
            } catch (e: any) {
              console.error('[AuthContext] profile lookup exception on auth change:', e?.message);
            }

            if (mounted) {
              if ((enrichedUser.role === 'admin' || enrichedUser.role === 'admin_content' || enrichedUser.role === 'superadmin') && enrichedUser.isActive === false) {
                try {
                  await supabase.auth.signOut();
                } catch (e) {
                  console.warn('[AuthContext] signOut error:', e);
                }
                console.warn('[AuthContext] admin/admin_content/superadmin account inactive on auth change, signing out');
              } else {
                setUser(enrichedUser);
                try {
                  localStorage.setItem('auth_user', JSON.stringify(enrichedUser));
                } catch (e) {
                  console.warn('[AuthContext] localStorage save error:', e);
                }
              }
            }
          }
        }
      } catch (e) {
        console.error('[AuthContext] onAuthStateChange error:', e);
      }
    });

    return () => {
      mounted = false;
      try {
        listener?.subscription?.unsubscribe?.();
      } catch (e) {
        console.warn('[AuthContext] unsubscribe error:', e);
      }
    };
  }, []);

  useEffect(() => {
    try {
      console.log('AuthContext State:', { user, loading: isLoading });
    } catch (e) {
      // noop
    }
  }, [user, isLoading]);

  const login = async (
    email: string,
    password: string,
    endpoint = 'login',
    expectedRole?: string,
    navigateFn?: (to: string, opts?: any) => void
  ): Promise<User | null> => {
    console.log('[AuthContext.login] START - email:', email, 'endpoint:', endpoint, 'expectedRole:', expectedRole);
    setIsLoginInProgress(true);
    let pendingNavigate: (() => void) | null = null;
    try {
      setIsLoading(true);

      if (supabase) {
        console.log('[AuthContext.login] Supabase client IS available');
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });

          if (error) {
            console.error('[AuthContext.login] signInWithPassword error:', error.message);
            throw new Error(error.message || 'Authentification échouée');
          }

          const accessToken = data?.session?.access_token ?? null;
          const userData = data?.user ?? null;

          if (accessToken) {
            setToken(accessToken);
          }

          if (userData) {
            const enrichedUser: User = {
              ...userData,
              id: userData.id,
              email: userData.email,
              name: userData.user_metadata?.name || userData.email?.split('@')[0] || 'User',
              role: (userData as any).raw_user_meta_data?.role || userData.user_metadata?.role || undefined,
              user_metadata: userData.user_metadata || (userData as any).raw_user_meta_data || {},
            } as User;

            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('role, is_active, full_name')
                .eq('id', enrichedUser.id)
                .single();

              if (profileError) {
                console.warn('[AuthContext.login] profiles lookup error:', profileError.message);
              } else if (profileData) {
                enrichedUser.role = (profileData as any).role || enrichedUser.role;
                enrichedUser.isActive = (profileData as any).is_active !== undefined ? (profileData as any).is_active : enrichedUser.isActive;
                enrichedUser.name = (profileData as any).full_name || enrichedUser.name;
              }
            } catch (e: any) {
              console.error('[AuthContext.login] profile lookup exception:', e?.message);
            }

            if ((enrichedUser.role === 'admin' || enrichedUser.role === 'admin_content') && enrichedUser.isActive === false) {
              try {
                await supabase.auth.signOut();
              } catch (e) {
                console.warn('[AuthContext.login] signOut error:', e);
              }
              throw new Error('Votre compte est en attente de validation par le Superadmin');
            }

            if (expectedRole && enrichedUser.role && enrichedUser.role !== expectedRole) {
              throw new Error('Vous n\'êtes pas autorisé à accéder à cette interface');
            }

            setUser(enrichedUser);
            try {
              localStorage.setItem('auth_user', JSON.stringify(enrichedUser));
            } catch (e) {
              console.warn('[AuthContext.login] localStorage save error:', e);
            }

            if (navigateFn) {
              const roleFromMeta = enrichedUser.user_metadata?.role || enrichedUser.role;
              if (roleFromMeta === 'superadmin') {
                pendingNavigate = () => {
                  navigateFn('/superadmin/dashboard');
                };
              } else if (roleFromMeta === 'admin_content') {
                pendingNavigate = () => {
                  navigateFn('/admin-content/dashboard');
                };
              } else if (roleFromMeta === 'admin') {
                pendingNavigate = () => {
                  navigateFn('/admin/dashboard');
                };
              }
            }

            return enrichedUser;
          }

          return null;
        } catch (e: any) {
          console.error('[AuthContext.login] Supabase error:', e?.message || e);
          throw e;
        }
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/mosala-api/auth/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(errBody?.message || 'Authentification échouée');
        }

        const data = await response.json();
        const accessToken = data?.access_token || data?.token || null;
        const userData = data?.user || null;

        if (accessToken) {
          setToken(accessToken);
          try {
            localStorage.setItem('mosala_token', accessToken);
          } catch (e) {
            console.warn('[AuthContext.login] localStorage save error:', e);
          }
        }

        if (userData) {
          setUser(userData);
          try {
            localStorage.setItem('auth_user', JSON.stringify(userData));
          } catch (e) {
            console.warn('[AuthContext.login] localStorage save error:', e);
          }
        }

        return userData;
      }
    } catch (err) {
      console.error('[AuthContext.login] Caught error in login:', err instanceof Error ? err.message : err);
      throw err;
    } finally {
      setIsLoginInProgress(false);
      setIsLoading(false);
      if (typeof pendingNavigate === 'function') {
        pendingNavigate();
      }
    }
  };

  const register = async (data: any, endpoint = 'register', role?: string) => {
    try {
      setIsLoading(true);

      if (supabase) {
        const meta = { ...data };
        delete meta.password;
        delete meta.email;
        if ((meta as any).name) {
          (meta as any).full_name = (meta as any).name;
          delete (meta as any).name;
        }

        const metadata = { ...(Object.keys(meta).length ? meta : {}), ...(role ? { role } : {}) };
        const options: any = {};
        if (Object.keys(metadata).length) {
          options.data = metadata;
        }

        try {
          const { data: sbData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options,
          });

          if (error) {
            console.error('[AuthContext.register] signUp error:', error.message, (error as any).hint);
            throw new Error(error.message || 'Inscription échouée');
          }

          if (!sbData?.user && !sbData?.session) {
            throw new Error('Inscription: réponse inattendue du serveur');
          }

          const accessToken = sbData?.session?.access_token ?? null;
          const userData = sbData?.user ?? null;

          if (accessToken) {
            setToken(accessToken);
            try {
              localStorage.setItem('mosala_token', accessToken);
            } catch (e) {
              console.warn('[AuthContext.register] localStorage save error:', e);
            }
          }

          if (userData) {
            const enrichedUser = {
              id: userData.id,
              email: userData.email,
              name: userData.user_metadata?.name || data.name || userData.email?.split('@')[0] || 'User',
              role: userData.user_metadata?.role || data.role || 'candidat',
              user_metadata: userData.user_metadata,
              ...userData,
            };

            setUser(enrichedUser as any);
            try {
              localStorage.setItem('auth_user', JSON.stringify(enrichedUser));
            } catch (e) {
              console.warn('[AuthContext.register] localStorage save error:', e);
            }
          }
        } catch (e: any) {
          console.error('[AuthContext.register] Supabase error:', e?.message || e, (e as any)?.hint);
          throw e;
        }

        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/mosala-api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody?.message || 'Inscription échouée');
      }

      const responseData = await response.json();
      const accessToken = responseData?.access_token || responseData?.token || null;
      const userData = responseData?.user || responseData || null;

      if (accessToken) {
        setToken(accessToken);
        try {
          localStorage.setItem('mosala_token', accessToken);
        } catch (e) {
          console.warn('[AuthContext.register] localStorage save error:', e);
        }
      }

      if (userData) {
        setUser(userData);
        try {
          localStorage.setItem('auth_user', JSON.stringify(userData));
        } catch (e) {
          console.warn('[AuthContext.register] localStorage save error:', e);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    try {
      supabase.auth.signOut().catch(e => {
        console.warn('[AuthContext.logout] signOut error:', e);
      });
    } catch (e) {
      console.warn('[AuthContext.logout] error:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isInitialLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};
