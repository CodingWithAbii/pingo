import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Čuvanje sesije (mobilni: SecureStore, web: localStorage)
const saveSession = async (session: any) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('supabase_session', JSON.stringify(session));
  } else {
    await SecureStore.setItemAsync('supabase_session', JSON.stringify(session));
  }
};

// Brisanje sesije
const deleteSession = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('supabase_session');
  } else {
    await SecureStore.deleteItemAsync('supabase_session');
  }
};

// Prijava
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  
  if (data.session) {
    await saveSession(data.session);
    supabase.auth.setSession(data.session);
  }

  return data;
};

// Registracija
export const signUp = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  reason: number,
  experience: number,
  side: number
) => {
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // Sačuvaj dodatne podatke u `profiles` tabelu
  if (authData.user) {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id, // Povezuje se sa auth.users
          first_name,
          last_name,
          reason,
          experience,
          side,
        },
      ]);

    if (profileError) throw profileError;
  }

  return authData;

};

// Odjava
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  await deleteSession();
  if (error) throw error;
};

// Provera da li je korisnik ulogovan
export const getCurrentUser = async (): Promise<User | null> => {
    const session = Platform.OS === 'web' 
      ? localStorage.getItem('supabase_session')
      : await SecureStore.getItemAsync('supabase_session');
  
    if (session) {
      supabase.auth.setSession(JSON.parse(session));
    }
  
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  };