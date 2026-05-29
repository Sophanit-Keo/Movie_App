import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SearchStackParamList } from '../../navigation/SearchStack';
import { TMDB_IMAGE_BASE } from '../../network/services/searchService';
import colors from '../../theme/colors';

const { width } = Dimensions.get('window');

type DetailRouteProp = RouteProp<SearchStackParamList, 'Detail'>;

function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

export default function MovieDetailScreen() {
  const navigation = useNavigation<any>();
  const { movie } = useRoute<DetailRouteProp>().params;

  const posterUri = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null;
  const backdropUri = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : posterUri;

  const year = movie.release_date?.slice(0, 4) ?? '—';
  const rating = movie.vote_average.toFixed(1);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Backdrop */}
        <View style={styles.backdropWrapper}>
          {backdropUri ? (
            <Image source={{ uri: backdropUri }} style={styles.backdrop} resizeMode="cover" />
          ) : (
            <View style={[styles.backdrop, styles.backdropFallback]} />
          )}
          <View style={styles.backdropOverlay} />

          {/* Back button on top of image */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          {/* Title pinned to bottom of image */}
          <Text style={styles.backdropTitle} numberOfLines={2}>
            {movie.title}
          </Text>
        </View>

        <View style={styles.body}>
          {/* Poster + meta row */}
          <View style={styles.metaRow}>
            {posterUri && (
              <Image source={{ uri: posterUri }} style={styles.poster} />
            )}
            <View style={styles.metaInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.badges}>
                <Badge label={`⭐ ${rating}`} />
                <Badge label={`📅 ${year}`} />
                {movie.original_language && (
                  <Badge label={movie.original_language.toUpperCase()} />
                )}
              </View>
              <Text style={styles.votes}>{movie.vote_count.toLocaleString()} votes</Text>
            </View>
          </View>

          {/* Overview */}
          <Text style={styles.sectionLabel}>Overview</Text>
          <Text style={styles.overview}>
            {movie.overview || 'No description available.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  backdropWrapper: { width, height: 240, position: 'relative' },
  backdrop: { width: '100%', height: '100%' },
  backdropFallback: { backgroundColor: colors.card },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28,28,46,0.55)',
  },
  backBtn: {
    position: 'absolute',
    top: 12,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: { color: colors.white, fontSize: 24, lineHeight: 28 },
  backdropTitle: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    right: 16,
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },

  body: { padding: 20 },

  metaRow: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  poster: { width: 100, height: 150, borderRadius: 12 },
  metaInfo: { flex: 1, justifyContent: 'center', gap: 10 },
  movieTitle: { color: colors.white, fontSize: 16, fontWeight: '700' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  votes: { color: colors.gray, fontSize: 12 },

  sectionLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  overview: { color: colors.gray, fontSize: 14, lineHeight: 22 },
});
