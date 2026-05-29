import { useState, useEffect } from 'react';
import { MovieDetail } from '../network/models/search';
import { searchMovies } from '../network/services/searchService';

interface UseMovieSearchResult {
  query: string;
  setQuery: (text: string) => void;
  results: MovieDetail[];
  loading: boolean;
  showEmpty: boolean;
}

export function useMovieSearch(): UseMovieSearchResult {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MovieDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    // Mark loading immediately so the UI never flickers into the empty state
    // during the debounce window.
    setLoading(true);
    let cancelled = false;

    const timer = setTimeout(() => {
      searchMovies(trimmed)
        .then(data => { if (!cancelled) setResults(data); })
        .catch(() => { if (!cancelled) setResults([]); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const showEmpty = query.trim().length > 0 && !loading && results.length === 0;

  return { query, setQuery, results, loading, showEmpty };
}
