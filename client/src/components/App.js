import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from '../contexts/AuthContext';
import HomeDashboard from './home/HomeDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreatorDashboard from './creator/CreatorDashboard';
import GameDashboard from './game/GameDashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1176AF'
    },
    secondary: {
      main: '#FFB30F'
    },
    error: {
      main: '#DD050A'
    },
    success: {
      main: '#849324'
    },
    info: {
      main: '#1176AF'
    },
    text: {
      primary: '#000000'
    }
  }
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="" element={<Navigate to="/home" />} />
            <Route path="/home/*" element={<HomeDashboard />} />
            <Route path="/creator/*" element={<CreatorDashboard />} />
            <Route path="/game/*" element={<GameDashboard />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
