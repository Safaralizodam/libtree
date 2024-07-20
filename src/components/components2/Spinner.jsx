import React from 'react';
import './Spinner.css'; 

export default function Spinner({ message }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}