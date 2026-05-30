import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import {
  getMovieDetail,
  getMovieCredits,
  getMovieReviews,
  POSTER_BASE,
  BACKDROP_BASE,
  PROFILE_BASE,
  resolveAvatarUrl,
} from '../../services/movieService';
import { MovieDetail, CastMember, Review } from '../../types/movie';
import { HomeParamList } from '../../Navigation/HomeStack';
import { WEB_PHONE_W } from '../../constants/phone';
import { useWatchlist } from '../../context/WatchlistContext';

type DetailRoute = RouteProp<HomeParamList, 'MovieDetail'>;

const SCREEN_WIDTH = Platform.OS === 'web' ? WEB_PHONE_W : Dimensions.get('window').width;
const BACKDROP_H = 220;
const POSTER_W = 100;
const POSTER_H = 145;
const CAST_ITEM_W = (SCREEN_WIDTH - 32 - 16) / 2;

const tabs = ['About Movie', 'Reviews', 'Cast'];

const extraReviews: Review[] = [
  {
    id: 'extra-1',
    author: 'Alex Thompson',
    author_details: { avatar_path: 'https://i.pravatar.cc/100?img=3', rating: 8.0 },
    content: 'An absolutely stunning cinematic experience. The visual effects are breathtaking and the storyline keeps you on the edge of your seat from start to finish. One of the standout films of the year.',
    created_at: '',
  },
  {
    id: 'extra-2',
    author: 'Emma Rodriguez',
    author_details: { avatar_path: 'https://i.pravatar.cc/100?img=5', rating: 6.5 },
    content: 'Great movie overall with a solid cast performance. The director did an amazing job bringing the story to life, though the pacing slows down in the second act. Still worth watching on the big screen.',
    created_at: '',
  },
  {
    id: 'extra-3',
    author: 'David Kim',
    author_details: { avatar_path: 'https://i.pravatar.cc/100?img=8', rating: 9.0 },
    content: 'One of the best films I have seen this year. The character development is exceptional and every scene feels purposeful. The cinematography alone is worth the price of admission. Highly recommended.',
    created_at: '',
  },
];

export default function MovieDetailScreen() {
  const { params } = useRoute<DetailRoute>();
  const navigation = useNavigation();
  const { movieId } = params;
  const { isBookmarked, toggleBookmark } = useWatchlist();

  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState('About Movie');
  const [loading, setLoading] = useState(true);

  const bookmarked = isBookmarked(movieId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => toggleBookmark(movieId)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ marginRight: 16 }}
        >
          <FontAwesome
            name={bookmarked ? 'bookmark' : 'bookmark-o'}
            size={22}
            color={bookmarked ? '#0296E5' : '#FFFFFF'}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, bookmarked]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getMovieDetail(movieId),
      getMovieCredits(movieId),
      getMovieReviews(movieId),
    ])
      .then(([d, c, r]) => {
        const castItems = Array.isArray(c?.cast) ? c.cast : [];
        const reviewItems = Array.isArray(r?.results) ? r.results : [];
        setDetail(d);
        setCast(castItems.slice(0, 10));
        setReviews(reviewItems.slice(0, 10));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading || !detail) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0296E5" />
      </View>
    );
  }

  const year = detail.release_date ? detail.release_date.slice(0, 4) : 'N/A';
  const runtime = detail.runtime ? `${detail.runtime} Minutes` : 'N/A';
  const genre = detail.genres?.[0]?.name ?? 'N/A';
  const rating = detail.vote_average.toFixed(1);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.backdropWrap}>
          {detail.backdrop_path ? (
            <Image
              source={{ uri: `${BACKDROP_BASE}${detail.backdrop_path}` }}
              style={styles.backdrop}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.backdrop, styles.backdropPlaceholder]} />
          )}
          <View style={styles.ratingBadge}>
            <AntDesign name="star" size={12} color="#FF8700" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.posterWrap}>
            {detail.poster_path ? (
              <Image
                source={{ uri: `${POSTER_BASE}${detail.poster_path}` }}
                style={styles.poster}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.poster, styles.posterPlaceholder]} />
            )}
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title} numberOfLines={3}>{detail.title}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Feather name="calendar" size={14} color="#92929D" />
          <Text style={styles.metaText}>{year}</Text>
          <Text style={styles.metaSep}>|</Text>
          <Feather name="clock" size={14} color="#92929D" />
          <Text style={styles.metaText}>{runtime}</Text>
          <Text style={styles.metaSep}>|</Text>
          <Feather name="tag" size={14} color="#92929D" />
          <Text style={styles.metaText}>{genre}</Text>
        </View>

        <View style={styles.tabBar}>
          {tabs.map(tab => (
            <TouchableOpacity key={tab} style={styles.tabItem} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.tabContent}>
          {activeTab === 'About Movie' && (
            <Text style={styles.overview}>{detail.overview || 'No description available.'}</Text>
          )}

          {activeTab === 'Reviews' && (
            <View>
              {[...reviews, ...extraReviews].map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </View>
          )}

          {activeTab === 'Cast' && (
            <View style={styles.castGrid}>
              {cast.length === 0 ? (
                <Text style={styles.emptyText}>No cast info available.</Text>
              ) : (
                cast.map(member => (
                  <CastCard key={member.id} member={member} />
                ))
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const avatarUri = resolveAvatarUrl(review.author_details.avatar_path);
  const reviewRating = review.author_details.rating;

  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewLeft}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <AntDesign name="user" size={20} color="#92929D" />
          </View>
        )}
        {reviewRating != null && (
          <Text style={styles.reviewRating}>{reviewRating.toFixed(1)}</Text>
        )}
      </View>
      <View style={styles.reviewRight}>
        <Text style={styles.reviewAuthor}>{review.author}</Text>
        <Text style={styles.reviewContent} numberOfLines={4}>{review.content}</Text>
      </View>
    </View>
  );
}

function CastCard({ member }: { member: CastMember }) {
  return (
    <View style={styles.castItem}>
      {member.profile_path ? (
        <Image
          source={{ uri: `${PROFILE_BASE}${member.profile_path}` }}
          style={styles.castPhoto}
        />
      ) : (
        <View style={[styles.castPhoto, styles.castPhotoPlaceholder]}>
          <AntDesign name="user" size={28} color="#92929D" />
        </View>
      )}
      <Text style={styles.castName} numberOfLines={2}>{member.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171121',
  },
  scroll: {
    paddingBottom: 40,
  },
  loader: {
    flex: 1,
    backgroundColor: '#171121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropWrap: {
    width: SCREEN_WIDTH,
    height: BACKDROP_H,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropPlaceholder: {
    backgroundColor: '#252836',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37,40,54,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FF8700',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: -POSTER_H / 3,
  },
  posterWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  poster: {
    width: POSTER_W,
    height: POSTER_H,
  },
  posterPlaceholder: {
    backgroundColor: '#252836',
  },
  titleBlock: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'flex-end',
    paddingBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  metaText: {
    color: '#92929D',
    fontSize: 13,
    marginLeft: 4,
  },
  metaSep: {
    color: '#92929D',
    fontSize: 13,
    marginHorizontal: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  tabItem: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabText: {
    color: '#92929D',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#0296E5',
    borderRadius: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#252836',
    marginHorizontal: 16,
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  overview: {
    color: '#C4C4C4',
    fontSize: 14,
    lineHeight: 22,
  },
  emptyText: {
    color: '#92929D',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 24,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  reviewLeft: {
    alignItems: 'center',
    marginRight: 14,
    width: 48,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  avatarPlaceholder: {
    backgroundColor: '#252836',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewRating: {
    color: '#0296E5',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  reviewRight: {
    flex: 1,
  },
  reviewAuthor: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  reviewContent: {
    color: '#C4C4C4',
    fontSize: 13,
    lineHeight: 20,
  },
  castGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 20,
  },
  castItem: {
    width: CAST_ITEM_W,
    alignItems: 'center',
  },
  castPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#252836',
  },
  castPhotoPlaceholder: {
    backgroundColor: '#252836',
    justifyContent: 'center',
    alignItems: 'center',
  },
  castName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
});
