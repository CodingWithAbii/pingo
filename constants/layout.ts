import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  container: {
    maxWidth: 1280,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  text: {
    color: '#fff',
  },
});

// TypeScript tip za stilove
export type LayoutStyles = keyof typeof layoutStyles;