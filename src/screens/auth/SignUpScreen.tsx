import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';



export default function SignUpScreen() {
  const authNavigation = useNavigation();
  const { login } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function validateForm(): string | null {
    if (!firstName || !lastName || !email || !password || !confirmPassword) return 'All fields are required.';
    if (!email.includes('@')) return 'Enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    if (!agreed) return 'You must agree to the Terms & Conditions.';
    return null;
  }
  async function fectRegister() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await registerUser({ first_name: firstName, last_name: lastName, email: email, password: password, password_confirmation: confirmPassword });
      if (!data.token) throw new Error('Registration failed. Please try again.');
      await login(data.token); // skip email verification in dev
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled">
        
      <View style={styles.content}>
        <Text style={styles.heading}>Let's get started</Text>
        <Text style={styles.subtitle}>The latest movies and series are here</Text>
        <View style={styles.form}>
          <AuthInput
            label="First Name"
            placeholder="Enter firstname"
            value={firstName}
            onChangeText={setFirstName}
          />
          <AuthInput
            label="Last Name"
            placeholder="Enter lastname"
            value={lastName}
            onChangeText={setLastName}
          />
          <AuthInput
            label="Email Address"
            placeholder="example@gmail.com"
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
          <AuthInput
            label="Confirm Password"
            placeholder="••••••••••••••••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureToggle
          />

          <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkLabel}>
              I agree to the{' '}
              <Text style={styles.link}>Terms and Services</Text>
              {'\n'}and <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={{ color: '#FF5F5F', marginBottom: 12, alignSelf: 'center' }}>{error}</Text> : null}
        <AuthButton
          title={loading ? 'Sing Up...' : 'SignUp'}
          onPress={fectRegister}
        />
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#171121' },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2C2C3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { color: '#FFFFFF', fontSize: 22, lineHeight: 26 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 15 },
  heading: { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginBottom: 8, alignSelf: 'center' },
  subtitle: { color: '#A0A0A0', fontSize: 14, lineHeight: 21, marginBottom: 32, alignSelf: 'center' },
  form: { marginBottom: 24 },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 8, gap: 12 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#A0A0A0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: { borderColor: '#FF5F5F', backgroundColor: '#FF5F5F' },
  checkmark: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  checkLabel: { color: '#A0A0A0', fontSize: 13, lineHeight: 20, flex: 1 },
  link: { color: '#FF5F5F', fontWeight: '600' },
});

