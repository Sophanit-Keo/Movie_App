import React, { createContext, useContext, useState } from 'react';

type WatchlistType = {
  isBookmarked: (id: number) => boolean;
  toggleBookmark: (id: number) => void;
};

const WatchlistContext = createContext<WatchlistType>({
  isBookmarked: () => false,
  toggleBookmark: () => {},
});

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<number[]>([]);

  function isBookmarked(id: number) {
    return saved.includes(id);
  }

  function toggleBookmark(id: number) {
    if (saved.includes(id)) {
      setSaved(saved.filter(i => i !== id));
    } else {
      setSaved([...saved, id]);
    }
  }

  return (
    <WatchlistContext.Provider value={{ isBookmarked, toggleBookmark }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}