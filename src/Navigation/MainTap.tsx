import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import HomeStack from '../screens/home/HomeScreen';
import { ProfileStack } from './ProfileStrack';
import { SearchStack } from './SearchStack';



export const MainTap = createBottomTabNavigator({
    screenOptions: {
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
    },
    screens: {
        HomeStack: {
            screen: HomeStack, 
            options: {
                headerShown: true,
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
                tabBarLabel: "Setting",
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="search" size={size} color={color} />
                ),
            },
        },
        ProfileStack:{
            screen: ProfileStack,
            options: {
                headerShown: false,
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="profile" size={size} color={color} />
                ),
            }
        }
    }
});