import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import MovieDetailScreen from '../screens/Home/MovieDetailScreen';

export type HomeParamList = {
  HomeScreen: undefined;
  MovieDetail: { movieId: number };
};

export const HomeStack = createNativeStackNavigator({
  screens: {
    HomeScreen: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
    MovieDetail: {
      screen: MovieDetailScreen,
      initialParams: { movieId: 0 },
      options: {
        title: 'Detail',
        headerShown: true,
        headerStyle: { backgroundColor: '#171121' },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      },
    },
  },
});

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeParamList {}
  }
}
