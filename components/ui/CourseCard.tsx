import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { ChevronRight } from 'lucide-react-native';

interface CourseCardProps {
  variant: 'light' | 'dark';
  title: string;
  description: string;
  image: ImageSourcePropType;
  onPress: () => void;
  duration?: string;
  lessons?: number;
}

export default function CourseCard({
  variant,
  title,
  description,
  image,
  onPress,
  duration = "4 sedmice",
  lessons = 12
}: CourseCardProps) {
  const isDark = variant === 'dark';

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isDark ? styles.containerDark : styles.containerLight
      ]} 
      onPress={onPress}
    >
      <Image
        source={image}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.content}>
        <Text style={[
          styles.title,
          isDark ? styles.textDark : styles.textLight
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.description,
          isDark ? styles.descriptionDark : styles.descriptionLight
        ]}>
          {description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.stats}>
            <Text style={[
              styles.statsText,
              isDark ? styles.textDark : styles.textLight
            ]}>
              {duration} • {lessons} lekcija
            </Text>
          </View>
          <ChevronRight 
            size={20} 
            color={isDark ? '#F1F7FB' : '#4B4B4B'} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  containerLight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  containerDark: {
    backgroundColor: '#1E2A31',
    borderWidth: 1,
    borderColor: '#37464F',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#F0F0F0',
  },
  content: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Rubik_600SemiBold',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Rubik_400Regular',
  },
  textLight: {
    color: '#4B4B4B',
  },
  textDark: {
    color: '#F1F7FB',
  },
  descriptionLight: {
    color: '#6B7280',
  },
  descriptionDark: {
    color: '#9CA3AF',
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsText: {
    fontSize: 13,
    fontFamily: 'Rubik_400Regular',
  }
});
