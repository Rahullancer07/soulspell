import React from 'react';
import './Loader.css'; // Import the CSS file for styling

const Loader = () => {
  return (
    <div className="loader-container" style={{ '--loader-dot-color': 'black', '--loader-dot-size': '50px', '--loader-dot-spacing': '25px' }}>
      <div className="loader-dots">
        <div className="loader-dot moving-dot"></div>
        <div className="loader-dot fixed-dot"></div>
        <div className="loader-dot fixed-dot"></div>
        <div className="loader-dot fixed-dot"></div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default Loader;
