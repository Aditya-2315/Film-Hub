import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider ,createBrowserRouter} from 'react-router'
import { createRoutesFromElements } from 'react-router'
import Explore from './pages/Explore.jsx'
import Movies from './pages/Movies.jsx'
import Shows from './pages/Shows.jsx'
import WatchList from './pages/WatchList.jsx'
import { SearchProvider } from './context/searchContext.jsx'
// import { WatchListProvider } from './hooks/useWatchList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Explore/>}/>
      <Route path='movies' element={<Movies/>}/>
      <Route path='shows' element={<Shows/>}/>
      <Route path='watch-list' element={<WatchList/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      {/* <WatchListProvider> */}
        <RouterProvider router={router} />
      {/* </WatchListProvider> */}
    </SearchProvider>
  </StrictMode>
);