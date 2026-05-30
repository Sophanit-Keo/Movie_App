import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/search/SearchScreen";
import MovieDetailScreen from "../screens/search/MovieDatailScreen";

export const SearchStack = createNativeStackNavigator({
  screenOptions: {
    headerStyle: { backgroundColor: "#171121" },
    headerTintColor: "#FFFFFF",
    headerTitleAlign: "center",
  },
  screens: {
    Search: { screen: SearchScreen, options: { headerShown: false } },
    MovieDetail: { screen: MovieDetailScreen, options: { headerShown: false } },
  },
});
