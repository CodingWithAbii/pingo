import { Redirect } from 'expo-router'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useAuth } from '@/components/providers/AuthProvider'
import { layoutStyles } from '@/constants/layout'
import { useColorScheme } from 'react-native'
import { colors } from '@/constants/colors'

export default function Index() {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();
  const background = colorScheme === 'light' ? layoutStyles.lightBackground : layoutStyles.darkBackground;

  if (loading) {
    return (
      <View style={[background, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Redirect href={user ? '/home' : '/auth'} />;
}
