import React from 'react';
import { useColorScheme } from 'react-native';
import {
  ThemeProvider as NavigationThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import config from '../tamagui.config';
import { TamaguiProvider, Theme } from 'tamagui';
import { useFonts } from 'expo-font';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationThemeProvider
      value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
    >
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
          {children}
        </Theme>
      </TamaguiProvider>
    </NavigationThemeProvider>
  );
}
