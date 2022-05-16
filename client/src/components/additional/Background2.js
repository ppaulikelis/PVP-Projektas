import React from 'react';

export const Background2 = ({ children }) => {
  return (
    <div
      style={{
        background: 'url("/pvpbguser.png") rgba(0, 0, 0, 0) no-repeat center center fixed',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        minHeight: '100vh'
      }}>
      {children}
    </div>
  );
};

export default Background2;
