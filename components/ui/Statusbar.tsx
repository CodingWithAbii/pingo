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
    <View style={variant === 'dark' ? styles.darkContainer: styles.lightContainer}>
      <Text style={{
        display: 'flex',
        width: `${value}%`,
        borderRadius: 12,
        height: 14,
        backgroundColor: colors.secondary,
        paddingLeft: 8,
        paddingRight: 12,
        paddingTop: 4,
      }}>
        <View style={{
        display: 'flex',
        width: '100%',
        borderRadius: 12,
        height: 4,
        backgroundColor: colors.primary,
      }}></View>
        </Text>    
    </View>
  )
};

const styles = StyleSheet.create({
  darkContainer: {
    display: 'flex',
    flexGrow: 1,
    height: 14,
    borderRadius: 12,
    backgroundColor: '#37464F',
    overflow: 'hidden'
  },

  lightContainer: {
    display: 'flex',
    height: 14,
    flexGrow: 1,
    borderRadius: 12,
    backgroundColor: '#E5E5E5'
  },
});

export default Statusbar;
