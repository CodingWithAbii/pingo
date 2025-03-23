import { Platform, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const tabBarStyles = StyleSheet.create({
  container: Platform.OS === 'web' ? {
    maxWidth: 880,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
  } : {},
  tabBar: {
    borderTopWidth: 0,
  },
  light: {
    backgroundColor: colors.light.background,
    borderTopColor: '#E5E5E5',
  },
  dark: {
    backgroundColor: colors.dark.background,
    borderTopColor: '#37464F',
  }
}); 