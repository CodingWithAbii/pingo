import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useColorScheme, TouchableOpacity, TextInput } from 'react-native';
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

  
      return (<View style={background}>

        <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{display: 'flex', gap: 16}}>
            <View style={{ gap: 8, display: 'flex', justifyContent: 'center' }}>

            </View>
            <View style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexDirection: 'row', marginTop: 4 }}>
              <Image
                source={require('../../../assets/images/pingo-standing.png')}
                style={{ width: 82, height: 85 }}
              />
              <Text style={colorScheme === 'dark' ? {
                              marginTop: 5,
                              borderColor: '#37464F',
                              borderWidth: 2,
                              borderRadius: 12,
                              paddingHorizontal: 16,
                              paddingVertical: 10,
                              fontSize: 13,
                              color: '#F1F7FB',
                              maxWidth: 250
                            } : {
                              marginTop: 5,
                              borderColor: '#E5E5E5',
                              borderWidth: 2,
                              borderRadius: 12,
                              paddingHorizontal: 16,
                              paddingVertical: 10,
                              fontSize: 14,
                              color: '#4B4B4B',
                              maxWidth: 250
                            }}>Što želiš naučiti? Uvijek možeš promijeniti smjer!</Text>

                      

            </View>
            <CourseCard
                        title="Osnovni web razvoj"
                        description="Nauči HTML, CSS i JavaScript od temelja"
                        image={require("../../../assets/images/courses/HtmlCssJs.png")} 
                        onPress={() => console.log("Course Clicked")}
              />
            <CourseCard
                        title="Napredniji web razvoj"
                        description="Savladaj moderne front-end tehnologije"
                        image={require("../../../assets/images/courses/frameworks.png")} 
                        onPress={() => console.log("Course Clicked")}
              />
          </View>
          </View>
        </SafeAreaView>
      </View>
      );

  }
