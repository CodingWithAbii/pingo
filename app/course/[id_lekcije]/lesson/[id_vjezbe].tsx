import React, { useCallback, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import MsgPage from '@/components/MsgPage';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
} from '@expo-google-fonts/rubik';
import { useAuth } from '@/components/providers/AuthProvider';

SplashScreen.preventAutoHideAsync();

interface Vjezba {
  id: number;
  idodlekcije: number; // Pretpostavljam da je status broj
  tipvjezbe:number;
  status: number;
  odabiri?: string;
  sadrzaj?:string;
  sadrzaj_konzola?:string;
  ulazi?:string;
  unos?:string;
  id_sljedece_vjezbe: number;
  idodkursa : number;
}

interface ProgressData {
  user_id: string;
  vjezba_id: number;
  je_tacno: boolean;
}

interface NavigationParams extends Record<string, string> {
  id_lekcije: string;
  id_vjezbe: string;
}

function Index() {
  const { user, profile } = useAuth();
  const [vjezba, setVjezba] = useState<Vjezba | undefined>(undefined);
  const params = useLocalSearchParams();
  const id_lekcije = Number(params.id_lekcije);
  const id_vjezbe = Number(params.id_vjezbe);

  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
  });
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
      SplashScreen.hideAsync().catch(console.error);
    }
    return () => {
      // Cleanup
      if (appIsReady) {
        SplashScreen.hideAsync().catch(console.error);
      }
    };
  }, [fontsLoaded, appIsReady]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Sakrijte splash screen kada su fontovi učitani
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    const fetchLessons = async () => {
      if(id_lekcije === 0){

      }else{
      const { data, error } = await supabase
        .rpc('get_vjezba_with_status_next_and_kurs', {
          p_id: id_vjezbe,
          p_idodlekcije: id_lekcije
        })
        .single();

      if (error) {
        console.error('Error fetching lessons:', error);
      } else {
        setVjezba(data as Vjezba);
      }
    }}
    fetchLessons();
  }, [id_lekcije, id_vjezbe]);

  const upsertProgressRecord = async (progressData: ProgressData) => {
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        user_id: progressData.user_id,
        vjezba_id: progressData.vjezba_id,
        jetacno: progressData.je_tacno // snake_case
      }, {
        onConflict: 'user_id,vjezba_id'
      })
      .select();
  
    if (error) {
      console.error('Greška pri upsert:', error);
      throw error;
    }
  
    return data?.[0];
  };
  
  const handleNext = async () => {
    try {
      const progressRecord = await upsertProgressRecord({
        user_id: user?.id || '',
        vjezba_id: id_vjezbe,
        je_tacno: true
      });
  
      const params: NavigationParams = {
        id_lekcije: id_lekcije.toString(),
        id_vjezbe: vjezba?.id_sljedece_vjezbe?.toString() || '0' 
      };
  
      router.push({
        pathname: '/course/[id_lekcije]/lesson/[id_vjezbe]',
        params
      });
    } catch (error) {
      console.error('Došlo je do greške:', error);
      return null;
    }
  };

  const handleExit = () => {
    router.replace(`/home?course=${vjezba?.idodkursa}`)
  }

  if (vjezba && vjezba.tipvjezbe) {
    if(vjezba.tipvjezbe === 1){
      return <MsgPage isExit={true} back={handleExit} next={handleNext} onLayoutRootView={onLayoutRootView} variant={colorScheme === 'light' ? 'light' : 'dark'} content={vjezba?.sadrzaj || ''} status={vjezba.status} />
    }
  }else{
    return null
  }

  
}

export default Index