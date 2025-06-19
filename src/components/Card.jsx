import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react';
import useWatchList from '../hooks/useWatchList';
import placeholder from "../assets/placeholder.jpg"

function Card({ movie }) {
  if (!movie) return null;

  const [date, setDate] = useState("");
  const { addToWatchList, removeFromWatchList, isInWatchList } = useWatchList();
const mediaType = movie.title ? 'movie' : 'tv';
const liked = isInWatchList(movie.id, mediaType);

  const UpdateDate = (date) => {
    if (!date) return '';
    setDate(date.split('-')[0]);
  };

  useEffect(() => {
    UpdateDate(movie.release_date || movie.first_air_date);
  }, []);

  const handleLiked = ()=>{
const itemWithType = { ...movie, media_type: mediaType };

  if (liked) {
    removeFromWatchList(movie.id, mediaType);
  } else {
    addToWatchList(itemWithType);
  }
  }
  

  const handleLike = () => {
    setLiked(!liked)
    // if (liked) {
    //   removeFromWatchList(movie.id);
    // } else {
    //   addToWatchList(movie);
    // }
  };

  return (
    <motion.section
      whileHover={{ scale: 1.1 }}
      style={{ transitionDuration: 10 }}
      className='relative md:w-[15lvw] cursor-pointer flex flex-col gap-3 px-3 py-2 md:h-[50lvh] bg-neutral-800 rounded-lg'
    >
      <motion.div
        whileTap={{ scale: 0.5 }}
        style={{ transitionDuration: 3 }}
        className="absolute top-2 right-2 text-white text-xl cursor-pointer z-10"
        onClick={handleLiked}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className='transition-all duration-300 ease-in-out' viewBox="0 0 24 24" width="24" height="24" fill={liked ? "#FF0000" : "#ffffff"}>
          <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </motion.div>
      <img src={movie.poster_path ? `${import.meta.env.VITE_API_IMAGE_URL}${movie.poster_path}` : placeholder} className='rounded-lg' alt="poster" />
      <span className='line-clamp-1'>{movie.title || movie.name}</span>
      <span>{date}</span>
    </motion.section>
  );
}

export default Card;
