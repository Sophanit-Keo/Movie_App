import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '../../components/AuthButton';
import { useNavigation, useRoute } from '@react-navigation/native';



export default function VerificationScreen() {
  const authNavigation = useNavigation();
  const route = useRoute<any>();
  const email: string = route.params?.email ?? '';
  const [code, setCode] = useState(['', '', '', '','','']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const updated = [...code];
    updated[index] = text;
    setCode(updated);
    if (text && index < 5) inputs.current[index + 1]?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.heading}>Verifying Your Account</Text>
        <Text style={styles.subtitle}>
          We have just sent you 4 digit code via your{'\n'}email{' '}
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
            />
          ))}
        </View>

        <AuthButton title="Continue" onPress={() => authNavigation.navigate('MainTap')} style={styles.btn} />

        <Text style={styles.resendRow}>
          Didn't receive code?{' '}
          <Text style={styles.resendLink}>Resend</Text>
        </Text>
      </View>
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
  heading: { color: '#FFFFFF', fontSize: 24, fontWeight: '700', marginBottom: 12 },
  subtitle: { color: '#A0A0A0', fontSize: 14, lineHeight: 22, marginBottom: 40 },
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
