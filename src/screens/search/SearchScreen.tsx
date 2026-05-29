import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useMovieSearch } from '../../hooks/useMovieSearch';
import MovieResultCard from '../../components/MovieResultCard';
import colors from '../../theme/colors';

export default function SearchScreen() {
  const { query, setQuery, results, loading, showEmpty } = useMovieSearch();
  const inputRef = useRef<TextInput>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>


      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchBar}
        onPress={() => inputRef.current?.focus()}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Movies, genres, year…"
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {/* Body */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : query.trim().length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.idleIcon}>🎬</Text>
          <Text style={styles.idleText}>What do you want to watch?</Text>
        </View>
      ) : showEmpty ? (
        <View style={styles.centered}>
          <Text style={styles.idleIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>
            We Are Sorry, We Can{'\n'}Not Find The Movie :(
          </Text>
          <Text style={styles.emptySubtitle}>
            Find your movie by Type title,{'\n'}categories, years, etc
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <MovieResultCard item={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginVertical: 14,
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    color: colors.white,
    paddingVertical: 13,
    fontSize: 15,
  },
  clearBtn: { color: colors.gray, fontSize: 16, paddingHorizontal: 4 },

  list: { paddingHorizontal: 20, paddingBottom: 20 },

  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },

  idleIcon: { fontSize: 60 },
  idleText: { color: colors.gray, fontSize: 15 },

  emptyTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptySubtitle: {
    color: colors.gray,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
