import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Flame } from 'lucide-react-native'; // Ikona vatre
import { colors } from '@/constants/colors';

interface HeaderProps {
  points: number;
}

const Header: React.FC<HeaderProps> = ({ points }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <Text style={{ color: colors.primary, fontFamily: 'Rubik_700Bold', fontSize: 20 }}>PINGO</Text>
      <View style={styles.actionsContainer}>
        <View style={styles.pointsContainer}>
          <Flame size={20} color={isDark ? '#F1F7FB' : '#162227'} />
          <Text style={[styles.pointsText, { color: isDark ? '#F1F7FB' : '#162227' }]}>100</Text>
        
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  containerLight: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E5E5',
  },
  containerDark: {
    backgroundColor: '#131F24',
    borderBottomColor: '#37464F',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Rubik_500Medium',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'Rubik_500Medium',
  },
});

export default Header; 