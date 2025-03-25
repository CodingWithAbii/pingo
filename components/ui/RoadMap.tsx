import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { Play, Lock } from 'lucide-react-native';

interface RoadMapItemProps {
  title: string;
  isLocked: boolean;
  isActive: boolean;
  onPress: () => void;
  position: 'start' | 'center' | 'end';
}

const RoadMapItem: React.FC<RoadMapItemProps> = ({ title, isLocked, isActive, onPress, position }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[
      styles.itemWrapper,
      styles[`position${position}`],
      {alignItems: position === 'start' ? 'flex-start' : position === 'center' ? 'center' : 'flex-end'}
    ]}>
      <TouchableOpacity 
        onPress={onPress}
        style={[
          styles.itemContainer,
          isDark ? styles.itemContainerDark : styles.itemContainerLight,
          isActive && (isDark ? styles.activeItemDark : styles.activeItemLight)
        ]}
      >
        {isLocked ? (
          <Lock size={32} color={isDark ? '#37464F' : '#E5E5E5'} />
        ) : (
          <Play size={32} color={isDark ? '#F1F7FB' : '#162227'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

interface RoadMapProps {
  lessons: Array<{
    title: string;
    isLocked: boolean;
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
        {/* Linije za povezivanje */}

        
        {/* Elementi mape */}
        <RoadMapItem
          title="Uvod"
          isLocked={false}
          isActive={currentLesson === 0}
          onPress={() => onLessonPress(0)}
          position="center"
        />
        <RoadMapItem
          title="Lekcija 1"
          isLocked={currentLesson < 1}
          isActive={currentLesson === 1}
          onPress={() => onLessonPress(1)}
          position="end"
        />
        <RoadMapItem
          title="Lekcija 2"
          isLocked={currentLesson < 2}
          isActive={currentLesson === 2}
          onPress={() => onLessonPress(2)}
          position="center"
        />
        <RoadMapItem
          title="Lekcija 2"
          isLocked={currentLesson < 2}
          isActive={currentLesson === 2}
          onPress={() => onLessonPress(2)}
          position="start"
        />
        <RoadMapItem
          title="Lekcija 2"
          isLocked={currentLesson < 2}
          isActive={currentLesson === 2}
          onPress={() => onLessonPress(2)}
          position="center"
        />
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
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  itemWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  positionstart: {
    top: 0,
    
  },
  'positioncenter': {
 
  },
  'positionend': {
  },
  itemContainer: {
    width: 100,
    height: 100,
    borderRadius: 22,
    borderWidth: 4,
    borderBottomWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainerLight: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E5E5E5',
  },
  itemContainerDark: {
    backgroundColor: '#131F24',
    borderColor: '#37464F',
  },
  activeItemLight: {
    backgroundColor: '#FFFFFD',
    
  },
  activeItemDark: {
    borderColor: '#F1F7FB',
  },
  verticalLine: {
    position: 'absolute',
    width: 2,
    height: '100%',
    left: '50%',
    transform: [{ translateX: -1 }],
  },
  horizontalLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    top: '33%',
  },
  lineLight: {
    backgroundColor: '#E5E5E5',
  },
  lineDark: {
    backgroundColor: '#37464F',
  },
});

export default RoadMap; 