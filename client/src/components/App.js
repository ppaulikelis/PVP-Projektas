import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Router from '../router';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#437F97',
    },
    secondary:{
      main: '#D4AFB9',
    },
    error:{
      main: '#DD050A',
    },
    warning:{
      main: '#FFB30F',
    },
    success:{
      main: '#849324',
    },
    text: {
      primary: '#000000',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
