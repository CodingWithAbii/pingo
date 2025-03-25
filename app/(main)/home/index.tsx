import { Text, View, useColorScheme, ScrollView, StyleSheet } from 'react-native';
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
import RoadMap from '@/components/ui/RoadMap';

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const { user, profile } = useAuth();
  const colorScheme = useColorScheme();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;
  const { course } = useLocalSearchParams<{ course?: string}>();
  const [currentLesson, setCurrentLesson] = useState(0);

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

  const lessonRoadMap = [
    { title: "Uvod u kurs", isLocked: false },
    { title: "Osnovni koncepti", isLocked: false },
    { title: "Praktični zadaci", isLocked: true },
    { title: "Napredne tehnike", isLocked: true },
    { title: "Završni projekat", isLocked: true },
  ];

  const handleLessonPress = (index: number) => {
    if (!lessonRoadMap[index].isLocked) {
      setCurrentLesson(index);
    }
  };

  if (!appIsReady) {
    return <View style={background} />;
  }

  if(course) {
    return(
      <View style={background}>
        <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
          <Header points={points} onShopPress={handleShopPress} onSettingsPress={handleSettingsPress} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.courseContainer}>
              <Text style={[styles.courseTitle, { color: colorScheme === 'light' ? '#162227' : '#DCE6EC' }]}>
                {decodeURIComponent(course)}
              </Text>
              <RoadMap
                lessons={lessonRoadMap}
                currentLesson={currentLesson}
                onLessonPress={handleLessonPress}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  } else {
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

const styles = StyleSheet.create({
  courseContainer: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  courseTitle: {
    fontFamily: 'Rubik_600SemiBold',
    fontSize: 24,
    textAlign: 'center'
  }
});
