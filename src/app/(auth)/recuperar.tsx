import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';
import { supabase } from '../../services/supabase';

export default function RecuperarScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRecuperar = async (): Promise<void> => {
    if (!email) {
      Alert.alert('Aviso', 'Por favor, introduz o teu email.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'talkinghands://redefinir-password',
    });
    setLoading(false);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert(
        'Email Enviado', 
        'Se este email estiver registado, receberás um link para redefinir a tua password.',
        [{ text: 'Voltar ao Login', onPress: () => router.replace('/(auth)/login' as any) }]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <View style={styles.container}>
        
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="key-outline" size={36} color="#10B981" />
          </View>
          <Text style={styles.brandName}>Recuperar Password</Text>
          <Text style={styles.brandSubtitle}>Introduz o teu email para reaveres o acesso</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email da Conta</Text>
            <TextInput 
              style={styles.input} 
              placeholder="exemplo@email.com" 
              placeholderTextColor="#9CA3AF" 
              value={email} 
              onChangeText={setEmail} 
              autoCapitalize="none" 
              keyboardType="email-address" 
            />
          </View>

          <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={handleRecuperar} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'A enviar...' : 'Enviar Link de Recuperação'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.replace('/(auth)/login' as any)} style={styles.footerLink}>
          <Text style={styles.footerTextBold}>Voltar ao Login</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E6F4EA', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  brandName: { fontSize: 26, fontWeight: '800', color: '#111827', letterSpacing: -0.5 },
  brandSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4, textAlign: 'center' },
  form: { width: '100%' },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', padding: 14, borderRadius: 12, fontSize: 16, color: '#111827' },
  button: { backgroundColor: '#10B981', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  footerLink: { alignItems: 'center', marginTop: 40 },
  footerTextBold: { color: '#10B981', fontWeight: '700', fontSize: 15 }
});