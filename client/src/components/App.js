import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from '../contexts/AuthContext';
import HomeDashboard from './home/HomeDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreatorDashboard from './creator/CreatorDashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#437F97'
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
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
