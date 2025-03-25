import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Flame } from 'lucide-react-native'; // Ikona vatre
import { colors } from '@/constants/colors';

interface HeaderProps {
  points: number;
  onShopPress: () => void;
  onSettingsPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ points, onShopPress, onSettingsPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <View style={styles.pointsContainer}>
        <Flame size={24} color={isDark ? '#F1F7FB' : '#162227'} />
        <Text style={[styles.pointsText, { color: isDark ? '#F1F7FB' : '#162227' }]}>
          {points} Poena
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onShopPress}>
          <Text style={[styles.actionText, { color: isDark ? '#F1F7FB' : '#162227' }]}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSettingsPress}>
          <Text style={[styles.actionText, { color: isDark ? '#F1F7FB' : '#162227' }]}>Settings</Text>
        </TouchableOpacity>
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
    marginLeft: 8,
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