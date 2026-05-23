import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { useNavigation } from '@react-navigation/native';




export default function ResetPasswordScreen() {
  const authNavigation = useNavigation();
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.heading}>Reset Password</Text>
        <Text style={styles.subtitle}>Recover your account password</Text>

        <View style={styles.form}>
          <AuthInput
            label="Email Address"
            placeholder="Tiffanyjearsey@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <AuthButton 
          title="Next"
            onPress={() => authNavigation.navigate('Verification', { token: '' })}
        />
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
    backgroundColor: '#2D2739',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { color: '#FFFFFF', fontSize: 22, lineHeight: 26 },
  content: { paddingHorizontal: 24, paddingTop: 24 },
  heading: { color: '#FFFFFF', fontSize: 28, fontWeight: '700', marginBottom: 8 , alignSelf:'center'},
  subtitle: { color: '#A0A0A0', fontSize: 14, marginBottom: 40, alignSelf:'center' },
  form: { marginBottom: 32 },
});
