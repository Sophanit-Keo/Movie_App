import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto"; // ← fixes Network request failed

const SUPABASE_URL = "https://cnooqynwnoajjoiltmgl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1UYoMNncNC6Umj0dXKjAbw_ePsFaYb3";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
