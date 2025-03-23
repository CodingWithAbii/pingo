import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useColorScheme, ScrollView } from 'react-native';
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
import { layoutStyles } from '@/constants/layout';
import { Image } from 'expo-image';
import CourseCard from '@/components/ui/CourseCard';

// CSV data
const courses = [
  {
    ime: "Back-End Development",
    opis: "Postanite back-end programer: Naučite JavaScript, razumite NodeJS, izgradite backend programe s Expressom i savladajte SQL",
    kategorija: 0,
  },
  {
    ime: "Front-End Development",
    opis: "Otključajte web razvoj: Uronite duboko u HTML, CSS, i JavaScript, i savladajte React",
    kategorija: 0,
  },
  {
    ime: "Full-Stack Web Development",
    opis: "Postanite full-stack programer: Naučite HTML, CSS, JavaScript i React kao i NodeJS, Express i SQL",
    kategorija: 0,
  },
  {
    ime: "Osnove Web Developmenta",
    opis: "Savladajte HTML, CSS i JavaScript za izradu interaktivnih web stranica",
    kategorija: 0,
  },
  {
    ime: "Python za Data Science",
    opis: "Iskoristite Python i biblioteke kao Pandas i NumPy za analizu podataka",
    kategorija: 1,
  },
  {
    ime: "Python za Machine Learning",
    opis: "Primijenite tehnike strojnog učenja u Pythonu koristeći Scikit-learn",
    kategorija: 1,
  },
  {
    ime: "Data Visualization s R",
    opis: "Izradite vizualizacije podataka u R pomoću ggplot2 i Shiny",
    kategorija: 1,
  },
  {
    ime: "Deep Learning s Tensorflow",
    opis: "Kreirajte i trenirajte duboke neuronske mreže koristeći TensorFlow",
    kategorija: 1,
  },
  {
    ime: "Android Development s Kotlin",
    opis: "Razvijajte Android aplikacije koristeći Kotlin s naprednim funkcijama",
    kategorija: 2,
  },
  {
    ime: "iOS Development s Swift",
    opis: "Izradite aplikacije za iPhone i iPad pomoću Swift jezika",
    kategorija: 2,
  },
  {
    ime: "Cross-Platform Mobile Development s Flutter",
    opis: "Razvijajte aplikacije koje funkcioniraju na Androidu i iOS-u koristeći Flutter",
    kategorija: 2,
  },
  {
    ime: "React Native za App Development",
    opis: "Stvorite mobilne aplikacije za Android i iOS koristeći React Native",
    kategorija: 2,
  },
  {
    ime: "Uvod u Game Development sa Unity",
    opis: "Razvijajte 2D igre koristeći Unity engine i C# jezik",
    kategorija: 3,
  },
  {
    ime: "Game Development sa Godot",
    opis: "Iskoristite Godot engine za izradu 2D igara s interaktivnim elementima",
    kategorija: 3,
  },
  {
    ime: "Game Design i Prototyping",
    opis: "Dizajnirajte igre, kreirajte izazovne mehanike i izradite prototipe",
    kategorija: 3,
  },
  {
    ime: "Napredni 3D Game Development sa Unreal Engine",
    opis: "Razvijajte napredne 3D igre koristeći Unreal Engine",
    kategorija: 3,
  },
  {
    ime: "Uvod u Cybersecurity",
    opis: "Savladajte osnove zaštite podataka, sigurnosnih protokola i upravljanja rizicima",
    kategorija: 4,
  },
  {
    ime: "Ethical Hacking i Penetration testiranje",
    opis: "Testirajte sigurnost sustava koristeći alate poput Kali Linuxa i Metasploit",
    kategorija: 4,
  },
  {
    ime: "Network Security i Firewall",
    opis: "Postavite firewalle, VPN-ove i druge sigurnosne alate za zaštitu mreža",
    kategorija: 4,
  },
  {
    ime: "Osnove Kriptografije",
    opis: "Implementirajte osnovne tehnike enkripcije za zaštitu podataka",
    kategorija: 4,
  },
];

const categoryTitles: { [key: number]: string } = {
  0: "Web Development",
  1: "Data Science",
  2: "Mobile Development",
  3: "Game Development",
  4: "Cyber Security",
};

export default function HomeScreen() {
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

  // Group courses by category
  const groupedCourses = courses.reduce((acc, course) => {
    const category = course.kategorija;
    if (!acc[category]) acc[category] = [];
    acc[category].push(course);
    return acc;
  }, {} as { [key: number]: typeof courses });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Čekamo da se fontovi učitaju
        if (fontsLoaded) {
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  const CategoryTitle = ({ title }: { title: string }) => (
    <Text style={colorScheme === 'dark' ? styles.categoryTitleDark : styles.categoryTitleLight}>
      {title}
    </Text>
  );

  return (
    <View style={background}>
      <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, gap: 16, paddingBottom: 32 }}>
            <View style={styles.headerContainer}>
              <Image
                source={require('../../assets/images/pingo-standing.png')}
                style={{ width: 82, height: 85 }}
              />
              <Text style={[
                colorScheme === 'dark' ? styles.welcomeTextDark : styles.welcomeTextLight,
                styles.welcomeText
              ]}>
                Što želiš naučiti? Uvijek možeš promijeniti smjer!
              </Text>
            </View>

            {[0, 1, 2, 3, 4].map((categoryNumber) => (
              groupedCourses[categoryNumber] && (
                <View key={categoryNumber}>
                  <CategoryTitle title={categoryTitles[categoryNumber]} />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.courseContainer}>
                      {groupedCourses[categoryNumber].map((course) => (
                        <CourseCard
                          key={course.ime}
                          variant={colorScheme === 'dark' ? 'dark' : 'light'}
                          title={course.ime}
                          description={course.opis}
                          image={require("../../assets/images/courses/frameworks.png")}
                          onPress={() => router.replace(`/home?course=${encodeURIComponent(course.ime)}`)}
                          duration="6 sedmica"
                          lessons={24}
                        />
                      ))}
                    </View>
                  </ScrollView>
                </View>
              )
            ))}
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
  headerContainer: {
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 4
  },
  welcomeText: {
    fontFamily: 'Rubik_400Regular',
  },
  categoryTitleLight: {
    marginTop: 5,
    fontFamily: 'Rubik_700Bold',
    paddingVertical: 10,
    fontSize: 20,
    color: '#4B4B4B',
  },
  categoryTitleDark: {
    marginTop: 5,
    fontFamily: 'Rubik_700Bold',
    paddingVertical: 10,
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