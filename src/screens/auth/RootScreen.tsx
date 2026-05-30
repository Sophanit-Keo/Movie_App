import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getSession } from "../../services/authService";

export default function RootScreen() {
  const navigation = useNavigation<any>();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          navigation.replace("MainTap");
        } else {
          setChecking(false); // ← no session, show the screen
        }
      })
      .catch(() => {
        setChecking(false); // ← error, show the screen
      });
  }, []);

  // Show spinner while checking session
  if (checking) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00D1C1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* ── Logo ── */}
        <View style={styles.logoContainer}>
          <View style={styles.tvIcon}>
            <View style={styles.antenna1} />
            <View style={styles.antenna2} />
            <View style={styles.tvBody}>
              <Text style={styles.tvText}>CN</Text>
            </View>
          </View>
          <Text style={styles.appName}>CINEMAX</Text>
          <Text style={styles.tagline}>
            Enter your registered{"\n"}Phone Number to Sign Up
          </Text>
        </View>

        {/* ── Buttons ── */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>I already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* ── Social Login ── */}
          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Or Sign up with</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.socialRow}>
            {/* Google */}
            <TouchableOpacity style={styles.socialBtn}>
              <AntDesign name="google" size={24} color="#DB4437" />
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity style={[styles.socialBtn, styles.appleBtn]}>
              <AntDesign name="apple" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity style={[styles.socialBtn, styles.fbBtn]}>
              <FontAwesome name="facebook" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C27" },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#1C1C27",
    justifyContent: "center",
    alignItems: "center",
  },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 60 },
  tvIcon: { alignItems: "center", marginBottom: 20 },
  antenna1: {
    position: "absolute",
    top: -20,
    left: "35%",
    width: 2,
    height: 24,
    backgroundColor: "#00D1C1",
    transform: [{ rotate: "-20deg" }],
  },
  antenna2: {
    position: "absolute",
    top: -20,
    right: "35%",
    width: 2,
    height: 24,
    backgroundColor: "#00D1C1",
    transform: [{ rotate: "20deg" }],
  },
  tvBody: {
    width: 90,
    height: 72,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#00D1C1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  tvText: { color: "#00D1C1", fontSize: 20, fontWeight: "900" },
  appName: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 4,
    marginTop: 16,
    marginBottom: 12,
  },
  tagline: {
    color: "#A0A0A0",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  buttons: { alignItems: "center" },
  signUpBtn: {
    width: "100%",
    backgroundColor: "#00D1C1",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  loginRow: { flexDirection: "row", alignItems: "center", marginBottom: 32 },
  loginText: { color: "#A0A0A0", fontSize: 14 },
  loginLink: { color: "#00D1C1", fontSize: 14, fontWeight: "700" },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  orLine: { flex: 1, height: 1, backgroundColor: "#2C2C3E" },
  orText: { color: "#A0A0A0", fontSize: 13, marginHorizontal: 12 },
  socialRow: { flexDirection: "row", gap: 20 },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  appleBtn: { backgroundColor: "#2C2C3E" },
  fbBtn: { backgroundColor: "#3B5998" },
  googleG: { color: "#4285F4", fontSize: 24, fontWeight: "900" },
  appleIcon: { color: "#FFFFFF", fontSize: 22 },
  fbIcon: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
});
