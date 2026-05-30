import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import MovieDetailScreen from '../screens/home/MovieDetielScreen';

export type HomeParamList = {
  Home: undefined;
  MovieDetail: { movieId: number };
};

const HomeStack = createNativeStackNavigator<HomeParamList>({
  screens: {
    Home: {
      screen: HomeScreen,
      options: { headerShown: false },
    },
    MovieDetail: {
      screen: MovieDetailScreen,
      options: {
        title: '',
        headerShown: true,
        headerStyle: { backgroundColor: '#171121' },
        headerTintColor: '#FFFFFF',
        headerShadowVisible: false,
      },
    },
  },
});

export default HomeStack;
