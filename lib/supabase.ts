import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Uvezi polifill SAMO za mobilne platforme
if (Platform.OS !== 'web') {
  require('react-native-url-polyfill/auto');
}

// Koristi environment varijable
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Provjeri da li su env varijable postavljene
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Nedostaju Supabase environment varijable. Provjerite .env fajl.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
