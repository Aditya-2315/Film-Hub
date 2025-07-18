import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { fetchTV } from '../services/movieServices.js';
import Card from '../components/Card';
import { motion } from 'motion/react';
import { SearchContext } from '../context/searchContext.jsx';
import useWatchList from '../hooks/useWatchList';

function Shows() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const initialFetchDone = useRef(false);
  const { searchResults } = useContext(SearchContext);
  const { watchList } = useWatchList();

  const fetchAndSetShows = async (page) => {
    setLoading(true);
    try {
      const res = await fetchTV(page);
      const newshows = res.results;
      setShows(prev => [...prev, ...newshows]);
      setHasMore(res.page < res.total_pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setShows([]);
    setHasMore(true);
    setPage(1); // Trigger initial fetch once
  }, []);

  useEffect(() => {
    if (searchResults) return; // Skip fetching if search is active
    if (page === 1 && initialFetchDone.current) return;
    fetchAndSetShows(page);
    if (page === 1) initialFetchDone.current = true;
  }, [page, searchResults]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading && !searchResults) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loading, searchResults]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  const baseShows = searchResults || shows;
  const likedShows = watchList.filter(item => item.media_type === 'tv');
  const unlikedShows = baseShows.filter(show => !likedShows.some(liked => liked.id === show.id));
  const displayShows = [...likedShows, ...unlikedShows];

  return (
    <>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <h1 className='text-2xl font-extrabold self-center'>TV Shows are here</h1>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className='border-t w-full items-center px-5 py-3 grid grid-cols-2 md:grid-cols-6 gap-6'>
          {displayShows.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
          {!searchResults && (
            <div ref={loader} className="w-full col-span-full flex justify-center py-6">
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-100"></div>
              ) : hasMore ? (
                <p>Scroll down to load more...</p>
              ) : (
                <p>No more shows.</p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Shows;
