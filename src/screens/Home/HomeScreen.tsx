import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  getPopularMovies,
  getTrending,
  getTopRated,
  getNowPlaying,
  getUpcoming,
  IMAGE_BASE_URL,
} from "../../services/tmbService";

const { width } = Dimensions.get("window");
const TRENDING_CARD = width * 0.42;

const TABS = ["Now playing", "Upcoming", "Top rated", "Popular"];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [trending, setTrending] = useState<any[]>([]);
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Now playing");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Promise.all([
      getTrending(),
      getPopularMovies(),
      getTopRated(),
      getNowPlaying(),
      getUpcoming(),
    ])
      .then(([trend, pop, top, now, up]) => {
        setTrending(trend.results || []);
        setPopular(pop.results || []);
        setTopRated(top.results || []);
        setNowPlaying(now.results || []);
        setUpcoming(up.results || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const getTabMovies = () => {
    switch (activeTab) {
      case "Now playing":
        return nowPlaying;
      case "Upcoming":
        return upcoming;
      case "Top rated":
        return topRated;
      case "Popular":
        return popular;
      default:
        return nowPlaying;
    }
  };

  const goToDetail = (movieId: number) =>
    navigation.navigate("MovieDetail", { movieId });

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00D1C1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>What do you want to watch?</Text>
        </View>

        {/* ── Search Bar ── */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("SearchStack")}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#A0A0A0"
            editable={false}
            pointerEvents="none"
          />
          <Feather name="search" size={18} color="#A0A0A0" />
        </TouchableOpacity>

        {/* ── Trending Numbered Row ── */}
        <FlatList
          data={trending.slice(0, 5)}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingRow}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.trendingCard}
              onPress={() => goToDetail(item.id)}
            >
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                style={styles.trendingPoster}
              />
              <Text style={styles.trendingNumber}>{index + 1}</Text>
            </TouchableOpacity>
          )}
        />

        {/* ── Tabs ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
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
        </ScrollView>

        {/* ── Grid Movies ── */}
        <View style={styles.grid}>
          {getTabMovies()
            .slice(0, 6)
            .map((item: any) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridCard}
                onPress={() => goToDetail(item.id)}
              >
                <Image
                  source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                  style={styles.gridPoster}
                />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: { color: "#FFFFFF", fontSize: 22, fontWeight: "800" },

  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C3E",
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: { flex: 1, color: "#FFFFFF", fontSize: 15 },

  // Trending
  trendingRow: { paddingHorizontal: 20, gap: 12, marginBottom: 24 },
  trendingCard: { width: TRENDING_CARD, position: "relative" },
  trendingPoster: {
    width: TRENDING_CARD,
    height: TRENDING_CARD * 1.4,
    borderRadius: 16,
    backgroundColor: "#2C2C3E",
  },
  trendingNumber: {
    position: "absolute",
    bottom: -10,
    left: -8,
    fontSize: 72,
    fontWeight: "900",
    color: "#1C1C27", // same as background = looks hollow
    textShadowColor: "#FFFFFF",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1,
    fontStyle: "italic",
  },

  // Tabs
  tabsRow: { paddingHorizontal: 20, gap: 24, marginBottom: 16 },
  tabItem: { alignItems: "center", paddingBottom: 8 },
  tabText: { color: "#A0A0A0", fontSize: 14, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "100%",
    backgroundColor: "#00D1C1",
    borderRadius: 2,
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  gridCard: {
    width: (width - 40) / 3,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  gridPoster: {
    width: "100%",
    height: ((width - 40) / 3) * 1.5,
    borderRadius: 12,
    backgroundColor: "#2C2C3E",
  },
});
