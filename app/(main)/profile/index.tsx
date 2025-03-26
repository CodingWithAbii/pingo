import { Text, View, useColorScheme } from 'react-native';
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
import { useAuth } from '@/components/providers/AuthProvider';
import Header from '@/components/ui/Header';

SplashScreen.preventAutoHideAsync();

export default function Profile() {
  const { user } = useAuth();
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
      <Header points={100} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ 
            fontFamily: 'Rubik_600SemiBold', 
            fontSize: 24,
            color: colorScheme === 'light' ? '#162227' : '#DCE6EC'
          }}>
            Profil
          </Text>
          <Text style={{ 
            fontFamily: 'Rubik_400Regular', 
            fontSize: 16,
            color: colorScheme === 'light' ? '#162227' : '#DCE6EC'
          }}>
            {user?.email}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
} 