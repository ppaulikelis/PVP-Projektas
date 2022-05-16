import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

export const Background = ({ children }) => {
  const { user } = useAuthContext();
  return (
    <div
      style={{
        background: 'url("/bg_grad.png") rgba(0, 0, 0, 0) no-repeat center center fixed',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        minHeight: '100vh',
        paddingTop: user ? '130px' : '70px'
      }}>
      {children}
    </div>
  );
};

export default Background;
