import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, EvilIcons, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { ProfileStack } from './ProfileStrack';
import { SearchStack } from './SearchStack';


export const MainTap = createBottomTabNavigator({
    screenOptions: {
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
          backgroundColor: '#171121', 
          height: 60,
          borderTopWidth: 0,
          elevation: 5
        },
    },
    screens: {
        HomeStack: {
            screen: HomeStack, 
            options: {
                headerShown: true,
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            },
            
        },
        SearchStack: {
            screen: SearchStack,
            options: {
                headerShown: false,
                tabBarLabel: "Search",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search" size={size} color={color} />
                ),
            },
        },
        ProfileStack:{
            screen: ProfileStack,
            options: {
                headerShown: false,
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="people" size={size} color={color} />
                ),
            }
        }
    }
});
export type MainTabParamList = {
    HomeStack: undefined;
    SearchStack: undefined;
    ProfileStack: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends MainTabParamList {}
    }
}