
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';

export const HomeStack = createNativeStackNavigator({
    screens: {
        HomeScreen: {
            screen: HomeScreen,
            options: {
                title: "Home",
                headerShown: true
            }
        },
    },
},
);