import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  getMovieDetail,
  IMAGE_BASE_URL,
  BACKDROP_BASE_URL,
} from "../../services/tmbService";

const { width } = Dimensions.get("window");
const TABS = ["About Movie", "Reviews", "Cast"];

export default function MovieDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const movieId = route.params?.movieId;

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("About Movie");

  useEffect(() => {
    getMovieDetail(movieId)
      .then(setMovie)
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00D1C1" />
      </View>
    );
  }

  if (!movie) return null;

  const genres = movie.genres?.map((g: any) => g.name).join(", ") || "";
  const hours = Math.floor((movie.runtime || 0) / 60);
  const mins = (movie.runtime || 0) % 60;
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const reviews = movie.reviews?.results?.slice(0, 5) || [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Backdrop + Header ── */}
        <View style={styles.backdropContainer}>
          <Image
            source={{ uri: `${BACKDROP_BASE_URL}${movie.backdrop_path}` }}
            style={styles.backdrop}
          />
          <View style={styles.backdropOverlay} />

          {/* Header buttons */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Detail</Text>
            <TouchableOpacity style={styles.headerBtn}>
              <Feather name="bookmark" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Rating badge */}
          <View style={styles.ratingBadge}>
            <AntDesign name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>
              {movie.vote_average?.toFixed(1)}
            </Text>
          </View>
        </View>

        {/* ── Poster + Info ── */}
        <View style={styles.infoContainer}>
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
            style={styles.poster}
          />
          <View style={styles.movieMeta}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View style={styles.metaRow}>
              <AntDesign name="calendar" size={12} color="#A0A0A0" />
              <Text style={styles.metaText}>
                {movie.release_date?.split("-")[0]}
              </Text>
              <Text style={styles.metaDivider}>|</Text>
              <Text style={{ color: "#A0A0A0", fontSize: 12 }}>⏱</Text>
              <Text style={styles.metaText}>
                {hours}h {mins} Minutes
              </Text>
              <Text style={styles.metaDivider}>|</Text>
              <Feather name="film" size={12} color="#A0A0A0" />
              <Text style={styles.metaText} numberOfLines={1}>
                {movie.genres?.[0]?.name || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Tabs ── */}
        <View style={styles.tabsRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tabItem}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Tab Content ── */}
        <View style={styles.tabContent}>
          {/* About Movie */}
          {activeTab === "About Movie" && (
            <Text style={styles.overview}>{movie.overview}</Text>
          )}

          {/* Reviews */}
          {activeTab === "Reviews" && (
            <View>
              {reviews.length === 0 ? (
                <Text style={styles.emptyText}>No reviews yet.</Text>
              ) : (
                reviews.map((review: any) => (
                  <View key={review.id} style={styles.reviewCard}>
                    <View style={styles.reviewLeft}>
                      <View style={styles.reviewAvatar}>
                        <AntDesign name="user" size={20} color="#FFFFFF" />
                      </View>
                      <Text style={styles.reviewScore}>
                        {review.author_details?.rating?.toFixed(1) || "–"}
                      </Text>
                    </View>
                    <View style={styles.reviewContent}>
                      <Text style={styles.reviewAuthor}>{review.author}</Text>
                      <Text style={styles.reviewText} numberOfLines={4}>
                        {review.content}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Cast */}
          {activeTab === "Cast" && (
            <View style={styles.castGrid}>
              {cast.map((actor: any) => (
                <View key={actor.id} style={styles.castCard}>
                  <Image
                    source={{
                      uri: actor.profile_path
                        ? `${IMAGE_BASE_URL}${actor.profile_path}`
                        : "https://via.placeholder.com/100x100?text=?",
                    }}
                    style={styles.castPhoto}
                  />
                  <Text style={styles.castName} numberOfLines={2}>
                    {actor.name}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1C1C27" },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#1C1C27",
    justifyContent: "center",
    alignItems: "center",
  },

  // Backdrop
  backdropContainer: { width, height: 250, position: "relative" },
  backdrop: { width: "100%", height: "100%" },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(28,28,39,0.5)",
  },
  headerRow: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(28,28,39,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  ratingBadge: {
    position: "absolute",
    bottom: 12,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: { color: "#FFD700", fontSize: 14, fontWeight: "700" },

  // Poster + Info
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 16,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 12,
    backgroundColor: "#2C2C3E",
    marginTop: -40,
  },
  movieMeta: { flex: 1, paddingTop: 8 },
  movieTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    lineHeight: 26,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  metaText: { color: "#A0A0A0", fontSize: 12 },
  metaDivider: { color: "#A0A0A0", fontSize: 12 },

  // Tabs
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C3E",
    marginBottom: 16,
  },
  tabItem: { marginRight: 24, paddingBottom: 12, position: "relative" },
  tabText: { color: "#A0A0A0", fontSize: 14, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#00D1C1",
    borderRadius: 2,
  },

  // Tab Content
  tabContent: { paddingHorizontal: 16, paddingBottom: 40 },
  overview: { color: "#A0A0A0", fontSize: 14, lineHeight: 24 },
  emptyText: {
    color: "#A0A0A0",
    fontSize: 14,
    textAlign: "center",
    marginTop: 24,
  },

  // Reviews
  reviewCard: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  reviewLeft: { alignItems: "center", gap: 6 },
  reviewAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3C3C4E",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewScore: { color: "#00D1C1", fontSize: 13, fontWeight: "700" },
  reviewContent: { flex: 1 },
  reviewAuthor: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  reviewText: { color: "#A0A0A0", fontSize: 13, lineHeight: 20 },

  // Cast Grid
  castGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  castCard: { width: (width - 64) / 3, alignItems: "center" },
  castPhoto: {
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    borderRadius: (width - 64) / 6,
    marginBottom: 8,
    backgroundColor: "#2C2C3E",
  },
  castName: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
