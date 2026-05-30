import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Movie } from '../../network/models/movie';
import { getMoviesByCategory, getTrending, POSTER_BASE } from '../../network/services/movieService';
import { HomeParamList } from '../../navigation/HomeStack';

type HomeNav = NativeStackNavigationProp<HomeParamList, 'Home'>;

const CATEGORIES = ['Now playing', 'Upcoming', 'Top rated', 'Popular'];
const WEB_PHONE_W = 390;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNav>();
  const [trending, setTrending] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeCategory, setActiveCategory] = useState('Now playing');
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(false);

  const SCREEN_WIDTH = Platform.OS === 'web' ? WEB_PHONE_W : Dimensions.get('window').width;
  const PAD = 0;
  const FEATURED_W = SCREEN_WIDTH * 0.46;
  const FEATURED_H = FEATURED_W * 1.52;
  const GAP = 8;
  const GRID_COLUMNS = 3;
  const GRID_ROWS = 3;
  const MAX_GRID_ITEMS = GRID_COLUMNS * GRID_ROWS;
  const GRID_W = (SCREEN_WIDTH - PAD - 10 * 2 - GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;
  const GRID_H = GRID_W * 1.5;

  useEffect(() => {
    getTrending()
      .then(data => setTrending(Array.isArray(data?.results) ? data.results.slice(0, 6) : []))
      .catch(() => setTrending([]))
      .finally(() => setTrendingLoading(false));
  }, []);

  useEffect(() => {
    setMoviesLoading(true);
    getMoviesByCategory(activeCategory)
      .then(data => setMovies(Array.isArray(data?.results) ? data.results.slice(0, MAX_GRID_ITEMS) : []))
      .catch(() => setMovies([]))
      .finally(() => setMoviesLoading(false));
  }, [activeCategory]);

  function goToDetail(id: number) {
    navigation.navigate('MovieDetail',{movieId:id});
  }

  function renderFeaturedCard({ item, index }: { item: Movie; index: number }) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => goToDetail(item.id)}
        style={[styles.featuredCard, { width: FEATURED_W, height: FEATURED_H },]}
      >
        {item.poster_path ? (
          <Image
            source={{ uri: `${POSTER_BASE}${item.poster_path}` }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.featuredImage, styles.placeholder]} />
        )}
        <Text style={styles.featuredNumber}>{index + 1}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>What do you want to watch?</Text>
          <TouchableOpacity
            style={styles.searchBar}
            activeOpacity={0.8}
            onPress={() => navigation.getParent()?.navigate('SearchStack')}
          >
            <Text style={styles.searchPlaceholder}>Search</Text>
            <Feather name="search" size={18} color="#92929D" />
          </TouchableOpacity>
        </View>

        {trendingLoading ? (
          <ActivityIndicator size="small" color="#0296E5" style={{ height: FEATURED_H }} />
        ) : (
          <FlatList
            data={trending}
            renderItem={renderFeaturedCard}
            keyExtractor={item => `f-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: PAD ,paddingLeft:PAD, margin:1}}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          />
        )}

        <View style={styles.tabs}>
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat;
            return (
              <TouchableOpacity key={cat} style={styles.tabItem} onPress={() => setActiveCategory(cat)}>
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{cat}</Text>
                {active && <View style={styles.tabUnderline} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.divider} />

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0296E5" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.grid}>
            {movies.slice(0, MAX_GRID_ITEMS).map(movie => (
              <TouchableOpacity
                key={movie.id}
                style={[styles.gridItem, { width: GRID_W, height: GRID_H }]}
                activeOpacity={0.8}
                onPress={() => goToDetail(movie.id)}
              >
                {movie.poster_path ? (
                  <Image
                    source={{ uri: `${POSTER_BASE}${movie.poster_path}` }}
                    style={styles.gridImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.gridImage, styles.placeholder]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171121',
  },
  scroll: {
    paddingBottom: 24,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 18,
    alignSelf: 'center'
  },
  searchBar: {
    backgroundColor: '#252836',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchPlaceholder: {
    color: '#92929D',
    fontSize: 14,
    flex: 1,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0296E5',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredNumber: {
    position: 'absolute',
    bottom: -18,
    left: 2,
    fontSize: 96,
    fontWeight: '900',
    color: 'rgba(2, 150, 229, 0.55)',
    lineHeight: 100,
    textShadowColor: '#0296E5',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 14,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  tabItem: {
    alignItems: 'center',
    paddingBottom: 10,
    position: 'relative',
  },
  tabText: {
    color: '#92929D',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#0296E5',
    borderRadius: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#252836',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    borderRadius: 12,
    overflow: 'hidden',
    margin:5
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#252836',
  },
});