import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AuthButton from '../../components/AuthButton'
import AuthInput from '../../components/AuthInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
  const authNavigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.greeting}>Hi, Tiffany</Text>
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

          <AuthButton title="Login" onPress={() => authNavigation.navigate('HomeTap')} style={styles.btn} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  arrowColor:{
    justifyContent:'center',
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
    marginBottom: 36,
    marginTop: 8,
    textAlign: 'center',
  },

  form: { marginBottom: 24 },
  forgotText: { color: '#007AFF', textAlign: 'right', fontSize: 13, marginTop: 8 },
  btn: { marginTop: 8 },
});
