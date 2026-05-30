import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AuthInput from "../../components/AuthInput";
import { loginUser } from "../../services/authService";

export default function LoginScreen() {
  const authNavigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await loginUser({ email, password });
      authNavigation.navigate("MainTap");
    } catch (err: any) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => authNavigation.goBack()}
        >
          <Feather name="chevron-left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={{ width: 36 }} />
      </View> */}

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Hi, Tiffany</Text>
        <Text style={styles.subtitle}>
          Welcome back! Please enter{"\n"}your details.
        </Text>

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
          <TouchableOpacity
            onPress={() => authNavigation.navigate("ResetPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => authNavigation.navigate("SignUp")}
          style={styles.signUpRow}
        >
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C27" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#2C2C3E",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  content: { paddingHorizontal: 24, paddingTop: 32 },
  greeting: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#A0A0A0",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 40,
    textAlign: "center",
  },
  form: { marginBottom: 8 },
  forgotText: {
    color: "#00D1C1",
    textAlign: "right",
    fontSize: 13,
    marginTop: 8,
  },
  errorText: {
    color: "#FF5F5F",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 13,
  },
  loginBtn: {
    backgroundColor: "#00D1C1",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  loginBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  signUpRow: { flexDirection: "row", justifyContent: "center" },
  signUpText: { color: "#A0A0A0", fontSize: 14 },
  signUpLink: { color: "#00D1C1", fontWeight: "700", fontSize: 14 },
});
