import React from 'react';
import { Stack } from 'expo-router';
import { ListProvider } from '../state/listContext';

export default function RootLayout() {
  return (
    <ListProvider>
      <Stack screenOptions={{ headerTitle: '' }} />
    </ListProvider>
  );
}
