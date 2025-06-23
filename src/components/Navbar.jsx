import { searchTMDB } from '../services/movieServices';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SearchContext } from '../context/searchContext.jsx';
import FilmHubIcon from "../assets/FilmHubIcon.jsx"
import useOnlineStatus from "../hooks/useOnlineStatus";

const Navbar = () => {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);
  const location = useLocation();
  const { setSearchResults } = useContext(SearchContext);
   const isOnline = useOnlineStatus();


  const getSearchType = () => {
    if (location.pathname.startsWith('/movies')) return 'movie';
    if (location.pathname.startsWith('/shows')) return 'tv';
    if (location.pathname.startsWith('/watch-list')) return 'watchlist';
    return 'multi';
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim()) {
      debounceRef.current = setTimeout(() => {
        const type = getSearchType();
        searchTMDB(query.trim(), type)
          .then(setSearchResults)
          .catch(console.error);
      }, 500);
    } else {
      setSearchResults(null); // Clear search results if input is empty
    }
  }, [query, location.pathname]);

  return (
    <div className='bg-neutral-800 w-full md:p-5 p-3 mb-2 flex md:flex-row md:gap-0 items-center md:justify-around justify-center'>
      <Link to='/' className='flex flex-col md:flex-row items-center'><FilmHubIcon/></Link>
      <div className='flex gap-5 items-center flex-wrap md:justify-between justify-center' >
        <div className="search flex bg-neutral-900 rounded-lg border border-white items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className='rounded-lg mx-1 rounded-e-none' x="0px" y="0px" width="28" height="28" fill='#ffffff' viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='search'
            className='placeholder-white border-white bg-neutral-700 border-s md:w-[250px] px-2 py-1 rounded-lg rounded-s-none'
          />
        </div>
        <nav>
          <ul className='flex gap-5 text-sm md:text-lg'>
            {isOnline ? (
              <>
                <NavLink to='/'>Explore</NavLink>
                <NavLink to='/movies'>Movies</NavLink>
                <NavLink className="whitespace-nowrap" to='/shows'>TV Shows</NavLink>
                <NavLink className="whitespace-nowrap" to='/watch-list'>Watch List</NavLink>
              </>
            ) : (
              <NavLink className="whitespace-nowrap" to='/watch-list'>Watch List</NavLink>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar;