import React,{useState,useEffect,useRef,useContext,useCallback} from 'react'
import { motion } from 'motion/react';
import { fetchMovies } from '../services/movieServices.js';
import { SearchContext } from '../context/searchContext.jsx';
import Card from '../components/Card';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);
    const initialFetchDone = useRef(false);
    const { searchResults } = useContext(SearchContext);
  
  const fetchAndSetMovies = async (page) => {
    setLoading(true);
    try {
      const res = await fetchMovies(page);
      const newMovies = res.results;
      setMovies(prev => [...prev, ...newMovies]);
      setHasMore(res.page < res.total_pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setHasMore(true);
    setPage(1); // Trigger initial fetch once
  }, []);

  useEffect(() => {
    if (searchResults) return; // Skip fetching if search is active
    if (page === 1 && initialFetchDone.current) return;
    fetchAndSetMovies(page);
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

  const displayMovies = searchResults || movies;

  return (
       <div className=' flex flex-col gap-2 items-center justify-center'>
        <h1 className=' text-2xl font-extrabold self-center'>Movies are here</h1>
        <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3,ease: "easeOut" }}
        className=' border-t w-full items-center px-5 py-3 grid grid-cols-2 md:grid-cols-6 gap-6'>
          {displayMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
          {!searchResults && (
            <div ref={loader} className="w-full col-span-full flex justify-center py-6">
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-100"></div>
              ) : hasMore ? (
                <p>Scroll down to load more...</p>
              ) : (
                <p>No more movies.</p>
              )}
            </div>
          )}
        </motion.div>
  </div>
  )
}

export default Movies
