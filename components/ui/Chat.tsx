import React from 'react';
import {
  Text,
  StyleSheet,
  ViewProps,
  View
} from 'react-native';
import { colors, ColorVariants } from '../../constants/colors';

type ChatProps = ViewProps & {
  variant?: string;
};

const Chat = ({ children, variant }: ChatProps) => {

  return (
    <View style={styles.container}>
      <Text style={variant === 'dark' ? styles.dark : styles.light }>{children}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  dark: {
    borderColor: '#37464F',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 15,
    color: '#F1F7FB',
  },

  light: {
    borderColor: '#E5E5E5',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 15,
    color: '#4B4B4B'
  }
});

export default Chat;
