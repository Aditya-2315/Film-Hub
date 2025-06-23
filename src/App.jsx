import './App.css'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useOnlineStatus from "./hooks/useOnlineStatus";

function App() {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If offline and not already on /watchlist, redirect to /watchlist
    if (!isOnline && location.pathname !== "/watch-list") {
      navigate("/watch-list", { replace: true });
    }
  }, [isOnline, location.pathname]);



  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
