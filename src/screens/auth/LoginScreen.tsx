import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AuthButton from '../../components/AuthButton'
import AuthInput from '../../components/AuthInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../network/services/authService';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const authNavigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fectLogin() {
    if (!email || !password) { setError('Email and password are required.'); return; }
    setLoading(true);
    setError('');
    try {
      const data = await loginUser({ email, password });
      if (data.token) {
        await login(data.token); 
      } else {
        setError('Login failed. No token received.');
      }
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.greeting}>Welcome to Move App</Text>
          <Text style={styles.subtitle}>Welcome back! Please enter{'\n'}your details.</Text>

          <View style={styles.form}>
            <AuthInput
              label="Email Address"
              placeholder="Tiffanyjearsey@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <AuthInput
              label="Password"
              placeholder="••••••••••••••••••••••"
              value={password}
              onChangeText={setPassword}
              secureToggle
            />
            <TouchableOpacity onPress={() => authNavigation.navigate('ResetPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={{ color: '#FF5F5F', marginBottom: 12, textAlign: 'center' }}>{error}</Text> : null}
          <AuthButton title={loading ? 'Logging in...' : 'Login'} onPress={fectLogin} style={styles.btn} />
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  arrowColor: {
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  container: { flex: 1, backgroundColor: '#171121' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12 },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    alignItems: 'center',
  },
  headerSpacer: { width: 36 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  greeting: {
    marginTop: 24,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
    alignSelf: 'center',

  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 21,
    padding: 2,
    marginBottom: 36,
    marginTop: 8,
    textAlign: 'center',
  },

  form: { marginBottom: 24 },
  forgotText: { color: '#007AFF', textAlign: 'right', fontSize: 13, marginTop: 8 },
  btn: { marginTop: 8 },
});
