import { supabase } from "./supabaseClient";

// ─── 1. REGISTER ─────────────────────────────────────────────
export async function registerUser(data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    },
  });
  if (error) throw { message: error.message };
  return result;
}

// ─── 2. VERIFY OTP CODE ──────────────────────────────────────
export async function verifyOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });
  if (error) throw { message: error.message };
  return data;
}

// ─── 3. RESEND OTP CODE ──────────────────────────────────────
export async function resendOtp(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });
  if (error) throw { message: error.message };
}

// ─── 4. LOGIN ────────────────────────────────────────────────
export async function loginUser(data: { email: string; password: string }) {
  const { data: result, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) throw { message: error.message };

  // Block login if email not verified
  if (result.user && !result.user.email_confirmed_at) {
    await supabase.auth.signOut();
    throw { message: "Please verify your email before logging in." };
  }

  return result;
}

// ─── 5. LOGOUT ───────────────────────────────────────────────
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw { message: error.message };
}

// ─── 6. GET CURRENT USER ─────────────────────────────────────
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw { message: error.message };
  return data.user;
}

// ─── 7. UPDATE PROFILE ───────────────────────────────────────
export async function updateProfile(data: {
  first_name: string;
  last_name: string;
}) {
  const { data: result, error } = await supabase.auth.updateUser({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
    },
  });
  if (error) throw { message: error.message };
  return result;
}

// ─── 8. UPDATE PASSWORD ──────────────────────────────────────
export async function updatePassword(data: { password: string }) {
  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });
  if (error) throw { message: error.message };
}

// ─── 9. SEND RESET CODE ──────────────────────────────────────
export async function sendResetCode(data: { email: string }) {
  const { error } = await supabase.auth.resetPasswordForEmail(data.email);
  if (error) throw { message: error.message };
}

// ─── 10. CHECK SESSION ───────────────────────────────────────
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw { message: error.message };
  return data.session;
}
