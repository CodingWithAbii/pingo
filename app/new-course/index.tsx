import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useColorScheme, TouchableOpacity, TextInput, ScrollView } from 'react-native';
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
import { Image } from 'expo-image';
import Chat from '@/components/ui/Chat'
import CourseCard from '@/components/ui/CourseCard';
// import CourseCard from '@/components/ui/CourseCard'
import Statusbar from '@/components/ui/Statusbar'

export default function index() {

  interface CourseCard {
    id: number;
    title: string;
    icon?: any; // Opcionalni prop za ikone
  }

  // Sprečite automatsko skrivanje splash screen-a
  SplashScreen.preventAutoHideAsync();

  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Sakrijte splash screen kada su fontovi učitani
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const { q } = useLocalSearchParams<{ q?: string }>();
  const [fontsLoaded] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
    Rubik_800ExtraBold,
  });

  const CategoryTitle = ({ title }: { title: string }) => (
    <Text style={colorScheme === 'dark' ? styles.categoryTitleDark : styles.categoryTitleLight}>
      {title}
    </Text>
  );

  return (<View style={background}>
    <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, gap: 16, paddingBottom: 32 }}>
          <View style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexDirection: 'row', marginTop: 4 }}>
            <Image
              source={require('../../assets/images/pingo-standing.png')}
              style={{ width: 82, height: 85 }}
            />
            <Text style={colorScheme === 'dark' ? styles.welcomeTextDark : styles.welcomeTextLight}>
              Što želiš naučiti? Uvijek možeš promijeniti smjer!
            </Text>
          </View>

          <CategoryTitle title="Web Development" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.courseContainer}>
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Osnovni web razvoj"
                description="Nauči HTML, CSS i JavaScript od temelja"
                image={require("../../assets/images/courses/HtmlCssJs.png")}
                onPress={() => router.push('/home')}
                duration="6 sedmica"
                lessons={24}
              />
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="React Development"
                description="Razvoj modernih web aplikacija sa React-om"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("React Course Clicked")}
                duration="8 sedmica"
                lessons={32}
              />
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Backend Development"
                description="Node.js i Express.js osnove"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("Backend Course Clicked")}
                duration="10 sedmica"
                lessons={40}
              />
            </View>
          </ScrollView>

          <CategoryTitle title="Programski Jezici" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.courseContainer}>
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Python za početnike"
                description="Osnove Python programiranja i algoritama"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("Python Course Clicked")}
                duration="6 sedmica"
                lessons={20}
              />
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Java Programming"
                description="Objektno orijentirano programiranje u Javi"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("Java Course Clicked")}
                duration="12 sedmica"
                lessons={48}
              />
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="C++ Fundamentals"
                description="Sistemsko programiranje i optimizacija"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("C++ Course Clicked")}
                duration="10 sedmica"
                lessons={40}
              />
            </View>
          </ScrollView>

          <CategoryTitle title="Data Science" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.courseContainer}>
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Machine Learning"
                description="Osnove mašinskog učenja sa Python-om"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("ML Course Clicked")}
                duration="12 sedmica"
                lessons={36}
              />
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Data Analysis"
                description="Analiza podataka sa Pandas i NumPy"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("Data Analysis Clicked")}
                duration="8 sedmica"
                lessons={24}
              />
            </View>
          </ScrollView>

          <CategoryTitle title="Cyber Security" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.courseContainer}>
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Ethical Hacking"
                description="Osnove etičkog hakovanja i penetracijskog testiranja"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("Hacking Course Clicked")}
                duration="10 sedmica"
                lessons={30}
              />
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Network Security"
                description="Zaštita mreža i mrežnih protokola"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("Network Security Clicked")}
                duration="8 sedmica"
                lessons={24}
              />
            </View>
          </ScrollView>

          <CategoryTitle title="Game Development" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            <View style={styles.courseContainer}>
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Unity Game Dev"
                description="Razvoj 2D i 3D igara u Unity Engine-u"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("Unity Course Clicked")}
                duration="14 sedmica"
                lessons={42}
              />
              <CourseCard
                variant={colorScheme === 'dark' ? 'dark' : 'light'}
                title="Unreal Engine"
                description="Napredni razvoj igara sa Unreal Engine 5"
                image={require("../../assets/images/courses/frameworks.png")}
                onPress={() => console.log("Unreal Course Clicked")}
                duration="16 sedmica"
                lessons={48}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  </View>
  );

}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: -16,
  },
  courseContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryTitleLight: {
    marginTop: 5,
    fontFamily: 'Rubik_700Bold',
    paddingTop: 10,
    fontSize: 20,
    color: '#4B4B4B',
  },
  categoryTitleDark: {
    marginTop: 5,
    fontFamily: 'Rubik_700Bold',
    paddingTop: 10,
    fontSize: 20,
    color: '#F1F7FB',
  },
  welcomeTextLight: {
    marginTop: 5,
    borderColor: '#E5E5E5',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#4B4B4B',
    maxWidth: 250
  },
  welcomeTextDark: {
    marginTop: 5,
    borderColor: '#37464F',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: '#F1F7FB',
    maxWidth: 250
  }
});
