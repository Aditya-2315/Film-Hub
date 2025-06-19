import React, { useState, useRef, useEffect } from 'react';

function FilterDropdown({ label = "Filter", options = [], onFilter, defaultValue = "All" }) {
  const [selected, setSelected] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option.label || option);
    setOpen(false);
    onFilter(option.value || option); // Call parent with selected value
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        {label}: {selected}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-neutral-900 rounded-md shadow-lg z-50">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              {option.label || option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;