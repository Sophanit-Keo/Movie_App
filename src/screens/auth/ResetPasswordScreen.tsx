import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AuthInput from "../../components/AuthInput";
import { sendResetCode } from "../../services/authService";

export default function ResetPasswordScreen() {
  const authNavigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSendCode() {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await sendResetCode({ email });
      authNavigation.navigate("CreateNewPassword", { email });
    } catch (err: any) {
      setError(err?.message || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <TouchableOpacity
        style={styles.backBtn}
        onPress={() => authNavigation.goBack()}
      >
        <Feather name="chevron-left" size={22} color="#FFFFFF" />
      </TouchableOpacity> */}

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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.nextBtn} onPress={handleSendCode}>
          <Text style={styles.nextBtnText}>
            {loading ? "Sending..." : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
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
  content: { paddingHorizontal: 24, paddingTop: 24 },
  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: { color: "#A0A0A0", fontSize: 14, marginBottom: 40 },
  form: { marginBottom: 32 },
  errorText: { color: "#FF5F5F", marginBottom: 12, textAlign: "center" },
  nextBtn: {
    backgroundColor: "#00D1C1",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
