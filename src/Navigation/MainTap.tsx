import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/HomeScreen"; // ← direct screen import
import { ProfileStack } from "./ProfileStrack";
import { SearchStack } from "./SearchStack";

export const MainTap = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarStyle: { backgroundColor: "#1E1A2E", borderTopColor: "#2C2C3E" },
    tabBarActiveTintColor: "#FF5F5F",
    tabBarInactiveTintColor: "gray",
  },
  screens: {
    Home: {
      screen: HomeScreen, // ← use HomeScreen directly
      options: {
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" size={size} color={color} />
        ),
      },
    },
    SearchStack: {
      screen: SearchStack,
      options: {
        headerShown: false,
        tabBarLabel: "Search",
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="search" size={size} color={color} />
        ),
      },
    },
    ProfileStack: {
      screen: ProfileStack,
      options: {
        headerShown: false,
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        ),
      },
    },
  },
});
