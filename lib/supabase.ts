import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

// Uvezi polifill SAMO za mobilne platforme
if (Platform.OS !== 'web') {
  require('react-native-url-polyfill/auto');
}

const SUPABASE_URL = 'https://oikzhafqopfiyfdimhwy.supabase.co';
const SUPABASE_ANON_KEY = '';


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
