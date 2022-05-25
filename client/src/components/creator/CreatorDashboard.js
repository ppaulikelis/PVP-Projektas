import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import MainHeader from '../headers/MainHeader';
import EditGame from './EditGame';
import GameList from './GameList';
import Profile from './Profile';
import Background2 from '../additional/Background2';
import Results from './Results';

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
      <Background2>
        <MainHeader />
        <Routes>
          {user ? (
            <>
              <Route path="" element={<GameList />} />
              <Route path="/game/:id" element={<EditGame />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/results" element={<Results />} />
            </>
          ) : (
            <></>
          )}
        </Routes>
      </Background2>
    </>
  );
}
