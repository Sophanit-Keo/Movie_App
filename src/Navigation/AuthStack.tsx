import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import CreateNewPasswordScreen from "../screens/auth/CreateNewPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import RootScreen from "../screens/auth/RootScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import VerificationScreen from "../screens/auth/VerificationScreen";
import { StaticParamList } from "@react-navigation/native";

export const AuthStack = createNativeStackNavigator({
    initialRouteName: "Root",
    screens: {
        Login: {
            screen: LoginScreen,
            options: {
                headerShown: true,
                headerStyle: { backgroundColor: '#171121' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }
        },
        SignUp: {
            screen: SignUpScreen,
            options: {
                title: "SignUp",
                headerShown: true,
                headerStyle: { backgroundColor: '#171121' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            },
        },
        Root: {
            screen: RootScreen,
            options: {
                headerShown: false,
            }
        },
        ResetPassword: {
            screen: ResetPasswordScreen,
            options: {
                headerShown: true,
                headerStyle: { backgroundColor: '#171121' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }
        },
        CreateNewPassword: {
            screen: CreateNewPasswordScreen,
            initialParams: { token: '', email: '' },
            options: {
                headerShown: true,
                headerStyle: { backgroundColor: '#171121' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }
        },
        Verification: {
            screen: VerificationScreen,
            initialParams: { token: '', email: '' },
            options: {
                headerShown: true,
                headerStyle: { backgroundColor: '#171121' },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }
        },
    }
});

export type AuthParamList = StaticParamList<typeof AuthStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends Omit<AuthParamList, 'Verification'> {
            Verification: { token: string; email?: string };
        }
    }
}
