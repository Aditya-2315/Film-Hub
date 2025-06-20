import axios from 'axios';

export const fetchContent = async (page) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/trending/all/week?region=IN`, {
      params: { 
            page,
    api_key: import.meta.env.VITE_API_KEY,
    region: 'IN',
       },
    });
    return res.data;
  } catch (error) {
    console.error('Error loading more movies:', error);
    throw error;
  }
};
export const fetchMovies = async (page) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/movie/popular?region=IN`, {
      params: {    page,
    api_key: import.meta.env.VITE_API_KEY,
    region: 'IN',},
    });
    return res.data;
  } catch (error) {
    console.error('Error loading more movies:', error);
    throw error;
  }
};
export const fetchTV = async (page) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/tv/popular?region=IN`, {
      params: {     page,
    api_key: import.meta.env.VITE_API_KEY,
    region: 'IN', },
    });
    return res.data;
  } catch (error) {
    console.error('Error loading more movies:', error);
    throw error;
  }
};

export const searchTMDB = async (query, type = 'multi') => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/search/${type}`, {
      params: {    query,
    api_key: import.meta.env.VITE_API_KEY,
    region: 'IN', },
    });
    return res.data.results;
  } catch (error) {
    console.error('Error searching TMDB:', error);
    throw error;
  }
};