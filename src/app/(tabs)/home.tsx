import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../services/supabase';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      // Termina a sessão atual no Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }

      // Volta a mandar o utilizador para o ecrã de Login
      router.replace('/(auth)/login' as any);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível terminar sessão.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulos de Aprendizagem</Text>
      <Text style={styles.subtitle}>Em breve, os teus níveis vão aparecer aqui!</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Terminar Sessão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40, textAlign: 'center' },
  logoutButton: { backgroundColor: '#F44336', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});