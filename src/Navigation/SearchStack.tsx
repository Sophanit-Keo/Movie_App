import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/search/SearchScreen';
import MovieDetailScreen from '../screens/search/MovieDetailScreen';
import { MovieDetail } from '../network/models/search';

export type SearchStackParamList = {
  SearchScreen: undefined;
  Detail: { movie: MovieDetail };
};

export const SearchStack = createNativeStackNavigator<SearchStackParamList>({
  screenOptions: { headerShown: false },
  screens: {
    SearchScreen: {
      screen: SearchScreen,
    },
    Detail: {
      screen: MovieDetailScreen,
    },
  },
});
