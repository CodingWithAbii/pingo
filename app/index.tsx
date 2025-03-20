import { Redirect, useRouter } from 'expo-router'
import React from 'react'
import { Text, useColorScheme, View } from 'react-native'
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { User } from '@supabase/supabase-js';
import { layoutStyles } from '@/constants/layout';

export default function Index() {
  const [user, setUser] = useState<User | null>(null); // Definiši tip za user
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/auth');
      }
    }
  }, [user, loading]);
  
  if (loading) {
    return (
      <View style={background} />
    );
  }
}
