import React from "react"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Router from '../router'
import { AuthProvider } from "../contexts/AuthContext"

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#437F97',
    },
    secondary:{
      main: '#FFB30F',
    },
    error:{
      main: '#DD050A',
    },
    success:{
      main: '#849324',
    },
    text: {
      primary: '#000000',
    },
  },
})

function App() {
  return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router/>
        </ThemeProvider>
      </AuthProvider>
  );
}

export default App;
