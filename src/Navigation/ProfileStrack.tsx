import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StaticParamList } from '@react-navigation/native';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditeProfileScreen';
import CreateNewPasswordScreen from '../screens/auth/CreateNewPasswordScreen';

export const ProfileStack = createNativeStackNavigator({
    screens: {
        Profile: {
            screen: ProfileScreen,
            options: { headerShown: false },
        },
        EditProfile: {
            screen: EditProfileScreen,
            options: { headerShown: false },
        },
        CreateNewPassword: {
            screen: CreateNewPasswordScreen,
            options: { headerShown: false },
        },
    },
});

export type ProfileParamList = StaticParamList<typeof ProfileStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends ProfileParamList {}
    }
}
