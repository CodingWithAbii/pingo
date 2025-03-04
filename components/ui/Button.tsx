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
  textColor = colors.background,
  ...props
}) => {
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    variant === 'primary' ? {backgroundColor: colors.primary, padding: 16} : {backgroundColor: 'transparent', borderColor: colors.primary, borderWidth: 2, padding: 15,},
    style,
  ];

  const combinedTextStyle: StyleProp<TextStyle> = [
    styles.text,
    { color: textColor, fontFamily: 'Rubik_800ExtraBold' },
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
    borderRadius: 12,
    alignItems: 'center',
    width: '100%'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase'
  },
});

export default Button;