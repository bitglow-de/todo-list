import React from 'react';
import { Stack } from 'expo-router';
import { ListProvider } from '../state/listContext';
import ThemeProvider from '../state/themeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ListProvider>
        <Stack screenOptions={{ headerTitle: '' }} />
      </ListProvider>
    </ThemeProvider>
  );
}
