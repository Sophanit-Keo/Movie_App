import { Movie, MovieDetail, CastMember, Review } from '../types/movie';

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY ?? '';
const BASE_URL = 'https://api.themoviedb.org/3';

export const POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';
export const PROFILE_BASE = 'https://image.tmdb.org/t/p/w185';

export function resolveAvatarUrl(path: string | null): string | null {
  if (!path) return null;
  const cleaned = path.replace(/^\//, '');
  if (cleaned.startsWith('http')) return cleaned;
  return `${PROFILE_BASE}/${cleaned}`;
}

async function fetchData(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

export async function getTrending(): Promise<{ results: Movie[] }> {
  return fetchData('/trending/movie/week');
}

export async function getNowPlaying(): Promise<{ results: Movie[] }> {
  return fetchData('/movie/now_playing');
}

export async function getUpcoming(): Promise<{ results: Movie[] }> {
  return fetchData('/movie/upcoming');
}

export async function getTopRated(): Promise<{ results: Movie[] }> {
  return fetchData('/movie/top_rated');
}

export async function getPopular(): Promise<{ results: Movie[] }> {
  return fetchData('/movie/popular');
}

export async function getMoviesByCategory(category: string): Promise<{ results: Movie[] }> {
  if (category === 'Now playing') return getNowPlaying();
  if (category === 'Upcoming') return getUpcoming();
  if (category === 'Top rated') return getTopRated();
  if (category === 'Popular') return getPopular();
  return getNowPlaying();
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
  return fetchData(`/movie/${id}`);
}

export async function getMovieCredits(id: number): Promise<{ cast: CastMember[] }> {
  return fetchData(`/movie/${id}/credits`);
}

export async function getMovieReviews(id: number): Promise<{ results: Review[] }> {
  return fetchData(`/movie/${id}/reviews`);
}
