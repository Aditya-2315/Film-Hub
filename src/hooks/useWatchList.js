import { useState, useEffect } from 'react';

const WATCHLIST_KEY = 'filmhub_watchlist';

export default function useWatchList() {
  const [watchList, setWatchList] = useState(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });

  const syncFromStorage = () => {
    try {
      const stored = localStorage.getItem(WATCHLIST_KEY);
      setWatchList(stored ? JSON.parse(stored) : []);
    } catch (err) {}
  };

  useEffect(() => {
    // watch for changes triggered in other tabs or same app
    const interval = setInterval(syncFromStorage, 300); // refresh every 300ms
    return () => clearInterval(interval);
  }, []);

  const updateStorage = (newList) => {
    setWatchList(newList);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newList));
  };

  const addToWatchList = (item) => {
    const exists = watchList.some(i => i.id === item.id && i.media_type === item.media_type);
    if (!exists) updateStorage([...watchList, item]);
  };

  const removeFromWatchList = (id, media_type) => {
    const filtered = watchList.filter(i => i.id !== id || i.media_type !== media_type);
    updateStorage(filtered);
  };

  const isInWatchList = (id, media_type) => {
    return watchList.some(item => item.id === id && item.media_type === media_type);
  };

  return {
    watchList,
    addToWatchList,
    removeFromWatchList,
    isInWatchList
  };
}