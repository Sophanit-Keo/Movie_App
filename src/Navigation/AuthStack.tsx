import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import CreateNewPasswordScreen from "../screens/auth/CreateNewPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import RootScreen from "../screens/auth/RootScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import VerificationScreen from "../screens/auth/VerificationScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import { StaticParamList } from "@react-navigation/native";
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
                name: 'ResetPassword',
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
                name: 'CreateNewPassword',
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
            initialParams: { email: '' },
            options: {
                name: 'Verification',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#171121',
                },
                headerTintColor: '#FFFFFF',
                headerTitleAlign: 'center',
            }
        },
        HomeTap: {
            screen: HomeScreen,
            options: {
                name: 'HomeTap',
                headerShown: true
            }
        }
    }
});

export type AuthParamList = StaticParamList<typeof AuthStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends Omit<AuthParamList, 'Verification'> {
            Verification: { email: string };
        }
    }
}