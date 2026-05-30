import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StaticParamList } from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import RootScreen from "../screens/auth/RootScreen";
import VerificationScreen from "../screens/auth/VerificationScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import CreateNewPasswordScreen from "../screens/auth/CreateNewPasswordScreen";
import { MainTap } from "./MainTap";

const headerOptions = {
  headerStyle: { backgroundColor: "#171121" },
  headerTintColor: "#FFFFFF",
  headerTitleAlign: "center" as const,
  headerShadowVisible: false,
};

export const AuthStack = createNativeStackNavigator({
  initialRouteName: "Root",
  screenOptions: {
    animation: "slide_from_right",
  },
  screens: {
    // ── Hidden / no header ──────────────────────────
    Root: {
      screen: RootScreen,
      options: { headerShown: false },
    },
    MainTap: {
      screen: MainTap,
      options: { headerShown: false }, // ← fixed: no back button after login
    },

    // ── Auth screens ────────────────────────────────
    Login: {
      screen: LoginScreen,
      options: { ...headerOptions, headerShown: false }, // login has no back
    },
    SignUp: {
      screen: SignUpScreen,
      options: { ...headerOptions, title: "Sign Up" },
    },
    Verification: {
      screen: VerificationScreen,
      initialParams: { token: "", email: "" },
      options: { ...headerOptions, title: "Verify Email" },
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      options: { ...headerOptions, title: "Reset Password" },
    },
    CreateNewPassword: {
      screen: CreateNewPasswordScreen,
      options: { ...headerOptions, title: "New Password" },
    },
  },
});

export type AuthParamList = StaticParamList<typeof AuthStack>;
export type MainTapParamList = StaticParamList<typeof MainTap>;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends Omit<AuthParamList, "Verification">, MainTapParamList {
      Verification: { token: string; email?: string };
    }
  }
}
