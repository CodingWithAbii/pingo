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
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/ui/Header';

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const { user, profile } = useAuth();
  const colorScheme = useColorScheme();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;
  const { course } = useLocalSearchParams<{ course?: string}>();

  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
  });
  const [appIsReady, setAppIsReady] = useState(false);

  const points = 100;

  const handleShopPress = () => {
    // Logika za otvaranje shop-a
  };

  const handleSettingsPress = () => {
    // Logika za otvaranje postavki
  };

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

  if(course){
    return <Text>{course}</Text>
  }else{
    return (
      <View style={background}>
        <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
          <Header points={points} onShopPress={handleShopPress} onSettingsPress={handleSettingsPress} />
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

}
