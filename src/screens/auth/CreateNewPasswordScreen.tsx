import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AuthInput from "../../components/AuthInput";
import { updatePassword } from "../../services/authService";

export default function CreateNewPasswordScreen() {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReset() {
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updatePassword({ password }); // ← Supabase only needs password
      navigation.replace("Login");
    } catch (err: any) {
      setError(err?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Feather name="chevron-left" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>
            {loading ? "Resetting..." : "Reset"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C27" },
  backBtn: {
    margin: 16,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#2C2C3E",
    justifyContent: "center",
    alignItems: "center",
  },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: { color: "#A0A0A0", fontSize: 14, marginBottom: 40 },
  form: { marginBottom: 32 },
  errorText: { color: "#FF5F5F", marginBottom: 12, textAlign: "center" },
  resetBtn: {
    backgroundColor: "#00D1C1",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  resetBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
