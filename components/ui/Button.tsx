import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import { colors, ColorVariants } from '../../constants/colors';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ColorVariants;
  title: string;
  textStyle?: StyleProp<TextStyle>;
  textColor?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  title,
  onPress,
  style,
  textStyle,
  textColor = '#fff',
  disabled = false,
  ...props
}) => {
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
    style,
    disabled && styles.buttonDisabled,
  ];

  const combinedTextStyle: StyleProp<TextStyle> = [
    styles.text,
    {color: textColor, fontFamily: 'Rubik_800ExtraBold' },
    textStyle,
    disabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
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
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.7,
    borderColor: '#999999',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase'
  },
  textDisabled: {
    color: '#666666',
  }
});

export default Button;