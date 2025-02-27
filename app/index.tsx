import { Redirect } from 'expo-router';
import { Text, View,  StyleSheet } from 'react-native';

export default function Index() {
  if (false) {
    return <Redirect href="/home" />;
  }else{
    return <Redirect href="/auth" />;
  }
}

