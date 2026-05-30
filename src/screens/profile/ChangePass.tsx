import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import { updatePassword } from "../../services/authService";

export default function ChangePasswordScreen() {
  const navigation = useNavigation<any>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleChange() {
    if (!newPassword || !confirmPassword) {
      setMsg("All fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      await updatePassword({ password: newPassword });
      setMsg("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => navigation.goBack(), 1000);
    } catch (err: any) {
      setMsg(err?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Change Password</Text>
        <Text style={styles.subtitle}>Enter your new password below</Text>

        <AuthInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="••••••••"
          secureToggle
        />
        <AuthInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
          secureToggle
        />

        {msg ? (
          <Text
            style={[
              styles.msg,
              msg.includes("success") ? styles.success : styles.error,
            ]}
          >
            {msg}
          </Text>
        ) : null}

        <AuthButton
          title={loading ? "Updating..." : "Update Password"}
          onPress={handleChange}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171121" },
  scroll: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  heading: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: { color: "#A0A0A0", fontSize: 14, marginBottom: 32 },
  msg: { fontSize: 13, marginBottom: 12, textAlign: "center" },
  success: { color: "#4CAF50" },
  error: { color: "#FF5F5F" },
});
