import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, Platform, Animated, Easing } from 'react-native';
import { Play, Lock, Check, Timer } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface RoadMapItemProps {
  title: string;
  isLocked: boolean;
  isActive: boolean;
  isCompleted: boolean;
  progress?: number; // 0-100
  onPress: () => void;
  position: 'start' | 'center' | 'end';
}

const RoadMapItem: React.FC<RoadMapItemProps> = ({ 
  title, 
  isLocked, 
  isActive, 
  isCompleted,
  progress,
  onPress, 
  position 
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      const pulse = Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]);

      Animated.loop(pulse).start();
    } else {
      pulseAnim.setValue(1);
    }

    return () => {
      pulseAnim.stopAnimation();
    };
  }, [isActive]);

  const getIcon = () => {
    if (isLocked) return <Lock size={32} color={isDark ? '#37464F' : '#E5E5E5'} />;
    if (isCompleted) return <Check size={32} strokeWidth={4} color="#fff" />;
    if (progress !== undefined && progress > 0) return null;
    return <Play size={32} color={isDark ? '#F1F7FB' : '#162227'} />;
  };

  return (
    <View style={[styles.itemWrapper, styles[`position${position}`], { alignItems: position === 'start' ? 'flex-start' : position === 'center' ? 'center' : 'flex-end' }]}>
      <View style={styles.itemOuterContainer}>
        {isActive && (
          <Animated.View style={[styles.pulsingBorder, isDark ? styles.pulsingBorderDark : styles.pulsingBorderLight, { transform: [{ scale: pulseAnim }] }]} />
        )}
        <TouchableOpacity 
          onPress={onPress}
          style={[styles.itemContainer, isDark ? styles.itemContainerDark : styles.itemContainerLight, isCompleted && styles.completedContainer]}
        >
          {getIcon()}
          {progress !== undefined && progress > 0 && progress < 100 && !isCompleted && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
              <Text style={styles.progressText}>{progress}%</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface RoadMapProps {
  lessons: Array<{
    title: string;
    isLocked: boolean;
    isCompleted: boolean;
    progress?: number;
  }>;
  currentLesson: number;
  onLessonPress: (index: number) => void;
}

const RoadMap: React.FC<RoadMapProps> = ({ lessons, currentLesson, onLessonPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.roadMapContainer}>
        {lessons.map((lesson, index) => (
          <RoadMapItem
            key={index}
            title={lesson.title}
            isLocked={lesson.isLocked}
            isActive={currentLesson === index}
            isCompleted={lesson.isCompleted}
            progress={lesson.progress}
            onPress={() => onLessonPress(index)}
            position={index % 4 === 0 ? 'center' : index % 4 === 1 ? 'end' : index % 4 === 2 ? 'center' : 'start'}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  roadMapContainer: {
    width: '100%',
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  itemWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  positionstart: {
    top: 0,
  },
  'positioncenter': {},
  'positionend': {},
  itemOuterContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulsingBorder: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 32,
    borderWidth: 4,
    zIndex: -1,
  },
  pulsingBorderLight: {
    borderColor: colors.primary,
  },
  pulsingBorderDark: {
    borderColor: colors.primary,
  },
  itemContainer: {
    width: 100,
    height: 100,
    borderRadius: 22,
    borderWidth: 4,
    borderBottomWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    overflow: 'hidden'
  },
  itemContainerLight: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E5E5E5',
  },
  itemContainerDark: {
    backgroundColor: '#131F24',
    borderColor: '#37464F',
  },
  completedContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.secondary,
  },
  progressContainer: {
    display: 'flex', 
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    opacity: 0.3,
  },
  progressText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
    fontFamily: 'Rubik_500Medium',
    color: colors.primary,
  },
});

export default RoadMap; 