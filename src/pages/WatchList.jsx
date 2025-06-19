import React from 'react'
import { motion, AnimatePresence } from 'motion/react';
import useWatchList from '../hooks/useWatchList';
import Card from '../components/Card';

const WatchList = () => {
  const { watchList } = useWatchList();

  const movies = watchList.filter(item => item.media_type === 'movie');
  const tvShows = watchList.filter(item => item.media_type === 'tv');

  return (
    <div className=' flex flex-col gap-2 items-center justify-center'>
      <h1 className=' text-2xl font-extrabold self-center'>Your Watch List</h1>

      {movies.length > 0 && (
        <>
          <h2 className='text-xl font-bold w-full col-span-full mt-4 mb-1 pl-3'>Movies</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className='border-t w-full items-center px-5 py-3 grid grid-cols-2 md:grid-cols-6 gap-6'
          >
            <AnimatePresence mode="popLayout">
              {movies.map(movie => (
                <motion.div
                  key={`movie-${movie.id}`}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card movie={movie} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {tvShows.length > 0 && (
        <>
          <h2 className='text-xl font-bold w-full col-span-full mt-4 mb-1 pl-3'>TV Shows</h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className='border-t w-full items-center px-5 py-3 grid grid-cols-2 md:grid-cols-6 gap-6'
          >
            <AnimatePresence mode="popLayout">
              {tvShows.map(tv => (
                <motion.div
                  key={`tv-${tv.id}`}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card movie={tv} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {movies.length === 0 && tvShows.length === 0 && (
        <div className='text-lg text-gray-500 mt-6'>Your watch list is empty.</div>
      )}
    </div>
  )
}

export default WatchList