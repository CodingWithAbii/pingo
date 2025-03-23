import { ArrowLeft } from 'lucide-react-native';
import React from 'react'
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Button from './ui/Button';
import { layoutStyles } from '@/constants/layout';
import { colors } from '@/constants/colors';
import Statusbar from './ui/Statusbar';
import Option from './ui/Option';

interface Option {
    id: number;
    title: string;
    icon?: any;
  }

type OptPageProps = ViewProps & {
    variant?: string;
    status: number;
    content: string;
    options: Option[];
    back: () => void;
    next: () => void;
    onLayoutRootView: () => Promise<void>;
    handleChg: (id: number) => void;
    val: number;
  };

function OptPage({variant, status, content, back, next, onLayoutRootView, handleChg, val, options}: OptPageProps) {
  return (
    <View style={variant === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground}>
      <SafeAreaView style={layoutStyles.container} onLayout={onLayoutRootView}>
        <View style={{display: 'flex', justifyContent: 'space-between', height:'100%', width: '100%' }}>
          <View style={{display: 'flex',  width: '100%', gap: 16}}>
            <View style={{ display: 'flex', gap: 24, alignItems: 'center', flexDirection: 'row', width:'100%'}}>
              <TouchableOpacity onPress={back} >
                <ArrowLeft style={{ cursor: 'pointer' }} color={variant === 'light' ? '#AFAFAF' : '#74797A'} />
              </TouchableOpacity>
              <Statusbar variant={variant === 'dark' ? 'dark' : 'light'} value={status}/>
              </View>
            <View style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexDirection: 'row', marginTop: 4 }}>
              <Image
                source={require('../assets/images/pingo-standing.png')}
                style={{ width: 82, height: 85 }}
              />
              <Text style={variant === 'dark' ? {
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
              }}>{content}</Text>
            </View>

            
                <View style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', marginTop: 2 }}>
                  {options.map((option) => (
                    <Option
                      key={option.id} // Obavezno dodati unique key
                      variant={variant === 'light' ? 'light' : 'dark'}
                      icon={option?.icon}
                      active={val===option.id}
                      onPress={()=>handleChg(option.id)}
                    >

                      {option.title}
                    </Option>
                  ))}
                </View>
             
          </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Button
                title='Nastavi'
                textColor={colors.light.background}
                onPress={next}
                disabled={val === 0}
              />
            </View>
          </View>
        
      </SafeAreaView>
    </View>
    
      
  )
}

export default OptPage