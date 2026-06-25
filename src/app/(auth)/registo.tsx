import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';
import { supabase } from '../../services/supabase';

export default function RegistoScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRegisto = async (): Promise<void> => {
    if (!username || !email || !password) {
      Alert.alert('Aviso', 'Por favor, preenche todos os campos.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });

    setLoading(false);
    if (error) {
      Alert.alert('Erro no Registo', error.message);
    } else {
      Alert.alert(
        'Conta Criada!', 
        'Enviámos um link de confirmação para o teu email. Ativa a conta antes de entrar.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login' as any) }]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <View style={styles.container}>
        
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="person-add" size={36} color="#10B981" />
          </View>
          <Text style={styles.brandName}>Criar Conta</Text>
          <Text style={styles.brandSubtitle}>Junta-te a nós e começa a praticar</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome de Utilizador</Text>
            <TextInput style={styles.input} placeholder="Como te queres chamar?" placeholderTextColor="#9CA3AF" value={username} onChangeText={setUsername} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="exemplo@email.com" placeholderTextColor="#9CA3AF" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={styles.passwordInput} placeholder="Mínimo 6 caracteres" placeholderTextColor="#9CA3AF" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={handleRegisto} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'A criar conta...' : 'Criar Conta'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(auth)/login' as any)} style={styles.footerLink}>
          <Text style={styles.footerText}>Já tens uma conta? <Text style={styles.footerTextBold}>Faz Login</Text></Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

// Os estilos são idênticos para manter a consistência visual perfeita
const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 32, marginTop: 40 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E6F4EA', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  brandName: { fontSize: 28, fontWeight: '800', color: '#111827', letterSpacing: -0.5 },
  brandSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4, textAlign: 'center' },
  form: { width: '100%' },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', padding: 14, borderRadius: 12, fontSize: 16, color: '#111827' },
  passwordContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, alignItems: 'center' },
  passwordInput: { flex: 1, padding: 14, fontSize: 16, color: '#111827' },
  eyeIcon: { paddingHorizontal: 14 },
  button: { backgroundColor: '#10B981', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  footerLink: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  footerText: { fontSize: 15, color: '#6B7280' },
  footerTextBold: { color: '#10B981', fontWeight: '700' }
});