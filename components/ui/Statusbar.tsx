import React from 'react';

import {
  Text,
  StyleSheet,
  ViewProps,
  View
} from 'react-native';
import { colors, ColorVariants } from '../../constants/colors';

type StatusbarProps = ViewProps & {
  variant?: string;
  value: number;
};

const Statusbar = ({ value, variant }: StatusbarProps) => {
  return (
    <Text style={variant === 'dark' ? styles.darkContainer: styles.lightContainer}>
      <Text style={{
        display: 'flex',
        width: '20%',
        borderRadius: 12,
        height: 14,
        backgroundColor: colors.secondary,
        paddingLeft: 8,
        paddingRight: 12,
        paddingTop: 4,
        zIndex: 50
      }}>
        <Text style={{
        display: 'flex',
        width: '100%',
        borderRadius: 12,
        height: 4,
        backgroundColor: colors.primary,
        zIndex: 40
      }}></Text>
        </Text>    
    </Text>
  )
};

const styles = StyleSheet.create({
  darkContainer: {
    display: 'flex',
    height: 14,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#37464F',
    overflow: 'hidden'
  },

  lightContainer: {
    display: 'flex',
    height: 14,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#E5E5E5'
  },
});

export default Statusbar;
