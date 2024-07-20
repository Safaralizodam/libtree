import React from 'react';
import './FullPageLoader.css'; 

export default function FullPageLoader() {
  return (
    <div className="full-page-loader">
      <div className="spinner"></div>
      <p>Loading Layout...</p>
    </div>
  );
}