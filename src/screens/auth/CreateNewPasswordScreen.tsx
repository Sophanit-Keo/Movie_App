import React, { useState } from 'react';
import { View, Text, StyleSheet ,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import { useNavigation } from '@react-navigation/native';

export default function CreateNewPasswordScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.heading}>Create New Password</Text>
          <Text style={styles.subtitle}>Enter your new password</Text>

          <View style={styles.form}>
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
              value={confirm}
              onChangeText={setConfirm}
              secureToggle
            />
          </View>

          <AuthButton title="Confirm" onPress={() => navigation.navigate('Login')} />
        </View>
      </ScrollView>
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
