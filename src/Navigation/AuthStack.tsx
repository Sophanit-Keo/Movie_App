import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import CreateNewPasswordScreen from "../screens/auth/CreateNewPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import RootScreen from "../screens/auth/RootScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import VerificationScreen from "../screens/auth/VerificationScreen";
import { StaticParamList } from "@react-navigation/native";
import { MainTap } from "./MainTap";

export const AuthStack = createNativeStackNavigator({
    initialRouteName: "Root",
    screens: {
        Login: {
            screen: LoginScreen,
            options: {
                name: 'Login',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#171121',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }
        },
        SignUp: {
            screen: SignUpScreen,
            options: {
                title: "SignUp",
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#171121',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',

            },
        },
        Root: {
            screen: RootScreen,
            options: {
                name: 'Root',
                headerShown: false,
            }
        },
        ResetPassword: {
            screen: ResetPasswordScreen,
            options: {
                name: 'a',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#171121',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }

        },
        CreateNewPassword: {
            screen: CreateNewPasswordScreen,
            options: {
                name: '',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#171121',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }
        },
        Verification: {
            screen: VerificationScreen,
            initialParams: {  token: '', email: ''  },
            options: {
                name: '',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#171121',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }
        },
        MainTap: {
            screen: MainTap,
            options: {
                headerShown: true
            }
        }
    }
});

export type AuthParamList = StaticParamList<typeof AuthStack>;
export type MainTapParamList = StaticParamList<typeof MainTap>;


declare global {
    namespace ReactNavigation {
        interface RootParamList extends Omit<AuthParamList, 'Verification'>,MainTapParamList {
            Verification: { token: string; email?: string };
        }
}}