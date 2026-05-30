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
import { getTrending, getMoviesByCategory, POSTER_BASE } from '../../services/movieService';
import { Movie } from '../../types/movie';
import { WEB_PHONE_W } from '../../constants/phone';

const SCREEN_WIDTH = Platform.OS === 'web' ? WEB_PHONE_W : Dimensions.get('window').width;
const PAD = 16;
const FEATURED_W = SCREEN_WIDTH * 0.46;
const FEATURED_H = FEATURED_W * 1.52;
const GAP = 8;
const GRID_COLUMNS = 3;
const GRID_ROWS = 3;
const MAX_GRID_ITEMS = GRID_COLUMNS * GRID_ROWS;
const GRID_W = (SCREEN_WIDTH - PAD * 2 - GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;
const GRID_H = GRID_W * 1.5;

const CATEGORIES = ['Now playing', 'Upcoming', 'Top rated', 'Popular'];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [trending, setTrending] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeCategory, setActiveCategory] = useState('Now playing');
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(false);

  useEffect(() => {
    getTrending()
      .then(data => {
        const items = Array.isArray(data?.results) ? data.results : [];
        setTrending(items.slice(0, 6));
      })
      .catch(() => setTrending([]))
      .finally(() => setTrendingLoading(false));
  }, []);

  useEffect(() => {
    setMoviesLoading(true);
    getMoviesByCategory(activeCategory)
      .then(data => {
        const items = Array.isArray(data?.results) ? data.results : [];
        setMovies(items.slice(0, MAX_GRID_ITEMS));
      })
      .catch(() => setMovies([]))
      .finally(() => setMoviesLoading(false));
  }, [activeCategory]);

  function goToDetail(id: number) {
    navigation.navigate('MovieDetail', { movieId: id });
  }

  function renderFeaturedCard({ item, index }: { item: Movie; index: number }) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.featuredCard, index === 0 && { marginLeft: PAD }]}
        onPress={() => goToDetail(item.id)}
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
            contentContainerStyle={{ paddingRight: PAD }}
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
          <FlatList
            data={movies}
            keyExtractor={item => `g-${item.id}`}
            numColumns={GRID_COLUMNS}
            scrollEnabled={false}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={styles.gridRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.gridItem}
                activeOpacity={0.8}
                onPress={() => goToDetail(item.id)}
              >
                {item.poster_path ? (
                  <Image
                    source={{ uri: `${POSTER_BASE}${item.poster_path}` }}
                    style={styles.gridImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.gridImage, styles.placeholder]} />
                )}
              </TouchableOpacity>
            )}
          />
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
    paddingHorizontal: PAD,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 18,
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
    width: FEATURED_W,
    height: FEATURED_H,
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
    paddingHorizontal: PAD,
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
    marginHorizontal: PAD,
    marginBottom: 16,
  },
  grid: {
    paddingHorizontal: PAD,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  gridItem: {
    width: GRID_W,
    height: GRID_H,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#252836',
  },
});
