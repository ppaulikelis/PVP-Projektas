import React from 'react';

export const Background2 = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: '#EAEAEA',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        minHeight: '100vh'
      }}>
      {children}
    </div>
  );
};

export default Background2;
