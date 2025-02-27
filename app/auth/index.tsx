import { Link } from 'expo-router';
import { Text, View,  StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Link style={styles.text} href="/auth/register">
      Create Account</Link>
      <Link style={styles.text} href="/auth/login">Login</Link>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
      gap:'22px'
    },
    text: {
      color: '#fff',
    },
  });