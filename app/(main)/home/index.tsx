import { Text, View, useColorScheme } from 'react-native';
import { useAuth } from '@/components/providers/AuthProvider';
import { layoutStyles } from '@/constants/layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
} from '@expo-google-fonts/rubik';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const { user, profile } = useAuth();
  const colorScheme = useColorScheme();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;

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
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View style={background} />;
  }

  return (
    <View style={background}>
      <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text style={{ 
            fontFamily: 'Rubik_600SemiBold', 
            fontSize: 24,
            color: colorScheme === 'light' ? '#162227' : '#DCE6EC'
          }}>
            Dobrodošli, {profile ? `${profile.first_name} ${profile.last_name}` : 'korisniče'}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
