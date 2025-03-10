import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
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

// Sprečite automatsko skrivanje splash screen-a
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();

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
    return null; // Možete vratiti prazan View ili neki loader
  }

  return (
    <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View></View>
        <View>
          <Text style={{ fontFamily: 'Rubik_400Regular', fontSize: 16, color: '#DCE6EC', textAlign: 'center' }}>Postani programer. Promijeni svijet.</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button
            title="Započni"
            textColor="#fff"
            onPress={() => router.push('/auth/register')}
          />
          <Button
            variant="secondary"
            title="Već imam račun"
            onPress={() => router.push('/auth/login')}
            textColor="#fff"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}