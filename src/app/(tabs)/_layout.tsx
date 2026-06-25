import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#4CAF50', // A tua cor verde principal
        headerTitleAlign: 'center',
    }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Início',
          tabBarLabel: 'Início',
          // Mais tarde vamos adicionar ícones aqui!
        }} 
      />
      <Tabs.Screen 
        name="gestuario" 
        options={{ 
          title: 'Gestuário',
          tabBarLabel: 'Gestuário' 
        }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: 'Perfil',
          tabBarLabel: 'Perfil' 
        }} 
      />
    </Tabs>
  );
}