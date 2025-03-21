import { View, Text } from 'react-native';
import { useAuth } from '@/components/providers/AuthProvider';
import { layoutStyles } from '@/constants/layout';
import { useColorScheme } from 'react-native';

export default function Home() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;

  return (
    <View style={background}>
      <Text>Dobrodošli, {user?.email}</Text>
    </View>
  );
}
