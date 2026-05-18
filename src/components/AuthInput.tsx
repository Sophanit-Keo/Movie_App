import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  label?: string;
  secureToggle?: boolean;
}

export default function AuthInput({ label, secureToggle, ...props }: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#B2BEC3'}
          secureTextEntry={secureToggle ? hidden : false}
          {...props}
        />
        {secureToggle && (
          <TouchableOpacity onPress={() => setHidden(h => !h)} style={styles.eyeBtn}>
            <Text style={styles.eyeIcon}>{hidden ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { color: '#FFFFFF', marginBottom: 6, fontSize: 14 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3238',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  eyeBtn: { paddingHorizontal: 14 },
  eyeIcon: { fontSize: 16 },
});
