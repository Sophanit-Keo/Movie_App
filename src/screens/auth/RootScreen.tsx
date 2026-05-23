import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '../../components/AuthButton';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function RootScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <View style={styles.tv}>
            <View style={styles.antennaLeft} />
            <View style={styles.antennaRight} />
            <View style={styles.screen}>
              <Text style={styles.logoText}>CN</Text>
            </View>
          </View>
          <Text style={styles.brand}>CINEMAX</Text>
          <Text style={styles.subtitle}>
            Enter your registered{'\n'}Email to Sign Up
          </Text>
        </View>

        <View style={styles.actions}>
          <AuthButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />

          <Text style={styles.loginRow}>
            I already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>

          <Text style={styles.orText}>Or Sign up with</Text>

          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]}>
              <AntDesign name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialBtn, styles.appleBtn]}>
              <FontAwesome name="apple" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialBtn, styles.fbBtn]}>
              <FontAwesome name="facebook" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#171121' },
  content: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 42, paddingVertical: 48 ,marginTop: 100},
  logoWrapper: { alignItems: 'center', marginTop: 40 },
  tv: { alignItems: 'center', marginBottom: 24 },
  antennaLeft: {
    position: 'absolute',
    top: -20,
    left: 30,
    width: 3,
    height: 22,
    backgroundColor: '#FF5F5F',
    transform: [{ rotate: '-20deg' }],
  },
  antennaRight: {
    position: 'absolute',
    top: -20,
    right: 30,
    width: 3,
    height: 22,
    backgroundColor: '#FF5F5F',
    transform: [{ rotate: '20deg' }],
  },
  screen: {
    width: 90,
    height: 72,
    borderWidth: 3,
    borderColor: '#FF5F5F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { color: '#FF5F5F', fontSize: 22, fontWeight: '800' },
  brand: { color: '#FFFFFF', fontSize: 32, fontWeight: '800', letterSpacing: 4, marginTop: 16 },
  subtitle: { color: '#A0A0A0', fontSize: 15, textAlign: 'center', marginTop: 10, lineHeight: 22 },
  actions: { gap: 20 },
  loginRow: { color: '#A0A0A0', textAlign: 'center', fontSize: 14 },
  loginLink: { color: '#FF5F5F', fontWeight: '600' },
  orText: { color: '#A0A0A0', textAlign: 'center', fontSize: 13 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom:120 },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleBtn: { backgroundColor: '#FFFFFF' },
  appleBtn: { backgroundColor: '#2C2C3E' },
  fbBtn: { backgroundColor: '#3B5998' },
  socialLabel: { fontSize: 20, fontWeight: '700' },
});
