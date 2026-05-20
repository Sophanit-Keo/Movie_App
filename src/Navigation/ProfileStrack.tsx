
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';

export const ProfileStack = createNativeStackNavigator({
    screens: {
        ProfileScreen: {
            screen: ProfileScreen,
            options: {
                title: "Profile",
            }
        },
    },
},
);