import { MovieDetail, MovieResponse } from '../models/search';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN_TMDB;

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${TMDB_TOKEN}`,
};

export async function getNowPlaying(): Promise<MovieDetail[]> {
  const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing`, { headers });
  const json: MovieResponse = await response.json();
  if (!response.ok) throw json;
  return json.results;
}

export async function searchMovies(query: string): Promise<MovieDetail[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`,
    { headers },
  );
  const json: MovieResponse = await response.json();
  if (!response.ok) throw json;
  return json.results;
}
