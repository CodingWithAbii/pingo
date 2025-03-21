import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, useColorScheme, TouchableOpacity, TextInput, Alert } from 'react-native';
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
import Statusbar from '@/components/ui/Statusbar'
import MsgPage from './MsgPage';
import OptPage from './OptPage';
import { signIn, signUp } from '@/lib/auth';
//import { supabase } from '@/lib/supabase';

// Sprečite automatsko skrivanje splash screen-a
SplashScreen.preventAutoHideAsync();

export default function Register() {
  const { q, r, e, s, fn, ln } = useLocalSearchParams<{ q?: string, r?: string, e?: string, s?: string, fn?: string, ln?: string}>();
  const [reason, setReason] = useState<number>(() => {
    const parsedR = parseInt(r || '1', 10);
    return parsedR >= 1 && parsedR <= 5 ? parsedR : 1;
  })
  const [experience, setExperience] = useState<number>(() => {
    const parsedE = parseInt(e || '1', 10);
    return parsedE >= 1 && parsedE <= 3 ? parsedE : 1;
  })
  const [side, setSide] = useState<number>(() => {
    const parsedE = parseInt(s || '1', 10);
    return parsedE >= 1 && parsedE <= 3 ? parsedE : 1;
  })
  const [firstname, setFirstName ] = useState<string>(()=>fn ? fn : '')
  const [lastname, setLastName ] = useState<string>(()=>ln ? ln : '')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);


  const handleRegister = async () => {
    if(!email || !password){
      alert('Upisite svoj email i lozinku')
      return
    }
    if(!validateEmail(email)){
      alert('Upisite validan email')
      return
    }
    setLoading(true)
    try {
     const user =  await signUp(email, password, firstname, lastname, reason, experience, side)
     if (user) {
      router.push('/home')
    }
    } catch (error) {
      alert('Greška prilikom registracije');
    }finally{
      setLoading(false)
    }
  }

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

  interface Option {
    id: number;
    title: string;
    icon?: any; // Opcionalni prop za ikone
  }

  interface Question {
    id: number;
    options: Option[];
  }

  const content: Question[] = [
    {
      id: 2,
      options: [
        { id: 1, title: 'Iz zabave', icon: require('../assets/images/ikone/Confetti.png') },
        { id: 2, title: 'Trudim se biti produktivan', icon: require('../assets/images/ikone/Brain.png') },
        { id: 3, title: 'Da podržim svoje obrazovanje', icon: require('../assets/images/ikone/Book.png') },
        { id: 4, title: 'Kako bih poboljšao svoju karijeru', icon: require('../assets/images/ikone/Suitcase.png') },
        { id: 5, title: 'Drugo', icon: require('../assets/images/ikone/View More.png') }
      ]
    },
    {
      id: 3,
      options: [
        { id: 1, title: 'Nikako - tek započinjem pustolovinu', icon: require('../assets/images/ikone/Document.png') },
        { id: 2, title: 'Malo - radio sam male projekte', icon: require('../assets/images/ikone/Laptop Coding.png') },
        { id: 3, title: 'Puno - radio sam na većim projektima', icon: require('../assets/images/ikone/Hacker.png') }
      ]
    },

    {
      id: 4,
      options: [
        { id: 1, title: 'Zanimaju me web sučelja', icon: require('../assets/images/ikone/Imac.png') },
        { id: 2, title: 'Zanima me razvoj sustava', icon: require('../assets/images/ikone/TreeStructure.png') },
        { id: 3, title: 'Zanima me oboje', icon: require('../assets/images/ikone/DatabaseAdministrator.png') }
      ]
    }
  ]

 

  const handleBack = () => {
    if (Number(q) === 0) {
      router.back()
    } else {
     router.back()
    }
  }

  const handleNext = () => {

    if(Number(q)===5){
      if(!firstname || !lastname){
        alert('Upisite svoje ime i prezime')
        return
      }
    }

    const br = Number(q) + 1
    router.push({
      pathname: '/auth/register',
      params: { q: br.toString(), r: reason.toString(), e: experience.toString(), s: side.toString(), fn: firstname, ln: lastname},
    })
  }

  const validateEmail = (email: string): boolean => {
    // Regularni izraz za validaciju email adrese
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleReason = (id : number) => {
    setReason(id)
  }

  const handleExperience = (id : number) => {
    setExperience(id)
  }

  const handleSide = (id : number) => {
    setSide(id)
  }

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

  if (Number(q) === 0) {
    return <MsgPage content='Zdravo, ja sam Pingo!' variant={colorScheme === 'light' ? 'light' : 'dark'} back={handleBack} next={handleNext} onLayoutRootView={onLayoutRootView} />;
  } else if (Number(q) === 1) {
    return <MsgPage content='Brzinski ću te pitati 4 pitanja!' variant={colorScheme === 'light' ? 'light' : 'dark'} back={handleBack} next={handleNext} onLayoutRootView={onLayoutRootView} />;
  } else if (Number(q) === 2) {
    return <OptPage content='Zašto učiš programiranje?' status={(Number(q)-1)*20} variant={colorScheme === 'light' ? 'light' : 'dark'} back={handleBack} next={handleNext} onLayoutRootView={onLayoutRootView} handleChg={handleReason} val={reason} options={content.find(el => el.id === Number(q))?.options || []} />
  } else if (Number(q) === 3) {
    return <OptPage content='Koliko imaš iskustva?' status={(Number(q)-1)*20} variant={colorScheme === 'light' ? 'light' : 'dark'} back={handleBack} next={handleNext} onLayoutRootView={onLayoutRootView} handleChg={handleExperience} val={experience} options={content.find(el => el.id === Number(q))?.options || []} />
  } else if (Number(q) === 4) {
    return <OptPage content='Koja strana programiranja te najviše privlači?' status={(Number(q)-1)*20} variant={colorScheme === 'light' ? 'light' : 'dark'} back={handleBack} next={handleNext} onLayoutRootView={onLayoutRootView} handleChg={handleSide} val={side} options={content.find(el => el.id === Number(q))?.options || []} />
  }else if (Number(q) === 5) {
    return (<View style={background}>
      <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{display: 'flex', gap: 16}}>
          <View style={{ gap: 24, display: 'flex', alignItems: 'center', flexDirection: 'row', width:'100%'}}>
              <TouchableOpacity onPress={handleBack} >
                <ArrowLeft style={{ cursor: 'pointer' }} color={colorScheme === 'light' ? '#AFAFAF' : '#74797A'} />
              </TouchableOpacity>
              <Statusbar variant={colorScheme === 'dark' ? 'dark' : 'light'} value={80}/>
              </View>
            <View style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexDirection: 'row', marginTop: 4 }}>
              <Image
                source={require('../assets/images/pingo-standing.png')}
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
              }}>Kako se zoves?</Text>
            </View>

              <View style={{display: 'flex', flexDirection: 'column'}}>
              <TextInput
                style={{borderColor: colorScheme === 'light' ? '#E5E5E5' : '#37464F', color: colorScheme === 'light' ? '#000' : '#fff', borderWidth: 2, borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingHorizontal: 21, paddingVertical: 16, borderBottomWidth: 1}}
                placeholder="Ime"
                placeholderTextColor="#888"
                value={firstname}
                onChangeText={setFirstName}
              />
               <TextInput
                style={{borderColor: colorScheme === 'light' ? '#E5E5E5' : '#37464F', color: colorScheme === 'light' ? '#000' : '#fff', borderWidth: 2, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, paddingHorizontal: 21, paddingVertical: 16, borderTopWidth: 1}}
                placeholder="Prezime"
                placeholderTextColor="#888"
                value={lastname}
                onChangeText={setLastName}
              />
              </View>
          
          </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Button
                title='Nastavi'
                textColor={colors.light.background}
                onPress={handleNext}
              />
            </View>
          </View>
        
      </SafeAreaView>
    </View>
    );
  } else if (Number(q) === 6) {
    return (<View style={background}>
      <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{display: 'flex', gap: 16}}>
          <View style={{ gap: 24, display: 'flex', alignItems: 'center', flexDirection: 'row', width:'100%'}}>
              <TouchableOpacity onPress={handleBack} >
                <ArrowLeft style={{ cursor: 'pointer' }} color={colorScheme === 'light' ? '#AFAFAF' : '#74797A'} />
              </TouchableOpacity>
              <Statusbar variant={colorScheme === 'dark' ? 'dark' : 'light'} value={100}/>
              </View>
            <View style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexDirection: 'row', marginTop: 4 }}>
              <Image
                source={require('../assets/images/pingo-standing.png')}
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
              }}>Upiši svoj email!</Text>
            </View>

              <View style={{display: 'flex', flexDirection: 'column'}}>
              <TextInput
                style={{borderColor: colorScheme === 'light' ? '#E5E5E5' : '#37464F', color: colorScheme === 'light' ? '#000' : '#fff',  borderWidth: 2, borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingHorizontal: 21, paddingVertical: 16, borderBottomWidth: 1}}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
               
              />
               <TextInput
                style={{borderColor: colorScheme === 'light' ? '#E5E5E5' : '#37464F', color: colorScheme === 'light' ? '#000' : '#fff',  borderWidth: 2, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, paddingHorizontal: 21, paddingVertical: 16, borderTopWidth: 1}}
                placeholder="Lozinka"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              </View>
          
          </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Button
                title={loading ? "Ucitavanje..." : "Nastavi"}
                textColor={colors.light.background}
                onPress={handleRegister/*handleSignUp*/}
              />
              </View>
          </View>
        
      </SafeAreaView>
    </View>
    );
  } 

}
