import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { searchMovies, IMAGE_BASE_URL } from "../../services/tmbService";

export default function SearchScreen() {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Live search — fires 500ms after user stops typing
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setSearched(false);
      return;
    }
    const timeout = setTimeout(async () => {
      setLoading(true);
      setSearched(true);
      try {
        const data = await searchMovies(query);
        setMovies(data.results || []);
      } catch (err) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  function handleClear() {
    setQuery("");
    setMovies([]);
    setSearched(false);
  }

  const renderMovie = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : "https://via.placeholder.com/100x150?text=No+Image",
        }}
        style={styles.poster}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.ratingRow}>
          <AntDesign name="star" size={12} color="#FFD700" />
          <Text style={styles.rating}>{item.vote_average?.toFixed(1)}</Text>
        </View>
        <Text style={styles.year}>
          {item.release_date ? item.release_date.split("-")[0] : "N/A"}
        </Text>
        <Text style={styles.overview} numberOfLines={3}>
          {item.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <AntDesign
          name="search"
          size={18}
          color="#A0A0A0"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          placeholderTextColor="#A0A0A0"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <AntDesign name="close" size={16} color="#A0A0A0" />
          </TouchableOpacity>
        )}
      </View>

      {/* Results */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF5F5F" style={styles.loader} />
      ) : searched && movies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🎬</Text>
          <Text style={styles.emptyText}>No movies found for "{query}"</Text>
        </View>
      ) : !searched ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyText}>Search for your favorite movies</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovie}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#171121" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C3E",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, color: "#FFFFFF", fontSize: 15 },
  loader: { flex: 1 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: "#A0A0A0", fontSize: 15, textAlign: "center" },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#2C2C3E",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  poster: { width: 90, height: 135 },
  movieInfo: { flex: 1, padding: 12 },
  movieTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  rating: { color: "#FFD700", fontSize: 12, fontWeight: "600" },
  year: { color: "#A0A0A0", fontSize: 12, marginBottom: 6 },
  overview: { color: "#A0A0A0", fontSize: 12, lineHeight: 18 },
});
