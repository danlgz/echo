import { createContext, useContext, useEffect, useState } from 'react';
import httpClient, { clearTokens, getAuthToken, saveTokens } from '@/lib/http';
import type { User } from '@/types';

type LoginPayloadType = {
  accessToken: string;
  refreshToken: string;
};

type AuthContextType = {
  user: User | null;
  logout: () => void;
  login: (payload: LoginPayloadType) => void;
  asyncLogin: (payload: LoginPayloadType) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkAuthStatus() {
    setLoading(true);

    try {
      if (!getAuthToken()) {
        console.warn('No auth token found');
      }

      const response = await httpClient.get<User>('/users/me');
      setUser(response.data);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  }

  // biome-ignore lint:correctness/useExhaustiveDependencies: execute only when the component mounts
  useEffect(() => {
    void checkAuthStatus();
  }, []);

  function logout() {
    clearTokens();
    setUser(null);
  }

  async function asyncLogin({ accessToken, refreshToken }: LoginPayloadType) {
    saveTokens(accessToken, refreshToken);
    await checkAuthStatus();
  }

  function login(payload: LoginPayloadType) {
    void asyncLogin(payload);
  }

  const contextValue = {
    user,
    logout,
    login,
    asyncLogin,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
