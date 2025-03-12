import React from 'react';
import {
  Text,
  StyleSheet,
  ViewProps
} from 'react-native';
import { colors, ColorVariants } from '../../constants/colors';

type ChatProps = ViewProps & {
    variant?: string;
  };

const Chat = ({ children, variant }: ChatProps) => {
  

  return <Text style={variant === 'dark' ? styles.dark : styles.light}>{children}</Text>;
};

const styles = StyleSheet.create({
    dark: {
        borderColor: '#37464F',
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    light: {

    }
 });

export default Chat;