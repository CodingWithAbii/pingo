import { useRouter, useSegments } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Hook za korištenje auth konteksta
export function useAuth() {
  return useContext(AuthContext);
}

// Provjera da li je ruta auth ruta
function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    const inProtectedRoute = segments[0] === '(main)';

    if (!user && inProtectedRoute) {
      // Ako korisnik nije ulogovan a pokušava pristupiti zaštićenoj ruti
      router.replace('/auth');
    } else if (user && inAuthGroup) {
      // Ako je korisnik ulogovan a pokušava pristupiti auth rutama
      router.replace('/home');
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useProtectedRoute(user);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 