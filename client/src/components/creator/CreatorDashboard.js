import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import MainHeader from '../headers/MainHeader';
import EditGame from './EditGame';
import GameList from './GameList';

export default function CreatorDashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate('/home');
    }
  }, [user]);

  return (
    <>
      <MainHeader />
      <Routes>
        {user ? (
          <>
            <Route path="" element={<GameList />} />{' '}
            <Route path="/game/:id" element={<EditGame />} />
          </>
        ) : (
          <></>
        )}
      </Routes>
    </>
  );
}
