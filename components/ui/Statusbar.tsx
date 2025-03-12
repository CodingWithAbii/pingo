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
    <View style={styles.darkContainer}>
      <View></View>
    </View>
  )
};

const styles = StyleSheet.create({
  darkContainer: {
    display: 'flex',
    height: 12,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#37464F',
    paddingRight: 340
  },
  lightContainer: {
    display: 'flex',
    height: 56,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#E5E5E5'
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

export default Statusbar;
