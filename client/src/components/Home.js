import React from 'react'
import Header from './Header';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Card, CardContent } from '@mui/material';

export default function Home() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      gameCode: data.get('gameCode'),
      password: data.get('password'),
    });
  };

  return (
    <div style={{
      backgroundImage: `url("/background.png")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height:'100vh',
      }}>
      <Header/>
      <Container component="main" maxWidth="sm">
        <Card sx={{mt: 5, borderRadius: '20px'}}>
          <CardContent sx={{my: 5, mx: 5}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography textAlign='center' component="h1" variant="h4" sx={{mb: 2}}>
            Projekto pavadinimas
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="gameCode"
              label="Žaidimo kodas"
              name="gameCode"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Slaptažodis"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Dalyvauti
            </Button>
          </Box>
        </Box>
        </CardContent>
        </Card>
      </Container>
    </div>
  )
}
