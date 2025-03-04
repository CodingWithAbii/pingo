import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
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
      <View style={{ paddingHorizontal: 16, flex: 1, justifyContent: 'space-between' }}>
        <Link href="/auth/register" asChild>
          <Text style={{ color: '#000', fontFamily: 'Rubik_800ExtraBold', }}>Ovo je test</Text>
        </Link>
        <Button
          variant="secondary"
          title="Click me"
          onPress={() => console.log('Pressed')}
          textColor="#fff"
        />
        <View>
          <Button
            variant="secondary"
            title="Zapocni"
            onPress={() => console.log('Pressed')}
            textColor="#fff"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}