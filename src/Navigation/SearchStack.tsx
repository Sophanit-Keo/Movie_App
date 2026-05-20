
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  SearchScreen  from '../screens/search/SearchScreen'

export const SearchStack = createNativeStackNavigator({
    screens: {
        SearchScreen: {
            screen: SearchScreen,
            options: {
                title: "Search",
            }
        },
    },
},
);