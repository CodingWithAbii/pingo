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
import { Link, router, useLocalSearchParams } from 'expo-router';
import Header from '@/components/ui/Header';
import RoadMap from '@/components/ui/RoadMap';
import { supabase } from '@/lib/supabase';

SplashScreen.preventAutoHideAsync();

interface Lesson {
  title: string;
  status: number; // Pretpostavljam da je status broj
  isLocked: boolean;
  isCompleted: boolean;
  progress?: number;
}

interface LessonRoadMapItem {
  title: string;
  isLocked: boolean;
  progress: number;
}

interface NavigationParams extends Record<string, string> {
  id_lekcije: string;
}

export default function Home() {
  const { user, profile } = useAuth();
  const colorScheme = useColorScheme();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;
  const { course } = useLocalSearchParams<{ course?: string}>();
  const [lessonRoadMap, setLessonRoadMap] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imeKursta, setImeKursa] = useState('')
  

  useEffect(() => {
    const fetchLessons = async () => {
      if (course) {
        setLoading(true);
       
        const { data, error } = await supabase.rpc('get_course_progress_with_names', {
          p_user_id: user?.id,
          kurs_id: course
        });

        if (error) {
          console.error('Error fetching lessons:', error);
        } else {
          setImeKursa(data[0].imekursa)
          const formattedLessons = data.map((lesson: any, index: number) => {
            const isCompleted = lesson.status === 100;

            // Provjeravamo da li je lekcija otključana
            const isLocked = index > 0 && (lesson.status <= 0 && data[index - 1].status !== 100);
            return {
              title: lesson.imelekcije,
              isLocked: isLocked,
              isCompleted: isCompleted,
              progress: lesson.status, // status predstavlja progress
            };
          });

          // Pronađi posljednju otključanu lekciju
          const lastUnlockedIndex = formattedLessons
            .map((lesson: { isLocked: boolean }, index: number) => (lesson.isLocked ? -1 : index))
            .reduce((prev: number, curr: number) => (curr > prev ? curr : prev), -1);

          // Postavi currentLesson na posljednju otključanu lekciju
          setCurrentLesson(lastUnlockedIndex);

          setLessonRoadMap(formattedLessons);
        }
        setLoading(false);
      }
    };

    fetchLessons();
  }, [course]);



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

  const handleLessonPress = (index: number) => {
    if (!lessonRoadMap[index].isLocked) {
      const lessonId = lessonRoadMap[index].title;
      console.log(lessonRoadMap[index])

      if (lessonId !== undefined) {
        const params: NavigationParams = {
          id_lekcije: lessonId.toString(),
        };

        router.push({
          pathname: '/course/[id_lekcije]',
          params
        });
      }
    }
  };

  if (!appIsReady) {
    return <View style={background} />;
  }

  if(course) {
    return(
      <View style={background}>
        <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
          <Header points={points} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.courseContainer}>
              <Text style={[styles.courseTitle, { color: colorScheme === 'light' ? '#162227' : '#DCE6EC' }]}>
                {imeKursta}
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
          <Header points={points} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colorScheme === 'dark' ? '#F1F7FB' : '#162227' }}>
              <Link href={'/home?course=1'}>Front-End Development</Link>
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