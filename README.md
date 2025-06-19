# 🎬 FilmHub – React Movie Discovery & Watchlist App

**FilmHub** is a responsive, interactive movie and TV show discovery platform built with **React.js** and powered by the [TMDB API](https://www.themoviedb.org/documentation/api). It enables users to browse trending content, search by keyword, filter by genres, and maintain a persistent watchlist — all with smooth animations and a clean UI.

---

## 🚀 Features

- 🔍 **Search & Discover**
  - Debounced global search bar to find movies or TV shows
  - Discover popular, trending, and genre-specific content

- 🧭 **Explore Interface**
  - Unified page showing both movies and TV series
  - Infinite scroll with lazy loading for performance

- ❤️ **Watchlist with Local Storage**
  - Like (❤️) any card to add it to your watchlist
  - Watchlist persists across page reloads
  - Separate sections for movies and TV shows

- 🎨 **Polished UI**
  - Responsive grid layout using Tailwind CSS
  - Framer Motion animations for card transitions and list updates

- 📂 **Modular Architecture**
  - Clean folder structure with `services/`, `hooks/`, `components/`, and `pages/`
  - API abstraction layer for maintainability

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Animations**: Framer Motion
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Persistence**: `localStorage`
- **API**: TMDB REST API

---

## 📦 Possible Future Enhancements

- Firebase/Google OAuth for login-based watchlists
- Pagination for genre filtering
- Sorting options (release year, rating, etc.)
- Deploy as a PWA for offline support
- Server-side persistence using a database and Express backend

---

