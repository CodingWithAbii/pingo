import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
} from '@expo-google-fonts/rubik';
import Button from '@/components/ui/Button';
import { layoutStyles } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';

// Sprečite automatsko skrivanje splash screen-a
SplashScreen.preventAutoHideAsync();

export default function Register() {
  const { q } = useLocalSearchParams<{ q?: string }>();

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
  const router = useRouter();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;

  const handleBack = () => {
    if (Number(q) === 0) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push('/auth');
      }
    } else {
      const br = Number(q) - 1
      router.push({
        pathname: '/auth/register',
        params: { q: br.toString() },
      })
    }
  }

  const handleNext = () => {
    const br = Number(q) + 1
    router.push({
      pathname: '/auth/register',
      params: { q: br.toString() },
    })
  }

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Sakrijte splash screen kada su fontovi učitani
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View style={background} />; // Možete vratiti prazan View ili neki loader
  }

  if(Number(q) === 0){
    return (<View style={background}>
      <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ gap: 8 }}>
            <TouchableOpacity onPress={handleBack} >
              <ArrowLeft style={{ cursor: 'pointer' }} color={colorScheme === 'light' ? '#AFAFAF' : '#74797A'} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontFamily: 'Rubik_400Regular', fontSize: 16, color: '#000', textAlign: 'center' }}>Ovo je za prvo</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button
              title='Nastavi'
              textColor={colors.light.background}
              onPress={handleNext}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
    );
  } else if(Number(q) === 1){
    return (<View style={background}>
      <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ gap: 8 }}>
            <TouchableOpacity onPress={handleBack} >
              <ArrowLeft style={{ cursor: 'pointer' }} color={colorScheme === 'light' ? '#AFAFAF' : '#74797A'} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontFamily: 'Rubik_400Regular', fontSize: 16, color: '#000', textAlign: 'center' }}>Ovo je za drugi</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button
              title='Nastavi'
              textColor={colors.light.background}
              onPress={handleNext}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
    );
  }

 

}