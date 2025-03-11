import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacityProps,
} from 'react-native';
import { colors, ColorVariants } from '../../constants/colors';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ColorVariants;
  title: string;
  textStyle?: StyleProp<TextStyle>;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  title,
  onPress,
  style,
  textStyle,
  textColor,
  ...props
}) => {
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
    style,
  ];

  const combinedTextStyle: StyleProp<TextStyle> = [
    styles.text,
    {color: textColor, fontFamily: 'Rubik_800ExtraBold' },
    textStyle,
  ];

  return (
    <TouchableOpacity
    
      style={buttonStyle}
      onPress={onPress}
      {...props}
    >
      <Text style={combinedTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 12,
    borderBottomWidth: 4,
    alignItems: 'center',
    width: '100%'
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRightWidth: 1,
    borderLeftWidth: 1, 
    borderColor: colors.secondary
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase'
  },
});

export default Button;