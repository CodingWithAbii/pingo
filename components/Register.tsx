import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useColorScheme } from 'react-native';
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

// Sprečite automatsko skrivanje splash screen-a
SplashScreen.preventAutoHideAsync();

export default function Register() {
  const params = useLocalSearchParams();

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
  
    return (<View style={background}>
      <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Button
              title="Nazad"
              textColor={colors.light.background}
              
            />
          <View>
            <Text style={{ fontFamily: 'Rubik_400Regular', fontSize: 16, color: '#000', textAlign: 'center' }}>Ovo je za prvo</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button
              title={params.q.toString()}
              textColor={colors.light.background}
              onPress={()=>router.push('/auth/register?q=6')}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
    );
  
}