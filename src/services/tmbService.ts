const API_KEY = "6f398b9a2c2b88d7d2f0b79769f7fa07";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";

async function tmdbRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);
  const json = await response.json();
  if (!response.ok) throw json;
  return json as T;
}

export const getTrending = () =>
  tmdbRequest<any>("/trending/movie/day?language=en-US");

export const getPopularMovies = () =>
  tmdbRequest<any>("/movie/popular?language=en-US&page=1");

export const getTopRated = () =>
  tmdbRequest<any>("/movie/top_rated?language=en-US&page=1");

export const getNowPlaying = () =>
  tmdbRequest<any>("/movie/now_playing?language=en-US&page=1");

export const getUpcoming = () =>
  tmdbRequest<any>("/movie/upcoming?language=en-US&page=1");

export const searchMovies = (query: string) =>
  tmdbRequest<any>(
    `/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=1`,
  );

export const getMovieDetail = (id: number) =>
  tmdbRequest<any>(
    `/movie/${id}?language=en-US&append_to_response=videos,credits,reviews`,
  );

export const getSimilarMovies = (id: number) =>
  tmdbRequest<any>(`/movie/${id}/similar?language=en-US&page=1`);
