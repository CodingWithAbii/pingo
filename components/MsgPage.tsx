import { ArrowLeft } from 'lucide-react-native';
import React from 'react'
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chat from './ui/Chat';
import { Image } from 'expo-image';
import Button from './ui/Button';
import { layoutStyles } from '@/constants/layout';
import { colors } from '@/constants/colors';
import Statusbar from './ui/Statusbar';

type MsgPageProps = ViewProps & {
    variant?: string;
    status?: number;
    content: string;
    back: any;
    next: any;
    onLayoutRootView: any;
    disabled?: boolean;
  };

function MsgPage({variant, status, content, back, next, onLayoutRootView, disabled = false}: MsgPageProps) {
  return (
    <View style={variant === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground}>
        <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', gap: 24, alignItems: 'center', flexDirection: 'row', width:'100%'}}>
              <TouchableOpacity onPress={back} >
                <ArrowLeft style={{ cursor: 'pointer' }} color={variant === 'light' ? '#AFAFAF' : '#74797A'} />
              </TouchableOpacity>
              {status && <Statusbar variant={variant === 'dark' ? 'dark' : 'light'} value={status}/>}
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
  
              <Chat variant={variant === 'light' ? 'light' : 'dark'}>{content}</Chat>
              <Image
                source={require('../assets/images/pingo-waving.png')}
                style={{ width: 132, height: 137 }}
              />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Button
                title='Nastavi'
                textColor={colors.light.background}
                onPress={next}
                disabled={disabled}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
      
  )
}

export default MsgPage