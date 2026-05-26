import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import { createNewPassword, loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

export default function CreateNewPasswordScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function validateForm(): string | null {
    if (!email || !code || !password || !confirmPassword) return 'All fields are required.';
    if (!email.includes('@')) return 'Enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  async function fectNewPassword() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError('')
    try {
      await createNewPassword({ code, email, password, password_confirmation: confirmPassword });
      const loginData = await loginUser({ email, password });
      if (loginData.token) {
        await login(loginData.token); 
      } else {
        throw new Error('Login failed after reset. Please log in manually.');
      }
    } catch (err: any) {
      setError(err?.message || 'Reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.heading}>Create New Password</Text>
          <Text style={styles.subtitle}>Enter your new password</Text>

          <View style={styles.form}>
            <AuthInput
              label='Confirm Code'
              value={code}
              onChangeText={setCode}
            />
            <AuthInput
              label="Email Address"
              placeholder="Tiffanyjearsey@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <AuthInput
              label="New Password"
              placeholder="••••••••••••••••••••••"
              value={password}
              onChangeText={setPassword}
              secureToggle
            />
            <AuthInput
              label="Confirm Password"
              placeholder="••••••••••••••••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureToggle
            />
          </View>

          <AuthButton title={loading ? 'Confirm' : 'Reseting Password..'} onPress={() => fectNewPassword()} />
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#171121' },
  backBtn: {
    margin: 20,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2D2739',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { color: '#FFFFFF', fontSize: 22, lineHeight: 26 },
  content: { paddingHorizontal: 24, paddingTop: 24 },
  heading: { color: '#FFFFFF', fontSize: 26, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#A0A0A0', fontSize: 14, marginBottom: 40 },
  form: { marginBottom: 32 },
});
