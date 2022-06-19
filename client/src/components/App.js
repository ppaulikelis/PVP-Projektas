import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from '../contexts/AuthContext';
import MainRouter from './MainRouter';
import { SnackbarProvider } from 'notistack';

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
        <SnackbarProvider maxSnack={3}>
          <MainRouter />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
