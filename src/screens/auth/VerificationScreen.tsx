import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { verifyOtp, resendOtp } from "../../services/authService";

export default function VerificationScreen() {
  const authNavigation = useNavigation<any>();
  const route = useRoute<any>();
  const email: string = route.params?.email ?? "example@gmail.com";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (text: string, index: number) => {
    const updated = [...code];
    updated[index] = text;
    setCode(updated);
    if (text && index < 5) inputs.current[index + 1]?.focus();
    if (index === 5 && text) {
      const otp = [...updated].join("");
      if (otp.length === 6) handleVerify(otp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  async function handleVerify(otp?: string) {
    const finalOtp = otp || code.join("");
    if (finalOtp.length < 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await verifyOtp(email, finalOtp);
      authNavigation.navigate("MainTap");
    } catch (err: any) {
      setError(err?.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      await resendOtp(email);
      setResendTimer(60);
      setCanResend(false);
      setError("");
      setCode(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } catch (err: any) {
      setError(err?.message || "Failed to resend code.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => authNavigation.goBack()}
      >
        <Feather name="chevron-left" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.heading}>Verifying Your Account</Text>
        <Text style={styles.subtitle}>
          We have just sent you a 6 digit code via your{"\n"}email{" "}
          <Text style={styles.emailHighlight}>{email}</Text>
        </Text>

        {/* OTP Boxes */}
        <View style={styles.otpRow}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              style={[styles.otpBox, digit ? styles.otpBoxActive : null]}
              value={digit}
              onChangeText={(text) => handleChange(text.slice(-1), i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => handleVerify()}
        >
          <Text style={styles.continueBtnText}>
            {loading ? "Verifying..." : "Continue"}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive code? </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
          )}
        </View>
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    color: "#A0A0A0",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 40,
  },
  emailHighlight: { color: "#FFFFFF", fontWeight: "600" },
  otpRow: { flexDirection: "row", gap: 12, marginBottom: 40 },
  otpBox: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#2C2C3E",
    borderWidth: 1.5,
    borderColor: "#3C3C4E",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  otpBoxActive: { borderColor: "#00D1C1" },
  errorText: { color: "#FF5F5F", marginBottom: 12, textAlign: "center" },
  continueBtn: {
    backgroundColor: "#00D1C1",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  continueBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  resendRow: { flexDirection: "row", justifyContent: "center" },
  resendText: { color: "#A0A0A0", fontSize: 14 },
  resendLink: { color: "#00D1C1", fontWeight: "600", fontSize: 14 },
});
