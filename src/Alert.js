// Alert.js
import React from 'react';
import './Alert.css';

const Alert = ({ message }) => {
  return (
    <div className="alert-box">
      {message}
    </div>
  );
};

export default Alert;
