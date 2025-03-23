import { Tabs } from 'expo-router';
import { useColorScheme, View } from 'react-native';
import { BookOpen, Code, Trophy, User } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { tabBarStyles } from '@/components/ui/TabBarWrapper';

export default function MainLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: isDark ? colors.dark.background : colors.light.background 
    }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            tabBarStyles.container,
            tabBarStyles.tabBar,
            isDark ? tabBarStyles.dark : tabBarStyles.light,
          ],
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: isDark ? '#74797A' : '#AFAFAF',
          tabBarLabelStyle: {
            fontFamily: 'Rubik_500Medium',
          },
        }}
      >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Učenje',
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="practice/index"
        options={{
          title: 'Vježbaj',
          tabBarIcon: ({ color }) => <Code size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard/index"
        options={{
          title: 'Poredak',
          tabBarIcon: ({ color }) => <Trophy size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
    </View>
  );
} 