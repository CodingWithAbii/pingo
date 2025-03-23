import { Text, View, StyleSheet, useColorScheme, TouchableOpacity, TextInput } from 'react-native';
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
import Button from '@/components/ui/Button';
import { layoutStyles } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';
import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { signIn } from '@/lib/auth';
import CustomAlert, { showAlert } from '@/components/ui/CustomAlert';

SplashScreen.preventAutoHideAsync();

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [alertState, setAlertState] = useState({
    visible: false,
    title: '',
    message: '',
  });

  const isNextDisabled = () => {
    return !email || !password;
  };

  const handleLogin = async () => {
    if (isNextDisabled()) {
      showAlert('Greška', 'Molimo unesite validne podatke za prijavu', setAlertState);
      return;
    }

    if(!validateEmail(email)){
      showAlert('Greška', 'Molimo unesite validnu email adresu', setAlertState);
      return;
    }
    
    
    setLoading(true);
    try {
      const user = await signIn(email, password);
      if (user) {
        router.replace('/home');
      }
    } catch (error: any) {
      let errorMessage = 'Došlo je do greške prilikom prijave';
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Pogrešan email ili lozinka';
      } else if (error.message?.includes('network')) {
        errorMessage = 'Problem sa internet konekcijom';
      }
      showAlert('Greška', errorMessage, setAlertState);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    // Regularni izraz za validaciju email adrese
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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
    <CustomAlert
      visible={alertState.visible}
      title={alertState.title}
      message={alertState.message}
      onClose={() => setAlertState(prev => ({ ...prev, visible: false }))}
    />
    <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ display: 'flex', gap: 16 }}>
          <View style={{ gap: 24, display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
            <TouchableOpacity onPress={() => router.back()} >
              <ArrowLeft style={{ cursor: 'pointer' }} color={colorScheme === 'light' ? '#AFAFAF' : '#74797A'} />
            </TouchableOpacity>
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
            }}>Dobrodošli nazad! Molimo unesite svoje podatke za prijavu.</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <TextInput
              style={{ borderColor: colorScheme === 'light' ? '#E5E5E5' : '#37464F', color: colorScheme === 'light' ? '#000' : '#fff', borderWidth: 2, borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingHorizontal: 21, paddingVertical: 16, borderBottomWidth: 1 }}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}

            />
            <TextInput
              style={{ borderColor: colorScheme === 'light' ? '#E5E5E5' : '#37464F', color: colorScheme === 'light' ? '#000' : '#fff', borderWidth: 2, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, paddingHorizontal: 21, paddingVertical: 16, borderTopWidth: 1 }}
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
            title={loading ? "Učitavanje..." : "Nastavi"}
            textColor={colors.light.background}
            onPress={handleLogin}
            disabled={loading || isNextDisabled()}
          />
        </View>
      </View>

    </SafeAreaView>
  </View>
  );
}
