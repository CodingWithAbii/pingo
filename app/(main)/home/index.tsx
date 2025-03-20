import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Button title='Root' onPress={()=>router.replace('/')} />
      <Button title='Registracija' onPress={()=>router.replace('/auth')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
