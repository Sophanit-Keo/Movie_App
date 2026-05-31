

import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { getUser } from "../../network/services/profileService";
import { resendCodeEmaill } from "../../network/services/authService";


export default function ProfileScreen() {
  const navigation = useNavigation();
  const [loadingUser, setLoadingUser] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout, token, email } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');

  async function handleResendCode() {
    if (!email) { setError('Email address is required.'); return; }
    setLoading(true);
    setError('');
    try {
      await resendCodeEmaill({ email: email });
      navigation.navigate('CreateNewPassword')
    } catch (err: any) {
      console.log('resend error:', err);
      setError(err?.message || err?.error || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      const t = token;
      if (!t) { setLoadingUser(false); return; }
      let active = true;
      (async () => {
        try {
          setLoadingUser(true);
          const profile = await getUser(t);
          if (!active) return;
          setFirstName(profile.first_name ?? "");
          setLastName(profile.last_name ?? "");
        } catch (err) {
          console.log("getUser error:", err);
        } finally {
          if (active) setLoadingUser(false);
        }
      })();
      return () => { active = false; };
    }, [token])
  );

  async function handleLogout() {
    try {
      await logout()
    } finally {
      setShowLogoutModal(false);
    }
  }

  if (loadingUser) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00D1C1" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>Profile</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── User Card ── */}
        <View style={styles.userCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {firstName.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{firstName} {lastName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Feather name="edit" size={20} color="#d1a4f9" />
          </TouchableOpacity>
        </View>

        {/* ── Premium Banner ── */}
        <TouchableOpacity style={styles.premiumBanner}>
          <View style={styles.premiumIconBox}>
            <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.premiumText}>
            <Text style={styles.premiumTitle}>Premium Member</Text>
            <Text style={styles.premiumSubtitle}>
              New movies are coming for you,{"\n"}Download Now!
            </Text>
          </View>
        </TouchableOpacity>

        {/* ── Account Section ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon={
                <Ionicons name="person-outline" size={20} color="#75c5fb" />
              }
              label="Member"
              onPress={() => { }}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#A0A0A0"
                />
              }
              label="Change Password"
              onPress={() => handleResendCode()}
              loading={loading}
            />
          </View>
        </View>

        {/* ── General Section ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon={
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#A0A0A0"
                />
              }
              label="Notification"
              onPress={() => { }}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<Ionicons name="globe-outline" size={20} color="#A0A0A0" />}
              label="Language"
              onPress={() => { }}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<Ionicons name="flag-outline" size={20} color="#A0A0A0" />}
              label="Country"
              onPress={() => { }}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={<Ionicons name="trash-outline" size={20} color="#A0A0A0" />}
              label="Clear Cache"
              onPress={() => { }}
            />
          </View>
        </View>

        {/* ── More Section ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <View style={styles.menuCard}>
            <MenuItem
              icon={
                <Ionicons name="shield-outline" size={20} color="#A0A0A0" />
              }
              label="Legal and Policies"
              onPress={() => { }}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#A0A0A0"
                />
              }
              label="Help & Feedback"
              onPress={() => { }}
            />
            <View style={styles.divider} />
            <MenuItem
              icon={
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#A0A0A0"
                />
              }
              label="About Us"
              onPress={() => { }}
            />
          </View>
        </View>

        {/* ── Logout Button ── */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setShowLogoutModal(true)}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Logout Modal ── */}
      <Modal visible={showLogoutModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* Question icon */}
            <View style={styles.modalIconOuter}>
              <View style={styles.modalIconInner}>
                <Text style={styles.modalIconText}>?</Text>
              </View>
            </View>

            <Text style={styles.modalTitle}>Are you sure ?</Text>
            <Text style={styles.modalSubtitle}>
              You will be logged out of your account.{"\n"}Are you sure you want
              to continue?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalLogoutBtn}
                onPress={handleLogout}
              >
                <Text style={styles.modalLogoutText}>Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
  loading = false,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  loading?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} disabled={loading} activeOpacity={0.7}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIconBox}>{icon}</View>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      {loading
        ? <ActivityIndicator size="small" color="#A0A0A0" />
        : <AntDesign name="right" size={14} color="#A0A0A0" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171121" },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 16,
  },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },

  // User Card
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C3E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  avatarWrapper: { marginRight: 12 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF5F5F",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  userInfo: { flex: 1 },
  userName: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  userEmail: { color: "#A0A0A0", fontSize: 13, marginTop: 2 },

  // Premium Banner
  premiumBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5A623",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  premiumIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  premiumText: { flex: 1 },
  premiumTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  premiumSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    marginTop: 2,
    lineHeight: 18,
  },

  // Sections
  section: { marginBottom: 24 },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: "#2C2C3E",
    borderRadius: 16,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#3C3C4E",
    justifyContent: "center",
    alignItems: "center",
  },
  menuLabel: { color: "#FFFFFF", fontSize: 15 },
  divider: { height: 1, backgroundColor: "#3C3C4E", marginHorizontal: 16 },

  // Logout
  logoutBtn: {
    borderWidth: 1.5,
    borderColor: "#6d6da5",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: { color: "#bc2b2b", fontSize: 16, fontWeight: "700" },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  modalBox: {
    backgroundColor: "#2C2C3E",
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    width: "100%",
  },
  modalIconOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5A623",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalIconInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#d1005b",
    justifyContent: "center",
    alignItems: "center",
  },
  modalIconText: { color: "#FFFFFF", fontSize: 28, fontWeight: "900" },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalSubtitle: {
    color: "#A0A0A0",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtons: { flexDirection: "row", gap: 12, width: "100%" },
  modalLogoutBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#d10042",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  modalLogoutText: { color: "#d1002a", fontSize: 15, fontWeight: "700" },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: "#4c5eff",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  modalCancelText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});


