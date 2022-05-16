import React from 'react';
import HomeDashboard from './home/HomeDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreatorDashboard from './creator/CreatorDashboard';
import GameDashboard from './game/GameDashboard';
import { useAuthContext } from '../contexts/AuthContext';

export default function MainRouter() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route exact path="" element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<HomeDashboard />} />
        <Route path="/creator/*" element={<CreatorDashboard />} />
        <Route
          path="/game/:id"
          element={user ? <GameDashboard /> : <Navigate to="/home/signin" />}
        />
      </Routes>
    </Router>
  );
}
