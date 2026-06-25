import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* O ecrã de loading inicial */}
      <Stack.Screen name="index" />
      
      {/* O grupo de Login/Registo */}
      <Stack.Screen name="(auth)" />
      
      {/* O grupo principal com a barra inferior */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}