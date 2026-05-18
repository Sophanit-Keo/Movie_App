import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';


export default function SignUpScreen() {
  const authNavigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Let's get started</Text>
        <Text style={styles.subtitle}>The latest movies and series{'\n'}are here</Text>

        <View style={styles.form}>
          <AuthInput
            label="Full Name"
            placeholder="Tiffany"
            value={name}
            onChangeText={setName}
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
            label="Password"
            placeholder="••••••••••••••••••••••"
            value={password}
            onChangeText={setPassword}
            secureToggle
          />
          <AuthInput
            label="Confirm Password"
            placeholder="••••••••••••••••••••••"
            value={password}
            secureToggle
            />

          <TouchableOpacity style={styles.checkRow} onPress={()=> setAgreed(!agreed)}>
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

        <AuthButton
          title="Sign Up"
          onPress={() => authNavigation.navigate("Verification", { email })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#171121' },
  header: {
    flexDirection: 'row',
    marginRight: -40,
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 12 
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2C2C3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { color: '#FFFFFF', fontSize: 22, lineHeight: 26 },
  headerTitle: { flex: 1, color: '#FFFFFF', fontSize: 25, fontWeight: '600', textAlign: 'center' },
  headerSpacer: { width: 36 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 36 },
  heading: { color: '#FFFFFF', fontSize: 26, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#A0A0A0', fontSize: 14, lineHeight: 21, marginBottom: 32 },
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
