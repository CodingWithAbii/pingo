import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const layoutStyles = StyleSheet.create({
  container:{
    maxWidth: 880,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 24,
  },
  darkBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.dark.background
  },
  lightBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.light.background
  },
  text: {
    color: '#fff',
  },
});

// TypeScript tip za stilove
export type LayoutStyles = keyof typeof layoutStyles;