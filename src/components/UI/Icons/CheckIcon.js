import React from 'react';

const CheckIcon = ({ color = "currentColor", className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    width="24"
    height="24"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export { CheckIcon };