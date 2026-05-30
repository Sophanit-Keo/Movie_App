import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import ChangePasswordScreen from "../screens/profile/ChangePass";

export const ProfileStack = createNativeStackNavigator({
  screenOptions: {
    headerStyle: { backgroundColor: "#171121" },
    headerTintColor: "#FFFFFF",
    headerTitleAlign: "center",
  },
  screens: {
    Profile: { screen: ProfileScreen, options: { headerShown: false } },
    EditProfile: {
      screen: EditProfileScreen,
      options: { title: "Edit Profile" },
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
      options: { title: "Change Password" },
    },
  },
});
