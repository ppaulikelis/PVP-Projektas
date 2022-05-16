import React from 'react';

export const Background = ({ children }) => {
  return (
    <div
      style={{
        background: 'url("/bg_grad.png") rgba(0, 0, 0, 0) no-repeat center center fixed',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        minHeight: '100vh',
        paddingTop: '130px'
      }}>
      {children}
    </div>
  );
};

export default Background;
