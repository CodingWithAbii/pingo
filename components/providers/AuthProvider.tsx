import { useRouter, useSegments, useRootNavigation } from 'expo-router';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

// Hook za korištenje auth konteksta
export function useAuth() {
  return useContext(AuthContext);
}

// Provjera da li je ruta auth ruta
function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();
  const rootNav = useRootNavigation();

  useEffect(() => {
    if (!rootNav?.isReady || segments[0] === undefined) return;

    const inAuthGroup = segments[0] === 'auth';
    const inProtectedRoute = segments[0] === '(main)';

    if (!user && inProtectedRoute) {
      // Ako korisnik nije ulogovan a pokušava pristupiti zaštićenoj ruti
      router.replace('/auth');
    } else if (user && inAuthGroup) {
      // Ako je korisnik ulogovan a pokušava pristupiti auth rutama
      router.replace('/home');
    }
  }, [user, segments, rootNav?.isReady]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useProtectedRoute(user);

  const checkUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking auth state:', error);
      setUser(null);
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    checkUser();

    // Pretplati se na promjene auth stanja
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        checkUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkUser]);

  const value = {
    user,
    loading,
    refreshUser: checkUser,
  };

  // Ne prikazuj ništa dok se inicijalna provjera ne završi
  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 