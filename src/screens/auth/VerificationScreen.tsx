import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '../../components/AuthButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { verifyEmail, resendCode } from '../../network/services/authService';



export default function VerificationScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const authNavigation = useNavigation();
  const route = useRoute<any>();
  const email: string = route.params?.email ? route.params.email : 'example@gmail.com';
  const token: string = route.params?.token ?? '';
  console.log('VerificationScreen received token:', token);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
  const updated = [...code];
  updated[index] = text;
  setCode(updated);
  if (text && index < 5) inputs.current[index + 1]?.focus();
};


  async function handleVerify() {
    const otp = code.join(''); 
    if (otp.length < 6) { setError('Please enter the 6-digit code.'); return; }
    setLoading(true);
    setError('');
    try {
      await verifyEmail({ code: otp }, token);
      authNavigation.navigate('Login');
    } catch (err: any) {
      console.log('verify error:', err);
      setError(err?.message || err?.error || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  async function handleResend() {
    try {
      await resendCode(token);
      setResendTimer(30);
      setCanResend(false);
      setError('');
    } catch (err: any) {
      console.log('resend error:', err);
      setError(err?.message || err?.error || 'Failed to resend code.');
    }
  }

  useEffect(() => {
    if (resendTimer <= 0) { setCanResend(true); return; }
    const timer = setTimeout(() => setResendTimer(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <Text style={styles.heading}>Verifying Your Account</Text>
        <Text style={styles.subtitle}>
         We have just sent you a 6 digit code via your{'\n'}Email:  {''}
          <Text style={styles.emailHighlight}>{email}</Text>
        </Text>

        <View style={styles.otpRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={el => { inputs.current[i] = el; }}
              style={[styles.otpBox, digit ? styles.otpBoxActive : null]}
              value={digit}
              onChangeText={text => handleChange(text.slice(-1), i)}
              keyboardType="number-pad"
              maxLength={1}
              editable={!loading}
            />
          ))}
        </View>

        {error ? <Text style={{ color: '#FF5F5F', marginBottom: 12, textAlign: 'center' }}>{error}</Text> : null}
        <AuthButton
          title={loading ? 'Verifying...' : 'Continue'}
          onPress={handleVerify}
          style={styles.btn}
          loading={loading}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
          <Text style={styles.resendRow}>Didn't receive code? </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resendRow}>Resend in {resendTimer}s</Text>
          )}
        </View>
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
    backgroundColor: '#2C2C3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { color: '#FFFFFF', fontSize: 22, lineHeight: 26 },
  content: { paddingHorizontal: 24, paddingTop: 16 },
  heading: { color: '#FFFFFF', fontSize: 24, fontWeight: '700', marginBottom: 12, alignSelf: 'center' },
  subtitle: { color: '#A0A0A0', fontSize: 14, lineHeight: 22, marginBottom: 40, textAlign: 'center' },
  emailHighlight: { color: '#FFFFFF', fontWeight: '600' },
  otpRow: { flexDirection: 'row', gap: 16, marginBottom: 40 },
  otpBox: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#2C2C3E',
    borderWidth: 1,
    borderColor: '#4A4A5C',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  otpBoxActive: { borderColor: '#FF5F5F' },
  btn: { marginBottom: 24 },
  resendRow: { color: '#A0A0A0', textAlign: 'center', fontSize: 14 },
  resendLink: { color: '#FF5F5F', fontWeight: '600' },
});
