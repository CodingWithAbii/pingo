import React from 'react';
import {
  Text,
  StyleSheet,
  ViewProps,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { colors, ColorVariants } from '../../constants/colors';
import { Image } from 'expo-image';

type OptionProps = ViewProps & {
  variant?: string;
  icon?: any;
  active?: boolean;
  onPress?: () => void;
};

const Option = ({ children, variant, icon, onPress, active }: OptionProps) => {


  return (
    <TouchableOpacity  onPress={onPress} style={active ? styles.active :( variant === 'dark' ? styles.dark : styles.light)}>
      {icon && (
          <Image 
            source={icon} 
            style ={styles.icon}
          />
        )}
      <Text style={variant === 'dark' ? styles.darkText : styles.lightText}>{children}</Text>

    </TouchableOpacity >
  )
};

const styles = StyleSheet.create({
  icon:{
    width: 40,
    height: 38,
  },
  dark: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    gap: 18,
    borderColor: '#37464F',
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 12,
    borderBottomWidth: 4
  },
  light: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    gap: 18,
    borderColor: '#E5E5E5',
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 12,
    borderBottomWidth: 4
  },
  active: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    gap: 18,
    borderColor: colors.primary,
    backgroundColor: 'rgba(38, 135, 234, 0.2)',
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 12,
    borderBottomWidth: 4
  },
  darkText: {
    color: '#F1F7FB',
    fontFamily: 'Rubik_500Medium',
  },
  lightText:{
    color: '#4B4B4B',
    fontFamily: 'Rubik_500Medium',
  }
});

export default Option;
