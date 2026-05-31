import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import { useAuth } from "../../context/AuthContext";
import { getUser, updateProfile } from "../../network/services/profileService";


export default function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const { token, email } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const t = token;
    if (!t) { setFetching(false); return; }
    let active = true;
    (async () => {
      try {
        const user = await getUser(t);
        if (!active) return;
        setFirstName(user.first_name ?? "");
        setLastName(user.last_name ?? "");
      } catch (err) {
        console.log("getUser error:", err);
      } finally {
        if (active) setFetching(false);
      }
    })();
    return () => { active = false; };
  }, [token]);

  async function handleSave() {
    if (!firstName.trim()) {
      setMsg("First name is required.");
      setIsError(true);
      return;
    }
    if (!token) { setMsg("Not authenticated."); setIsError(true); return; }
    setLoading(true);
    setMsg("");
    try {
      await updateProfile(token, { first_name: firstName, last_name: lastName, email: email ?? undefined });
      setMsg("Profile updated successfully!");
      setIsError(false);
      setTimeout(() => navigation.goBack(), 1000);
    } catch (err: any) {
      console.log('updateProfile error:', JSON.stringify(err));
      const msg =
        err?.message ||
        err?.error ||
        (err?.errors ? Object.values(err.errors).flat().join(' ') : null) ||
        "Failed to update profile.";
      setMsg(msg);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00D1C1" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
            <TouchableOpacity style={styles.editIconBtn}>
              <Feather name="edit-2" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{firstName} {lastName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>

        {/* Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <View style={[ msg && isError ? styles.inputError : null]}>
            <AuthInput
              label=""
              value={firstName}
              onChangeText={(t) => { setFirstName(t); setMsg(""); }}
              placeholder="Enter first name"
              editable={!loading}
            />
          </View>

          <Text style={styles.label}>Last Name</Text>
          <View >
            <AuthInput
              label=""
              value={lastName}
              onChangeText={(t) => { setLastName(t); setMsg(""); }}
              placeholder="Enter last name"
              editable={!loading}
            />
          </View>

          {msg && isError ? (
            <Text style={styles.errorText}>* {msg}</Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <View style={[styles.inputDisabled]}>
            <AuthInput
              label=""
              value={email ?? ""}
              onChangeText={() => {}}
              placeholder="Email"
              editable={false}
            />
          </View>
        </View>

        {msg && !isError ? <Text style={styles.successText}>{msg}</Text> : null}

        <AuthButton
          title={loading ? "Saving..." : "Save Changes"}
          onPress={handleSave}
          style={styles.saveBtn}
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171121" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },

  avatarContainer: { alignItems: "center", paddingVertical: 24 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FF5F5F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { color: "#FFFFFF", fontSize: 36, fontWeight: "700" },
  editIconBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#00D1C1",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  userEmail: { color: "#A0A0A0", fontSize: 13, marginTop: 4 },

  form: { marginTop: 8 },
  label: { color: "#A0A0A0", fontSize: 13, marginBottom: 4, marginTop: 16 },
  inputError: { borderWidth: 1.5, borderColor: "#FF5F5F", borderRadius: 30 },
  inputDisabled: { opacity: 0.6 },
  errorText: { color: "#FF5F5F", fontSize: 12, marginTop: 4 },
  successText: {
    color: "#4CAF50",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
  },
  saveBtn: { marginTop: 32 },
});
