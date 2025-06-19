const FilmHubIcon = () => (
<svg
    width="48"
    height="48"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Clapperboard base */}
    <path
      d="M18 28H46V44C46 45.1 45.1 46 44 46H20C18.9 46 18 45.1 18 44V28Z"
      fill="#A259FF"
    />
    
    {/* Clapperboard top */}
    <path
      d="M18 26L46 26V22C46 20.9 45.1 20 44 20H20C18.9 20 18 20.9 18 22V26Z"
      fill="#C084FC"
    />
    
    {/* White stripes */}
    <path d="M22 20L26 26H22V20Z" fill="white" />
    <path d="M30 20L34 26H30V20Z" fill="white" />
    <path d="M38 20L42 26H38V20Z" fill="white" />
    
    {/* Hinge dot */}
    <circle cx="21" cy="32" r="2" fill="white" />
  </svg>
);

export default FilmHubIcon;