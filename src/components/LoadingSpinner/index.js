import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ size = 'medium', color = '#2A5CAA' }) => {
  return (
    <div className={`loading-spinner loading-spinner--${size}`} style={{ '--spinner-color': color }}>
      <div className="loading-spinner__circle"></div>
    </div>
  );
};

export default LoadingSpinner; 