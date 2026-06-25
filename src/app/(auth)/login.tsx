import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';
import { supabase } from '../../services/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Aviso', 'Por favor, preenche todos os campos.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    
    if (error) {
      Alert.alert('Erro no Login', error.message);
    } else {
      router.replace('/(tabs)/home' as any);
    }
  };

  // Funções para os Logins Sociais (Supabase OAuth)
  const handleSocialLogin = async (provider: 'google' | 'apple'): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: 'talkinghands://home', // Configuração do deep link da app
      }
    });
    if (error) Alert.alert('Erro', `Não foi possível entrar com o ${provider}.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
      <View style={styles.container}>
        
        {/* LOGO DA APP */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="hand-left" size={40} color="#10B981" />
          </View>
          <Text style={styles.brandName}>Talking Hands</Text>
          <Text style={styles.brandSubtitle}>Aprende Língua Gestual de forma simples</Text>
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
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
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.passwordInput} 
                placeholder="Introduz a tua password" 
                placeholderTextColor="#9CA3AF"
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry={!showPassword} 
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ESQUECI-ME DA PASSWORD */}
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/recuperar' as any)} 
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>Esqueci-me da password</Text>
          </TouchableOpacity>
          
          {/* BOTÃO PRINCIPAL */}
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'A entrar...' : 'Entrar'}</Text>
          </TouchableOpacity>
        </View>

        {/* DIVIDER */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* BOTÃO GOOGLE (Único) */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButtonSingle} onPress={() => handleSocialLogin('google')}>
            <Ionicons name="logo-google" size={22} color="#EA4335" />
            <Text style={styles.socialButtonText}>Entrar com o Google</Text>
          </TouchableOpacity>
        </View>

        {/* LINK PARA REGISTO */}
        <TouchableOpacity onPress={() => router.push('/(auth)/registo' as any)} style={styles.footerLink}>
          <Text style={styles.footerText}>Ainda não tens conta? <Text style={styles.footerTextBold}>Regista-te</Text></Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

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
  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { color: '#10B981', fontSize: 14, fontWeight: '600' },
  button: { backgroundColor: '#10B981', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { marginHorizontal: 12, color: '#9CA3AF', fontSize: 14 },
  socialContainer: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  socialButtonSingle: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', padding: 14, borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 8, width: '100%' },
  socialButtonText: { fontSize: 15, fontWeight: '600', color: '#374151' },
  footerLink: { alignItems: 'center', marginBottom: 20 },
  footerText: { fontSize: 15, color: '#6B7280' },
  footerTextBold: { color: '#10B981', fontWeight: '700' }
});