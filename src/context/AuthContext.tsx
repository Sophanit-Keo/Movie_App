import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContextType } from '../network/models/auth';

const TOKEN_KEY = 'auth_token';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    SecureStore.getItemAsync(TOKEN_KEY).then(async (saved) => {
      if (saved) {
        try {
          const res = await fetch(`${BASE_URL}/user`, {
            headers: { Authorization: `Bearer ${saved}` },
          });
          if (res.ok) {
            setToken(saved);            // ✅ valid — stay logged in
          } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setToken(null);
          }
        } catch {
          // Network error (offline) — keep the token and try later
          setToken(saved);
        }
      }
      setIsLoading(false);
    });
  }, []);

  async function login(newToken: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, newToken);
    setToken(newToken);
  }

  async function logout() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
