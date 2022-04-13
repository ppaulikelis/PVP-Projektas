import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import Background from '../additional/Background';
import MainHeader from '../headers/MainHeader';
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
    <Background>
      <MainHeader />
      <Container maxWidth="lg" sx={{ pb: 5 }}>
        <Routes>{user ? <Route path="" element={<GameList />} /> : <></>}</Routes>
      </Container>
    </Background>
  );
}
