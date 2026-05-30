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
import { registerUser } from "../../services/authService";

export default function SignUpScreen() {
  const authNavigation = useNavigation<any>();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validateForm(): string | null {
    if (!firstName || !email || !password) return "All fields are required.";
    if (!email.includes("@")) return "Enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!agreed) return "You must agree to the Terms & Conditions.";
    return null;
  }

  async function handleRegister() {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerUser({
        first_name: firstName,
        last_name: "",
        email,
        password,
      });
      authNavigation.navigate("Verification", { email });
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{ width: 36 }} />
      </View> */}

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Let's get started</Text>
        <Text style={styles.subtitle}>
          The latest movies and series{"\n"}are here
        </Text>

        <View style={styles.form}>
          <AuthInput
            label="Full Name"
            placeholder="Tiffany"
            value={firstName}
            onChangeText={setFirstName}
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

          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setAgreed(!agreed)}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Feather name="check" size={12} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkLabel}>
              I agree to the <Text style={styles.link}>Terms and Services</Text>
              {"\n"}and <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.signUpBtn} onPress={handleRegister}>
          <Text style={styles.signUpBtnText}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => authNavigation.navigate("Login")}
          style={styles.loginRow}
        >
          <Text style={styles.loginText}>Already have an account? </Text>
          <Text style={styles.loginLink}>Login</Text>
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
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  heading: {
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
    marginBottom: 32,
    textAlign: "center",
  },
  form: { marginBottom: 16 },
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#A0A0A0",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: { borderColor: "#00D1C1", backgroundColor: "#00D1C1" },
  checkLabel: { color: "#A0A0A0", fontSize: 13, lineHeight: 20, flex: 1 },
  link: { color: "#00D1C1", fontWeight: "600" },
  errorText: {
    color: "#FF5F5F",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 13,
  },
  signUpBtn: {
    backgroundColor: "#00D1C1",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  loginRow: { flexDirection: "row", justifyContent: "center" },
  loginText: { color: "#A0A0A0", fontSize: 14 },
  loginLink: { color: "#00D1C1", fontWeight: "700", fontSize: 14 },
});
