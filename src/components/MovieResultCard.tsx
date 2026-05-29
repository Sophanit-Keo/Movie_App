import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MovieDetail } from '../network/models/search';
import { TMDB_IMAGE_BASE } from '../network/services/searchService';
import colors from '../theme/colors';

interface Props {
  item: MovieDetail;
}

export default function MovieResultCard({ item }: Props) {
  const navigation = useNavigation<any>();
  const posterUri = item.poster_path
    ? `${TMDB_IMAGE_BASE}${item.poster_path}`
    : undefined;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { movie: item })}
    >
      {posterUri ? (
        <Image source={{ uri: posterUri }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.posterFallback]} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>⭐ {item.vote_average.toFixed(1)}</Text>
        <Text style={styles.meta}>📅 {item.release_date?.slice(0, 4) ?? '—'}</Text>
        <Text style={styles.meta} numberOfLines={3}>{item.overview}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: 20, gap: 16 },
  poster: { width: 90, height: 130, borderRadius: 10 },
  posterFallback: { backgroundColor: colors.card },
  info: { flex: 1, justifyContent: 'center', gap: 6 },
  title: { color: colors.white, fontSize: 16, fontWeight: '700' },
  meta: { color: colors.gray, fontSize: 13 },
});
